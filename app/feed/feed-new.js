/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:01:28
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-05 13:49:53
 */

'use strict';

angular.module('app.feed-new', [
        'app.common-api',
        'app.common-auth',
        'app.common-ui',
        'app.feed-service',
        'ngLodash',
        'slugifier',
        'ui.router'
    ])
    .config(FeedNewConfig)
    .directive('uiSelect', uiSelectDirective)
    .controller('FeedNewCtrl', FeedNewController);

FeedNewConfig.$inject = ['$stateProvider'];

function FeedNewConfig($stateProvider) {
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
}

function uiSelectDirective() {
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
}

FeedNewController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'FeedUtil',
    'lodash',
    'Slug',
    'UIUtil'
];

function FeedNewController($scope, $state, $timeout, APIUtil, AuthUtil, FeedUtil, lodash, Slug, UIUtil) {
    $scope.addNewComp = lodash.partial(FeedUtil.addNewComp, $scope);
    $scope.calculate = lodash.partial(FeedUtil.calculate, $scope);
    $scope.nullifyComp = lodash.partial(FeedUtil.nullifyComp, $scope);
    $scope.optFeed = lodash.partial(FeedUtil.optFeed, $scope);
    $scope.removeComp = lodash.partial(FeedUtil.removeComp, $scope);
    $scope.resetComps = lodash.partial(FeedUtil.resetComps, $scope);
    $scope.updateComp = lodash.partial(FeedUtil.updateComp, $scope);

    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.initRadio = UIUtil.initRadio;
    $scope.makeSticky = UIUtil.makeSticky;
    $scope.isUndefined = angular.isUndefined;

    APIUtil.getAllComponents($scope).then(function() {
        $scope.compData = lodash.sortBy($scope.compData, function(item) {
            return item.name;
        });

        if (localStorage.getItem('formResult')) {
            $scope.formResult = JSON.parse(localStorage.getItem('formResult'));

            $timeout(function() {
                $scope.formResult.compData.forEach(function(item, index) {
                    $('#select' + index).select2('val', item._id);
                });

                $scope.calculate();
            });
        } else {
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
        }
    });

    APIUtil.getAllAnimals($scope);

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
            localStorage.removeItem('formResult');

            Messenger().post("Saved feed '" + $scope.formResult.name + "'");

            $state.go('feed-list');
        });
    }

    $scope.$watch('formResult', function(newVal) {
        if (newVal) {
            localStorage.setItem('formResult', JSON.stringify(newVal));
        }
    }, true);

    $timeout(function() {
        $('#select0').select2('focus');
    });
}
