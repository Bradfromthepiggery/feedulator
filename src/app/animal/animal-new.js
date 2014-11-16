'use strict';

angular.module('app.animal-new', [
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('animal-new', {
            url: '/animals/new',
            views: {
                "main": {
                    controller: 'AnimalCreationCtrl',
                    templateUrl: 'app/animal/animal-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Create Animal'
            }
        });
    })
    .controller('AnimalCreationCtrl', function AnimalCreationController($scope, Slug, $indexedDB, $state) {
        $scope.formResult = {
            creationDate: new Date(),
            nutrients: {
                "crude_protein": {
                    "name": "Crude Protein",
                    "value": 0,
                    "unit": "% DM"
                },
                "crude_fiber": {
                    "name": "Crude Fiber",
                    "value": 0,
                    "unit": "% DM"
                },
                "calcium": {
                    "name": "Calcium",
                    "value": 0,
                    "unit": "% DM"
                },
                "phosphorus": {
                    "name": "Phosphorus",
                    "value": 0,
                    "unit": "% DM"
                },
                "lysine": {
                    "name": "Lysine",
                    "value": 0,
                    "unit": "% DM"
                },
                "methionine": {
                    "name": "Methionine",
                    "value": 0,
                    "unit": "% DM"
                },
                "threonine": {
                    "name": "Threonine",
                    "value": 0,
                    "unit": "% DM"
                },
                "tryptophan": {
                    "name": "Tryptophan",
                    "value": 0,
                    "unit": "% DM"
                },
                "valine": {
                    "name": "Valine",
                    "value": 0,
                    "unit": "% DM"
                },
                "sodium": {
                    "name": "Sodium",
                    "value": 0,
                    "unit": "% DM"
                },
                "selenium": {
                    "name": "Selenium",
                    "value": 0,
                    "unit": "% DM"
                },
                "zinc": {
                    "name": "Zinc",
                    "value": 0,
                    "unit": "% DM"
                },
                "linoleic_acid": {
                    "name": "Linoleic Acid",
                    "value": 0,
                    "unit": "% DM"
                }
            }
        }

        $scope.makeSticky = function() {
            $('#nutritionPanel').sticky({
                topSpacing: 20,
                getWidthFrom: 'aside',
                responsiveWidth: true
            });
        }

        $scope.submit = function() {
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            $indexedDB.objectStore('animals')
                .upsert($scope.formResult)
                .then(function(e) {
                    Messenger().post("Saved animal " + $scope.formResult.name);

                    $state.go('animal-list');
                });
        }
    });
