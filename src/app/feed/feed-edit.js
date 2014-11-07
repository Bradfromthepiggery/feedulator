'use strict';

angular.module('app.feed-edit', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-edit', {
            url: '/feeds/edit/:feedId',
            views: {
                "main": {
                    controller: 'FeedEditCtrl',
                    templateUrl: 'app/feed/feed-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Edit Feed'
            }
        });
    })
    .controller('FeedEditCtrl', function FeedEditController($state, $scope, $stateParams, lodash, Slug, $indexedDB) {
        $indexedDB.objectStore('components').getAll().then(function(results) {
            $scope.ingredientData = results;
            $scope.ingredientCount = Object.keys($scope.ingredientData).length;
        });

        $indexedDB.objectStore('feeds').find($stateParams.feedId).then(function(result) {
            $scope.formResult = result;
        });

        $scope.isCalculateOnly = false;
        $scope.isEdit = true;
        $scope.isOptimize = false;

        $scope.addNewIng = function() {
            $scope.formResult.compData.push({
                _id: $scope.ingredientData[0]._id,
                name: $scope.ingredientData[0].name,
                value: 0,
                cost: 0
            });
        }

        $scope.removeIng = function(index) {
            $scope.formResult.compData.splice(index, 1);
        }

        $scope.resetComponents = function() {
            lodash.map($scope.formResult.compData, function(item) {
                item.value = 0;
            });

            $scope.formResult.nutritionData = null;
        }

        $scope.calculate = function() {
            // Extract the nutrients associated with the current component
            var nutrientList = $scope.formResult.compData.map(function(item) {
                var nutrients = lodash.find($scope.ingredientData, {
                    _id: item._id
                }).nutrients;

                return lodash.mapValues(nutrients, function(nutrient) {
                    var sumVal = nutrient.value * item.value * 0.01;

                    return {
                        name: nutrient.name,
                        value: +sumVal.toFixed(2),
                        unit: nutrient.unit
                    };
                });
            });

            $scope.formResult.nutritionData = lodash.reduce(nutrientList, function(acc, curr) {
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
                    var sumVal = a.value + b.value;

                    return {
                        name: a.name,
                        value: +sumVal.toFixed(2),
                        unit: a.unit
                    };
                });
            });
        }

        $scope.submit = function() {
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            $indexedDB.objectStore('feeds')
                .upsert($scope.formResult)
                .then(function(e) {
                    $state.go('feed-view', {
                        mixtureId: $scope.formResult._id
                    }, {
                        reload: true
                    });
                });
        }
    });
