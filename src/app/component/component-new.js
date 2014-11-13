'use strict';

angular.module('app.component-new', [
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('component-new', {
            url: '/components/new',
            views: {
                "main": {
                    controller: 'ComponentNewCtrl',
                    templateUrl: 'app/component/component-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Create Feed Component'
            }
        });
    })
    .controller('ComponentNewCtrl', function ComponentNewController($scope, Slug, $indexedDB, $state) {
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

        $scope.submit = function() {
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            $indexedDB.objectStore('components')
                .upsert($scope.formResult)
                .then(function(e) {
                    Messenger().post("Saved component " + $scope.formResult.name);

                    $state.go('component-list');
                });
        }
    });
