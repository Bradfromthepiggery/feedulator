'use strict';

angular.module('app.feed-list', [
        'ngLodash',
        'ui.router',
        'xc.indexedDB',
        'app.common-auth'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-list', {
            url: '/feeds/list',
            views: {
                "main": {
                    controller: 'FeedListCtrl',
                    templateUrl: 'app/feed/feed-list.tpl.html'
                }
            },
            data: {
                pageTitle: 'All Feeds'
            }
        });
    })
    .controller('FeedListCtrl', function FeedListController($scope, $http, $indexedDB, lodash, $rootScope, $state, AuthUtil) {
        var feedStore = $indexedDB.objectStore('feeds')

        feedStore.getAll().then(function(results) {
            $scope.feedData = results;
        });

        $scope.deleteFeed = function(feedId) {
            feedStore.delete(feedId).then(function() {
                Messenger().post("Successfully deleted feed.");

                $scope.feedData = lodash.reject($scope.feedData, {
                    _id: feedId
                });
            });
        }

        $scope.userFilter = function(entry) {
            // Privileged Users can see everything
            if (AuthUtil.isPrivilegedUser($scope)) {
                return true;
            } else {
                // Everyone can see public feeds
                if (!entry.isPrivate) {
                    return true;
                } else {
                    // Normal users can only see their own feeds
                    if (AuthUtil.isLoggedIn($scope)) {
                        return entry.owner === $scope.profile.user_id;
                    } else {
                        return false;
                    }
                }
            }
        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (fromState.name === 'feed-new' || fromState.name === 'feed-edit') {
                feedStore.getAll().then(function(results) {
                    $scope.feedData = results;
                    $state.reload();
                });
            }
        });

        $(':checkbox').radiocheck();
    });
