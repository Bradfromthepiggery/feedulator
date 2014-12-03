'use strict';

angular.module('app.feed-list', [
        'app.common-api',
        'app.common-auth',
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
    'lodash'
];

function FeedListController($rootScope, $scope, $state, $timeout, APIUtil, AuthUtil, lodash) {
    $scope.userFilter = lodash.partial(AuthUtil.itemFilter, $scope);

    APIUtil.getAllFeeds($scope);

    $scope.deleteFeed = function(feedId) {
        $scope.feedData = lodash.reject($scope.feedData, {
            _id: feedId
        });

        APIUtil.deleteFeed(feedId).then(function() {
            Messenger().post("Successfully deleted feed.");
        });
    }

    $timeout(function() {
        $(':checkbox').radiocheck();
    });
}
