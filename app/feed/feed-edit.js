'use strict';

angular.module('app.feed-edit', [
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
                pageTitle: 'Edit Feed'
            }
        });
    })
    .controller('FeedEditCtrl', function FeedEditController($state, $scope, $stateParams, Slug, $indexedDB, feedUtil, lodash, $timeout) {
        $indexedDB.objectStore('components').getAll().then(function(results) {
            $scope.compData = results;
            $scope.compCount = Object.keys($scope.compData).length;

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

        // Extract all animals from the database and bind them to the scope
        $indexedDB.objectStore('animals').getAll().then(function(results) {
            $scope.animalData = results;
        });

        $indexedDB.objectStore('feeds').find($stateParams.feedId).then(function(result) {
            $scope.formResult = result;
        });

        $scope.addNewComp = lodash.partial(feedUtil.addNewComp, $scope);
        $scope.calculate = lodash.partial(feedUtil.calculate, $scope);
        $scope.initCheckbox = feedUtil.initCheckbox;
        $scope.makeSticky = feedUtil.makeSticky;
        $scope.nullifyComp = lodash.partial(feedUtil.nullifyComp, $scope);
        $scope.optFeed = lodash.partial(feedUtil.optFeed, $scope);
        $scope.removeComp = lodash.partial(feedUtil.removeComp, $scope);
        $scope.resetComps = lodash.partial(feedUtil.resetComps, $scope);
        $scope.updateComp = lodash.partial(feedUtil.updateComp, $scope);

        $scope.submit = function() {
            // Create an id using the provided name
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            // Upsert (Update or Insert) into the local database, then
            // route the user back to the list view
            $indexedDB.objectStore('feeds')
                .upsert($scope.formResult)
                .then(function(e) {
                    Messenger().post('Saved feed ' + $scope.formResult.name);

                    $state.go('feed-list');
                });
        }
    });
