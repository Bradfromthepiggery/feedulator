'use strict';

angular.module('app.feed-list', [
        'ngLodash',
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-list', {
            url: '/feeds/list',
            views: {
                "main": {
                    controller: 'MixtureListCtrl',
                    templateUrl: 'app/feed/feed-list.tpl.html'
                }
            },
            data: {
                pageTitle: 'All Feeds'
            }
        });
    })
    .controller('MixtureListCtrl', function MixtureListController($scope, $http, $indexedDB, lodash) {
        var feedStore = $indexedDB.objectStore('feeds')

        feedStore.getAll().then(function(results) {
            $scope.feedData = results;
        });

        $scope.deleteFeed = function(feedId) {
            feedStore.delete(feedId).then(function() {
                $scope.feedData = lodash.reject($scope.feedData, { _id: feedId });
            });
        }

        $(':checkbox').radiocheck();
    });
