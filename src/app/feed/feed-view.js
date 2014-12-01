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

        $scope.genExportData = function() {
            $scope.plainText = $scope.formResult.compData.reduce(function(acc, curr) {
                if ($scope.formResult.weight !== 0 && $scope.formResult.weight !== null) {
                    var proportion = curr.value * 0.01 * $scope.formResult.weight,
                        value = Number(proportion.toPrecision(3)) + " lb";
                } else {
                    var value = curr.value + "%";
                }

                return acc += curr.name + ", " + value + "\n";
            }, "");

            $scope.currentUrl = window.location.href;
        }

        $scope.calculate = lodash.partial(feedUtil.calculate, $scope);
    });