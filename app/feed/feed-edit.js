/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:16:25
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-05 08:50:14
 */

'use strict';

angular.module('app.feed-edit', [
        'app.common-api',
        'app.common-auth',
        'app.common-ui',
        'app.feed-service',
        'ngLodash',
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-edit', {
            url: '/feeds/edit/:feedId',
            views: {
                "main": {
                    controller: 'FeedEditCtrl',
                    templateUrl: 'app/feed/feed-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Edit Feed Mixture'
            }
        });
    })
    .controller('FeedEditCtrl', FeedEditController);

FeedEditController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'FeedUtil',
    'lodash',
    'Slug',
    'UIUtil'
];

function FeedEditController($scope, $state, $stateParams, $timeout, APIUtil, AuthUtil, FeedUtil, lodash, Slug, UIUtil) {
    $scope.addNewComp = lodash.partial(FeedUtil.addNewComp, $scope);
    $scope.calculate = lodash.partial(FeedUtil.calculate, $scope);
    $scope.nullifyComp = lodash.partial(FeedUtil.nullifyComp, $scope);
    $scope.optFeed = lodash.partial(FeedUtil.optFeed, $scope);
    $scope.removeComp = lodash.partial(FeedUtil.removeComp, $scope);
    $scope.resetComps = lodash.partial(FeedUtil.resetComps, $scope);
    $scope.updateComp = lodash.partial(FeedUtil.updateComp, $scope);

    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.initRadio = UIUtil.initRadio;
    $scope.makeSticky = UIUtil.makeSticky;
    $scope.isUndefined = angular.isUndefined;

    // Extract the feed data from the database and bind to the scope
    APIUtil.getFeed($scope, $stateParams.feedId);

    // Extract all animals from the database and bind them to the scope
    APIUtil.getAllAnimals($scope);

    // Extract all components from the database and bind them to the scope
    APIUtil.getAllComponents($scope).then(function(data) {
        // Populate the component selection fields once the component data
        // has loaded. This is wrapped in a timeout to enqueue it onto the
        // digest stack so the select2 field is guaranteed to initialize first
        $timeout(function() {
            $scope.formResult.compData.forEach(function(item, index) {
                $('#select' + index).select2('val', item._id);
            });

            $scope.calculate();
        });
    });

    $scope.submit = function() {
        var result = {};
        result[$scope.formResult._id] = $scope.formResult;

        APIUtil.updateFeed($scope.formResult._id, result).then(function() {
            Messenger().post("Saved feed mixture '" + $scope.formResult.name + "'");

            $state.go('feed-list');
        });
    }
}
