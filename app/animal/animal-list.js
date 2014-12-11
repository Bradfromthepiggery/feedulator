'use strict';

angular.module('app.animal-list', [
        'app.common-api',
        'app.common-auth',
        'ngLodash',
        'ui.router'
    ])
    .config(AnimalListConfig)
    .controller('AnimalListCtrl', AnimalListController);

////////////////////////////////////////////////////////////////////////////////
// Animal List Configuration ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AnimalListConfig.$inject = ['$stateProvider'];

function AnimalListConfig($stateProvider) {
    $stateProvider.state('animal-list', {
        url: '/animals/list',
        views: {
            "main": {
                controller: 'AnimalListCtrl',
                templateUrl: 'app/animal/animal-list.tpl.html'
            }
        },
        data: {
            pageTitle: 'Animals'
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// Animal List Controller //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AnimalListController.$inject = [
    '$rootScope',
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'lodash',
    'UIUtil'
];

function AnimalListController($rootScope, $scope, $state, $timeout, APIUtil, AuthUtil, lodash, UIUtil) {
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.masonryInit = UIUtil.masonryInit;
    $scope.masonryUpdate = UIUtil.masonryUpdate;

    $scope.search = "";

    APIUtil.getAllAnimals($scope);

    $scope.deleteAnimal = function(animalId) {
        $scope.animalData = lodash.reject($scope.animalData, {
            _id: animalId
        });

        APIUtil.deleteAnimal(animalId).then(function() {
            Messenger().post("Successfully deleted animal");

            $scope.masonryUpdate('#feedList');
        });
    }

    $timeout(function() {
        UIUtil.initCheckbox();
    });
}
