'use strict';

angular.module('app.feed-new', [
        'app.common-api',
        'app.common-auth',
        'app.feed-service',
        'ngLodash',
        'slugifier',
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-new', {
            url: '/feeds/new',
            views: {
                "main": {
                    controller: 'FeedNewCtrl',
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
                        maximumSelectionSize: 1,
                        sortResults: function(results) {
                            return results.sort();
                        }
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
            if (input && !isNaN(input)) {
                return Number(input.toPrecision(val));
            } else {
                return input;
            }
        };
    })
    .controller('FeedNewCtrl', FeedNewController);

FeedNewController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'feedUtil',
    'lodash',
    'Slug'
];

function FeedNewController($scope, $state, $timeout, APIUtil, AuthUtil, feedUtil, lodash, Slug) {
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

    APIUtil.getAllComponents($scope).then(function() {
        $scope.compData = lodash.sortBy($scope.compData, function(item) {
            return item.name;
        });
    });

    APIUtil.getAllAnimals($scope);

    // Initialize an object to collect all the input data
    $scope.formResult = {
        creationDate: new Date(),
        compData: [{
            _id: null,
            name: null,
            value: 100,
            cost: 0
        }],
        isPrivate: true
    };

    $scope.submit = function() {
        // Create an ID using the provided name
        $scope.formResult._id = Slug.slugify($scope.formResult.name);

        // Tag the feed with the owner ID
        $scope.formResult.owner = $scope.profile.user_id;

        // If the user is not privileged, automatically force their feeds to be
        // private so they can't spam the system
        if (!$scope.isPrivilegedUser()) {
            $scope.formResult.isPrivate = true;
        }

        var result = {};
        result[$scope.formResult._id] = $scope.formResult;

        APIUtil.addFeed(result).then(function() {
            Messenger().post("Saved feed '" + $scope.formResult.name + "'");

            $state.go('feed-list');
        });
    }

    $timeout(function() {
        $('#select0').select2('focus');
    });
}
