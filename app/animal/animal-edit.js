/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:41:47
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-03 01:49:29
 */

'use strict';

angular.module('app.animal-edit', [
        'app.common-api',
        'app.common-auth',
        'app.common-ui',
        'ngLodash',
        'ui.router'
    ])
    .config(AnimalEditConfig)
    .controller('AnimalEditCtrl', AnimalEditController);

AnimalEditConfig.$inject = ['$stateProvider'];

function AnimalEditConfig($stateProvider) {
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
}

AnimalEditController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'APIUtil',
    'AuthUtil',
    'Slug',
    'UIUtil'
];

function AnimalEditController($scope, $state, $stateParams, APIUtil, AuthUtil, Slug, UIUtil) {
    $scope.initRadio = UIUtil.initRadio;
    $scope.makeSticky = UIUtil.makeSticky;

    // Extract the animal data from the database and bind to the scope
    APIUtil.getAnimal($scope, $stateParams.animalId);

    $scope.submit = function() {
        var result = {};
        result[$scope.formResult._id] = $scope.formResult;

        APIUtil.updateAnimal($scope.formResult._id, result).then(function() {
            Messenger().post("Saved animal '" + $scope.formResult.name + "'");

            $state.go('animal-list');
        });
    }
}
