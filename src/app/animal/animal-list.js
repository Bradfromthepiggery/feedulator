'use strict';

angular.module('app.animal-list', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('animal-list', {
            url: '/animals/list',
            views: {
                "main": {
                    controller: 'AnimalListCtrl',
                    templateUrl: 'app/animal/animal-list.tpl.html'
                }
            },
            data: {
                pageTitle: 'All Animals'
            }
        });
    })
    .controller('AnimalListCtrl', function AnimalListController($scope, $http) {
        $http.get('data/animals.json').success(function(data) {
            $scope.animalData = data;
        });
    });
