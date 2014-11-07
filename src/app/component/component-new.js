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
                    "unit": "g/kg DM"
                },
                "phosphorus": {
                    "name": "Phosphorus",
                    "value": 0,
                    "unit": "g/kg DM"
                },
                "lysine": {
                    "name": "Lysine",
                    "value": 0,
                    "unit": "% protein"
                },
                "methionine": {
                    "name": "Methionine",
                    "value": 0,
                    "unit": "% protein"
                },
                "threonone": {
                    "name": "Threonone",
                    "value": 0,
                    "unit": "% protein"
                },
                "tryptophan": {
                    "name": "Tryptophan",
                    "value": 0,
                    "unit": "% protein"
                },
                "valine": {
                    "name": "Valine",
                    "value": 0,
                    "unit": "% protein"
                },
                "sodium": {
                    "name": "Sodium",
                    "value": 0,
                    "unit": "g/kg DM"
                },
                "selenium": {
                    "name": "Selenium",
                    "value": 0,
                    "unit": "g/kg DM"
                },
                "zinc": {
                    "name": "Zinc",
                    "value": 0,
                    "unit": "mg/kg DM"
                },
                "linoleic_acid": {
                    "name": "Linoleic Acid",
                    "value": 0,
                    "unit": "% fat"
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
