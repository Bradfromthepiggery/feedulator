/*
* @Author: Lim Mingjie, Kenneth
* @Date:   2014-12-10 22:09:04
* @Last Modified by:   Lim Mingjie, Kenneth
* @Last Modified time: 2014-12-11 01:21:42
*/

'use strict';

angular.module('app.animal-new', [
        'app.common-api',
        'app.common-auth',
        'ngLodash',
        'slugifier',
        'ui.router'
    ])
    .config(AnimalNewConfig)
    .controller('AnimalNewCtrl', AnimalNewController);

////////////////////////////////////////////////////////////////////////////////
// Animal New Configuration ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AnimalNewConfig.$inject = ['$stateProvider'];

function AnimalNewConfig($stateProvider) {
    $stateProvider.state('animal-new', {
        url: '/animals/new',
        views: {
            "main": {
                controller: 'AnimalNewCtrl',
                templateUrl: 'app/animal/animal-new.tpl.min.html'
            }
        },
        data: {
            pageTitle: 'Create Animal'
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// Animal New Controller ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AnimalNewController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'lodash',
    'Slug',
    'UIUtil'
]

function AnimalNewController($scope, $state, $timeout, APIUtil, AuthUtil, lodash, Slug, UIUtil) {
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.initRadio = UIUtil.initRadio;
    $scope.makeSticky = UIUtil.makeSticky;

    $scope.formResult = {
        creationDate: new Date(),
        nutrients: nutrientMasterList,
        isPrivate: true
    }

    $scope.submit = function() {
        // Create an ID using the provided name
        $scope.formResult._id = Slug.slugify($scope.formResult.name);

        // Keep only non-zero nutrient entries
        $scope.formResult.nutrients = lodash.pick($scope.formResult.nutrients, function(item) {
            return item.value !== 0;
        });

        // Tag the feed with the owner ID
        $scope.formResult.owner = $scope.profile.user_id;

        // If the user is not privileged, automatically force their feeds to be
        // private so they can't spam the system
        if (!$scope.isPrivilegedUser()) {
            $scope.formResult.isPrivate = true;
        }

        var result = {};
        result[$scope.formResult._id] = $scope.formResult;

        APIUtil.addAnimal(result).then(function() {
            Messenger().post("Saved animal '" + $scope.formResult.name + "'");

            $state.go('animal-list');
        });
    }
}
