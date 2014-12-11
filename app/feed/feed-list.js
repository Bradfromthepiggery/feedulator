'use strict';

angular.module('app.feed-list', [
        'app.common-api',
        'app.common-auth',
        'app.common-ui',
        'ngLodash',
        'ui.router'
    ])
    .config(FeedListConfig)
    .controller('FeedListCtrl', FeedListController);

////////////////////////////////////////////////////////////////////////////////
// Feed List Configuration /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

FeedListConfig.$inject = ['$stateProvider'];

function FeedListConfig($stateProvider) {
    $stateProvider.state('feed-list', {
        url: '/feeds/list',
        views: {
            "main": {
                controller: 'FeedListCtrl',
                templateUrl: 'app/feed/feed-list.tpl.html'
            }
        },
        data: {
            pageTitle: 'Feed Mixtures'
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// Feed List Controller ////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

FeedListController.$inject = [
    '$rootScope',
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'lodash',
    'UIUtil'
];

function FeedListController($rootScope, $scope, $state, $timeout, APIUtil, AuthUtil, lodash, UIUtil) {
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.masonryInit = UIUtil.masonryInit;
    $scope.masonryUpdate = UIUtil.masonryUpdate;

    $scope.search = "";

    APIUtil.getAllFeeds($scope);

    $scope.deleteFeed = function(feedId) {
        $scope.feedData = lodash.reject($scope.feedData, {
            _id: feedId
        });

        APIUtil.deleteFeed(feedId).then(function() {
            Messenger().post("Successfully deleted feed.");

            $scope.masonryUpdate('#feedList');
        });
    }

    $timeout(function() {
        UIUtil.initCheckbox();
    });
}
