'use strict';

angular.module('app.feed-edit', [
        'app.common-api',
        'app.common-auth',
        'app.feed-service',
        'ngLodash',
        'ui.router',
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
                pageTitle: 'Edit Feed'
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
    'feedUtil',
    'lodash'
];

function FeedEditController($scope, $state, $stateParams, $timeout, APIUtil, AuthUtil, feedUtil, lodash) {
    $scope.addNewComp = lodash.partial(feedUtil.addNewComp, $scope);
    $scope.calculate = lodash.partial(feedUtil.calculate, $scope);
    $scope.initCheckbox = feedUtil.initCheckbox;
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);
    $scope.makeSticky = feedUtil.makeSticky;
    $scope.nullifyComp = lodash.partial(feedUtil.nullifyComp, $scope);
    $scope.optFeed = lodash.partial(feedUtil.optFeed, $scope);
    $scope.removeComp = lodash.partial(feedUtil.removeComp, $scope);
    $scope.resetComps = lodash.partial(feedUtil.resetComps, $scope);
    $scope.updateComp = lodash.partial(feedUtil.updateComp, $scope);

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
            Messenger().post("Saved feed mixture " + $scope.formResult.name);

            $state.go('feed-list');
        });
    }
}
