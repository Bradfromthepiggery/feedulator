'use strict';

angular.module('app.component-new', [
        'app.common-api',
        'app.common-auth',
        'ngLodash',
        'slugifier',
        'ui.router'
    ])
    .config(ComponentNewConfig)
    .controller('ComponentNewCtrl', ComponentNewController);

////////////////////////////////////////////////////////////////////////////////
// Component New Configuration /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

ComponentNewConfig.$inject = ['$stateProvider'];

function ComponentNewConfig($stateProvider) {
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
}


////////////////////////////////////////////////////////////////////////////////
// Component New Controller ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

ComponentNewController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'lodash',
    'Slug'
];

function ComponentNewController($scope, $state, $timeout, APIUtil, AuthUtil, lodash, Slug) {
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.formResult = {
        creationDate: new Date(),
        nutrients: nutrientMasterList,
        gmoFree: false,
        isPrivate: true
    }

    $scope.makeSticky = function() {
        $('#nutritionPanel').sticky({
            topSpacing: 20,
            getWidthFrom: 'aside',
            responsiveWidth: true
        });
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

        APIUtil.addComponent(result).then(function() {
            Messenger().post("Saved component '" + $scope.formResult.name + "'");

            $state.go('component-list');
        });
    }

    $scope.initCheckbox = function() {
        $('input[type="radio"]').radiocheck();
    }
}
