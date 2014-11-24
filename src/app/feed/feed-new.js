'use strict';

angular.module('app.feed-new', [
        'ngLodash',
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-new', {
            url: '/feeds/new',
            views: {
                "main": {
                    controller: 'FeedNewCtrl',
                    templateUrl: 'app/feed/feed-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Create New Feed'
            }
        });
    })
    .directive('uiSelect', function() {
        return function(scope, element, attrs) {
            // Watch for changes to the list of selected components
            scope.$watch('formResult.compData', function() {
                // Initialize the Select2 combobox, then bind an event handler
                // so the scope is updated whenever the value changes
                $('#select' + attrs.uiSelect)
                    .select2({
                        openOnEnter: false,
                        maximumSelectionSize: 1
                    })
                    .on('change', function(e) {
                        if (e.added) {
                            scope.$apply('updateComp(' + attrs.uiSelect + ', \'' + e.val + '\')');
                        } else if (e.removed) {
                            scope.$apply('nullifyComp(' + attrs.uiSelect + ')');
                        }

                    });
            });
        }
    })
    .controller('FeedNewCtrl', function MixtureCreationController($scope, $http, $indexedDB, lodash, Slug, $state, $timeout) {
        // Extract all components from the database and bind them to the scope
        $indexedDB.objectStore('components').getAll().then(function(results) {
            $scope.compData = results;
            $scope.compCount = Object.keys($scope.compData).length;
        });

        // Extract all animals from the database and bind them to the scope
        $indexedDB.objectStore('animals').getAll().then(function(results) {
            $scope.animalData = results;
        });

        // Initialize an object to collect all the input data
        $scope.formResult = {
            compData: [{
                _id: null,
                name: null,
                value: 100,
                cost: 0
            }],
            creationDate: new Date()
        };

        // Update an entry in the component selector. This is called when
        // the watcher for the Select2 combobox triggers a change event
        $scope.updateComp = function(index, value) {
            $scope.formResult.compData[index]._id = value;

            var searchResult = lodash.find($scope.compData, {
                _id: value
            });

            if (searchResult) {
                // Lookup the name of the component using the component master list
                $scope.formResult.compData[index].name = searchResult.name


                // Update the nutrition calculations
                $scope.calculate();
            }
        }

        $scope.nullifyComp = function(index) {
            $scope.formResult.compData[index]._id = null;
            $scope.formResult.compData[index].name = null;

            $scope.calculate();
        }

        // Add an entry to the component selector
        $scope.addNewComp = function() {
            $scope.formResult.compData.push({
                _id: null,
                name: null,
                value: 0,
                cost: 0
            });

            $scope.calculate()
        }

        // Remove an entry from the component selector
        $scope.removeComp = function(index) {
            $scope.formResult.compData.splice(index, 1);

            $scope.calculate();
        }

        // Reset all fields in the component selector to 0
        $scope.resetComponents = function() {
            lodash.map($scope.formResult.compData, function(item) {
                item.value = 0;
            });

            $scope.formResult.compData[0].value = 100

            // Reset the calculations and numbers in the scope
            $scope.formResult.nutritionData = null;
        }

        // Evaluate the total nutrition provided by the components
        $scope.calculate = function() {
            ////////////////////////////////////////////////////////////////////
            // Back-calculate Base Component proportion
            ////////////////////////////////////////////////////////////////////
            var complementProportion = 0

            if ($scope.formResult.compData.length > 2) {
                complementProportion = lodash.rest($scope.formResult.compData).reduce(function(acc, curr) {
                    return acc + curr.value;
                }, 0);
            } else if ($scope.formResult.compData.length === 2) {
                complementProportion = $scope.formResult.compData[1].value
            }

            var difference = 100 - complementProportion;

            if (difference >= 0) {
                $scope.formResult.compData[0].value = difference
            } else {
                Messenger().post("Warning: Sum of component quantities exceeds 100%. Please delete a component or change its quantity.");
            }

            ////////////////////////////////////////////////////////////////////
            // Convert percentages to weight in pounds if specified
            ////////////////////////////////////////////////////////////////////
            if ($scope.formResult.weight) {
                $scope.feedCost = $scope.formResult.compData.reduce(function(acc, curr) {
                    return acc + curr.value * 0.01 * $scope.formResult.weight * curr.cost
                }, 0);
            }

            ////////////////////////////////////////////////////////////////////
            // Tally Nutrition Elements
            ////////////////////////////////////////////////////////////////////

            // Extract the nutrients associated with the current component
            // Only proceed if at least one component has been specified
            if ($scope.formResult.compData.length === 1 && $scope.formResult.compData[0]._id === null) {
                $scope.formResult.nutritionData = null;
            } else {
                $scope.compNutrients = lodash.compact($scope.formResult.compData.map(function(item) {
                    if (item._id) {
                        return lodash.find($scope.compData, {
                            _id: item._id
                        }).nutrients;
                    }
                }));

                $scope.nutrientList = lodash.compact($scope.compNutrients.map(function(item, index) {
                    return lodash.mapValues(item, function(nutrient) {
                        return {
                            name: nutrient.name,
                            value: nutrient.value * $scope.formResult.compData[index].value * 0.01,
                            unit: nutrient.unit
                        };
                    });
                }));

                $scope.formResult.nutritionData = lodash.reduce($scope.nutrientList, function(acc, curr) {
                    // Extract keys from the current comparison pair
                    var accKeys = lodash.keys(acc),
                        currKeys = lodash.keys(curr);

                    // Cross-compare both entries and find the exclusion set
                    var accKeyDiff = lodash.difference(accKeys, currKeys),
                        currKeyDiff = lodash.difference(currKeys, accKeys);

                    // Synchronize keys between both pairs. This is a necessary
                    // pre-processing step so the merge operation can perform one-
                    // to-one mappings
                    lodash.map(accKeyDiff, function(item) {
                        curr[item] = {
                            name: acc[item].name,
                            value: 0,
                            unit: acc[item].unit
                        }
                    });

                    lodash.map(currKeyDiff, function(item) {
                        acc[item] = {
                            name: curr[item].name,
                            value: 0,
                            unit: curr[item].unit
                        }
                    });

                    // Merge both entries in the pair and sum their values
                    return lodash.merge(lodash.clone(acc), curr, function(a, b) {
                        var result = a.value + b.value;
                        return {
                            name: a.name,
                            value: +result.toFixed(3),
                            unit: a.unit
                        };
                    });
                });

                ////////////////////////////////////////////////////////////////
                // Calculate maximum achievable nutrition values
                ////////////////////////////////////////////////////////////////
                if ($scope.formResult.nutritionData) {
                    $scope.maxAchievableNutrients = {};

                    Object.keys($scope.formResult.nutritionData).forEach(function(item) {
                        var maxProvider = lodash.max($scope.compNutrients, function(comp) {
                            if (item in comp) {
                                return comp[item].value;
                            } else {
                                return 0;
                            }
                        });

                        $scope.maxAchievableNutrients[item] = maxProvider[item].value;
                    });

                    Object.keys($scope.formResult.nutritionData).forEach(function(item) {
                        $scope.formResult.nutritionData[item].maxAchievable = $scope.maxAchievableNutrients[item];
                    });
                }
            }
        }

        // Optimize the feed based on constraints provided by the user
        $scope.optFeed = function() {
            var solver = new Solver();
            $scope.model = {
                "optimize": "cost",
                "opType": "min",
                "constraints": {
                    "totalWeight": {
                        "min": 100,
                        "max": 100
                    }
                },
                "variables": {}
            };

            // Populate variables based on selected components
            $scope.formResult.compData.forEach(function(comp) {
                // Initialize static variables
                $scope.model.variables[comp._id] = {
                    "cost": comp.cost,
                    "totalWeight": 1
                }

                // Set the component proportion weight. This variable is unique
                // to the component, and used to specify bounds for proportions
                if (comp.min || comp.max) {
                    $scope.model.variables[comp._id][comp._id + '_weight'] = 1;

                    $scope.model.constraints[comp._id + '_weight'] = {};

                    // Set the minimum bound for the component proportion
                    if (comp.min) {
                        $scope.model.constraints[comp._id + '_weight'].min = comp.min;
                    }

                    // Set the maximum bound for the component proportion
                    if (comp.max) {
                        $scope.model.constraints[comp._id + '_weight'].max = comp.max;
                    }
                }
            });

            // Populate variables based on requested optimization parameters
            for (var nutrKey in $scope.formResult.optData) {
                var nutrientMin = $scope.formResult.optData[nutrKey].min,
                    nutrientMax = $scope.formResult.optData[nutrKey].max;

                // Only process items for which a min or max bound was provided
                if (nutrientMin || nutrientMax) {
                    for (var entry in $scope.model.variables) {
                        var searchResult = lodash.find($scope.compData, {
                            _id: entry
                        }).nutrients[nutrKey];

                        if (searchResult) {
                            // Note we divide the values by 0.01 because the variables
                            // are expressed in terms of percentage
                            $scope.model.variables[entry][nutrKey] = searchResult.value * 0.01;
                        }
                    }

                    $scope.model.constraints[nutrKey] = {};

                    if (nutrientMin) {
                        $scope.model.constraints[nutrKey].min = nutrientMin;
                    }

                    if (nutrientMax) {
                        $scope.model.constraints[nutrKey].max = nutrientMax;
                    }
                }
            }

            // Short circuit the optimization if the values provided are buggy
            if (Object.keys($scope.model.constraints).length === 1) {
                $scope.results = {
                    feasible: false
                };
            } else {
                // Run a Simplex solver on the model and inject the results into the scope
                $scope.results = solver.Solve($scope.model);
            }

            if ($scope.results.feasible) {
                // Inject the optimization results, and clamp them all
                // to 2 decimal places
                $scope.formResult.compData.map(function(item) {
                    if (item._id in $scope.results) {
                        item.value = +$scope.results[item._id].toFixed(2);
                    } else {
                        item.value = 0;
                    }
                });

                // Trigger a recalculate of the nutrition elements
                $scope.calculate();

                // TODO: Re-inject optimization constraints
            }

            $('#optResultModal').modal();
        }

        $scope.submit = function() {
            // Create an id using the provided name
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            // Upsert (Update or Insert) into the local database, then
            // route the user back to the list view
            $indexedDB.objectStore('feeds')
                .upsert($scope.formResult)
                .then(function(e) {
                    Messenger().post('Saved feed ' + $scope.formResult.name);

                    $state.go('feed-list');
                });
        }

        $scope.makeSticky = function() {
            $('#nutritionPanel').sticky({
                topSpacing: 20,
                getWidthFrom: 'aside',
                responsiveWidth: true
            });
        }

        $scope.initCheckbox = function() {
            $('input[type="radio"]').radiocheck();
        }

        $timeout(function() {
           $('#select0').select2('focus');
        });

        // A flag to display the optimization interface
        $scope.isOptimize = false;


    });
