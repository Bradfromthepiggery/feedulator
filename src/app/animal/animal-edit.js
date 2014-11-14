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
    .controller('AnimalEditCtrl', function AnimalEditController($stateParams, $scope, $http) {
    });
