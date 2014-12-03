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
    .controller('FeedViewCtrl', FeedViewController);

FeedViewController.$inject = ['$scope', '$stateParams', 'Slug', 'feedUtil', 'lodash', '$timeout', 'Restangular'];

function FeedViewController($scope, $stateParams, Slug, feedUtil, lodash, $timeout, Restangular) {
    var feedAPI = Restangular.all('mixture'),
        animalAPI = Restangular.all('animal');

    // Extract the feed data from the database and bind to the scope
    feedAPI.get($stateParams.feedId).then(function(data) {
        $scope.formResult = Restangular.stripRestangular(data[$stateParams.feedId]);
    });

    // Extract all animals from the database and bind them to the scope
    animalAPI.get('all').then(function(data) {
        $scope.animalData = Restangular.stripRestangular(data);
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
}
