'use strict';

angular.module('app.animal-edit', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('animal-edit', {
            url: '/animals/:animalId',
            views: {
                "main": {
                    controller: 'AnimalEditCtrl',
                    templateUrl: 'app/animal/animal-edit.tpl.html'
                }
            },
            data: {
                pageTitle: 'Animal Information'
            }
        });
    })
    .controller('AnimalEditCtrl', function AnimalEditController($stateParams, $scope, $http) {
        $http.get('data/' + $stateParams.animalId + '.json').success(function(data) {
            $scope.animalData = data;
        });
    });
