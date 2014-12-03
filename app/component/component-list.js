'use strict';

angular.module('app.component-list', [
        'app.common-api',
        'app.common-auth',
        'app.common-ui',
        'ngLodash',
        'ui.router'
    ])
    .config(CompListConfig)
    .controller('CompListCtrl', CompListController);


////////////////////////////////////////////////////////////////////////////////
// Component List Configuration ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

CompListConfig.$inject = ['$stateProvider'];

function CompListConfig($stateProvider) {
    $stateProvider.state('component-list', {
        url: '/components/list',
        views: {
            "main": {
                controller: 'CompListCtrl',
                templateUrl: 'app/component/component-list.tpl.html'
            }
        },
        data: {
            pageTitle: 'Feed Components'
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// Component List Controller ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

CompListController.$inject = [
    '$rootScope',
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'lodash',
    'UIUtil'
];

function CompListController($rootScope, $scope, $state, $timeout, APIUtil, AuthUtil, lodash, UIUtil) {
    $scope.isLoggedIn = lodash.partial(AuthUtil.isLoggedIn, $scope);
    $scope.isPrivilegedUser = lodash.partial(AuthUtil.isPrivilegedUser, $scope);

    $scope.userFilter = lodash.partial(AuthUtil.itemFilter, $scope);

    $scope.masonryInit = UIUtil.masonryInit;
    $scope.masonryUpdate = UIUtil.masonryUpdate;

    APIUtil.getAllComponents($scope);

    $scope.deleteComp = function(feedId) {
        $scope.compData = lodash.reject($scope.compData, {
            _id: feedId
        });

        APIUtil.deleteComponent(feedId).then(function() {
            Messenger().post("Successfully deleted component.");
        });
    }

    $timeout(function() {
        UIUtil.initCheckbox();
    });
}
