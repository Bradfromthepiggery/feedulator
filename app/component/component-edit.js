/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:40:40
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-03 01:47:16
 */

'use strict';

angular.module('app.component-edit', [
        'app.common-api',
        'app.common-auth',
        'app.common-ui',
        'ngLodash',
        'ui.router'
    ])
    .config(ComponentEditConfig)
    .controller('ComponentEditCtrl', ComponentEditController);

ComponentEditConfig.$inject = ['$stateProvider'];

function ComponentEditConfig($stateProvider) {
    $stateProvider.state('component-edit', {
        url: '/components/:compId/edit',
        views: {
            "main": {
                controller: 'ComponentEditCtrl',
                templateUrl: 'app/component/component-new.tpl.html'
            }
        },
        data: {
            pageTitle: 'Edit Feed Component'
        }
    });
}

ComponentEditController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'APIUtil',
    'AuthUtil',
    'Slug',
    'UIUtil'
];

function ComponentEditController($scope, $state, $stateParams, APIUtil, AuthUtil, Slug, UIUtil) {
    $scope.initRadio = UIUtil.initRadio;
    $scope.makeSticky = UIUtil.makeSticky;

    // Extract the component data from the database and bind to the scope
    APIUtil.getComponent($scope, $stateParams.componentId);

    $scope.submit = function() {
        var result = {};
        result[$scope.formResult._id] = $scope.formResult;

        APIUtil.updateComponent($scope.formResult._id, result).then(function() {
            Messenger().post("Saved feed component '" + $scope.formResult.name + "'");

            $state.go('component-list');
        });
    }
}
