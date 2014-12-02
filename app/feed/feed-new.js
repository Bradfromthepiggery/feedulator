'use strict';

angular.module('app.feed-new', [
        'app.feed-service',
        'app.common-auth',
        'ngLodash',
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-new', {
            url: '/feeds/new',
            views: {
                "main": {
                    controller: 'FeedCreationCtrl',
                    templateUrl: 'app/feed/feed-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Create New Feed'
            }
        });
    })
    .directive('uiSelect', function() {
        return function(scope, element, attrs) {
            // Watch for changes to the list of selected components
            scope.$watch('formResult.compData', function() {
                // Initialize the Select2 combobox, then bind an event handler
                // so the scope is updated whenever the value changes
                $('#select' + attrs.uiSelect)
                    .select2({
                        openOnEnter: false,
                        maximumSelectionSize: 1
                    })
                    .on('change', function(e) {
                        if (e.added) {
                            scope.$apply('updateComp(' + attrs.uiSelect + ', \'' + e.val + '\')');
                        } else if (e.removed) {
                            scope.$apply('nullifyComp(' + attrs.uiSelect + ')');
                        }

                    });
            });
        }
    })
    .filter('precision', function() {
        return function(input, val) {
            return Number(input.toPrecision(val));
        };
    })
    .controller('FeedCreationCtrl', FeedCreationController);

FeedCreationController.$inject = ['$scope', '$http', '$indexedDB', 'lodash', 'Slug', '$state', '$timeout', 'feedUtil', 'AuthUtil'];

function FeedCreationController($scope, $http, $indexedDB, lodash, Slug, $state, $timeout, feedUtil, AuthUtil) {
    // Extract all components from the database and bind them to the scope
    $indexedDB.objectStore('components').getAll().then(function(results) {
        $scope.compData = results;
        $scope.compCount = Object.keys($scope.compData).length;
    });

    // Extract all animals from the database and bind them to the scope
    $indexedDB.objectStore('animals').getAll().then(function(results) {
        $scope.animalData = results;
    });

    // Initialize an object to collect all the input data
    $scope.formResult = {
        compData: [{
            _id: null,
            name: null,
            value: 100,
            cost: 0
        }],
        creationDate: new Date()
    };

    $scope.addNewComp = lodash.partial(feedUtil.addNewComp, $scope);
    $scope.calculate = lodash.partial(feedUtil.calculate, $scope);
    $scope.initCheckbox = feedUtil.initCheckbox;
    $scope.makeSticky = feedUtil.makeSticky;
    $scope.nullifyComp = lodash.partial(feedUtil.nullifyComp, $scope);
    $scope.optFeed = lodash.partial(feedUtil.optFeed, $scope);
    $scope.removeComp = lodash.partial(feedUtil.removeComp, $scope);
    $scope.resetComps = lodash.partial(feedUtil.resetComps, $scope);
    $scope.updateComp = lodash.partial(feedUtil.updateComp, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);

    $scope.submit = function() {
        // Create an id using the provided name
        $scope.formResult._id = Slug.slugify($scope.formResult.name);

        // Tag the feed with the owner ID
        $scope.formResult.owner = $scope.profile.user_id;

        // Set the privacy status depending on the user's privileges. Only a
        // superuser may choose privacy state - default users can only create
        // private feeds
        if ($scope.isPrivilegedUser()) {
            $scope.formResult.isPrivate = Boolean($('input[name="privacySelector"]:checked').val());
        } else {
            $scope.formResult.isPrivate = true;
        }

        // Upsert (Update or Insert) into the local database, then
        // route the user back to the list view
        $indexedDB.objectStore('feeds')
            .upsert($scope.formResult)
            .then(function(e) {
                Messenger().post('Saved feed ' + $scope.formResult.name);

                $state.go('feed-list', null, {
                    reload: true
                });
            });
    }

    $timeout(function() {
        $('#select0').select2('focus');
    });
}
