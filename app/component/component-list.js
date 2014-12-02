'use strict';

angular.module('app.component-list', [
        'ngLodash',
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
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
    })
    .controller('CompListCtrl', CompListController);

CompListController.$inject = ['$scope', '$state', '$indexedDB', 'lodash', '$timeout', '$http', '$rootScope'];

function CompListController($scope, $state, $indexedDB, lodash, $timeout, $http, $rootScope) {
    // $http.get('http://thepiggery.net:8011/feedulator/component/all')
    //     .success(function(data, status, headers, config) {
    //         $scope.compData = data;
    //     })
    //     .error(function(data) {
    //         debugger;
    //     });

    var compStore = $indexedDB.objectStore('components')

    compStore.getAll().then(function(results) {
        $scope.compData = results;
    });

    $scope.deleteComp = function(feedId) {
        compStore.delete(feedId).then(function() {
            Messenger().post("Successfully deleted component");

            $scope.compData = lodash.reject($scope.compData, {
                _id: feedId
            });
        });
    }

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (fromState.name === 'component-new' || fromState.name === 'component-edit') {
            compStore.getAll().then(function(results) {
                $scope.compData = results;
                $state.reload();
            });
        }
    });

    $timeout(function() {
        $(':checkbox').radiocheck();
    });
}

var getCompData = function() {

}
