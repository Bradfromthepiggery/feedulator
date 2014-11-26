'use strict';

angular.module('app.feed-view', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-view', {
            url: '/feeds/:feedId',
            views: {
                "main": {
                    controller: 'FeedViewCtrl',
                    templateUrl: 'app/feed/feed-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'View Feed'
            }
        });
    })
    .controller('FeedViewCtrl', function FeedViewController($scope, $stateParams, Slug, $indexedDB, feedUtil, lodash, $timeout) {
        $indexedDB.objectStore('feeds').find($stateParams.feedId).then(function(result) {
            $scope.formResult = result;
        });

        // Extract all animals from the database and bind them to the scope
        $indexedDB.objectStore('animals').getAll().then(function(results) {
            $scope.animalData = results;
        });

        $scope.initCheckbox = lodash.partial(feedUtil.initCheckbox, $scope);
        $scope.calculate = lodash.partial(feedUtil.calculate, $scope);
    });