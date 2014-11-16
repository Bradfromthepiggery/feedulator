'use strict';

angular.module('app.animal-edit', [
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('animal-edit', {
            url: '/animals/edit/:animalId',
            views: {
                "main": {
                    controller: 'AnimalEditCtrl',
                    templateUrl: 'app/animal/animal-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Edit Animal'
            }
        });
    })
    .controller('AnimalEditCtrl', function AnimalEditController($indexedDB, $stateParams, $scope, $http, Slug, $state) {
        $indexedDB.objectStore('animals').find($stateParams.animalId).then(function(result) {
            $scope.formResult = result;
        });

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
