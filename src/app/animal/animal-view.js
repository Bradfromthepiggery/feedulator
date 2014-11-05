'use strict';

angular.module('app.animal-view', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('animal-view', {
            url: '/animals/:animalId',
            views: {
                "main": {
                    controller: 'AnimalViewCtrl',
                    templateUrl: 'app/animal/animal-view.tpl.html'
                }
            },
            data: {
                pageTitle: 'Animal Information'
            }
        });
    })
    .controller('AnimalViewCtrl', function AnimalViewController($stateParams, $scope, $http) {
        $http.get('data/' + $stateParams.animalId + '.json').success(function(data) {
            $scope.animalData = data;
        });
    });
