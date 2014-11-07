'use strict';

var DB_NAME = 'feedulatorDB',
    DB_VERSION = 1,
    COMPONENT_TABLE_NAME = 'components',
    FEED_TABLE_NAME = 'feeds',
    ANIMAL_TABLE_NAME = 'animals';

angular.module('app', [
        'angular.filter',
        'angularMoment',
        'angularUtils.directives.dirPagination',
        'app.animal-list',
        'app.animal-new',
        'app.animal-view',
        'app.common-error',
        'app.common-home',
        'app.component-edit',
        'app.component-list',
        'app.component-new',
        'app.feed-calculator',
        'app.feed-edit',
        'app.feed-list',
        'app.feed-new',
        'ngLodash',
        'slugifier',
        'ui.router',
        'xc.indexedDB',
    ])
    .config(function($urlRouterProvider, $indexedDBProvider) {
        // Catch bad paths and route them to the error page
        $urlRouterProvider.otherwise('/404');

        // Initialize the local database
        $indexedDBProvider
            .connection(DB_NAME)
            .upgradeDatabase(1, function(_, db) {
                // Initialize a table to store feed components
                db.createObjectStore(COMPONENT_TABLE_NAME, {
                    keyPath: '_id'
                });

                // Initialize a table to store feeds
                db.createObjectStore(FEED_TABLE_NAME, {
                    keyPath: '_id'
                });

                // Initialize a table to store animal data
                db.createObjectStore(ANIMAL_TABLE_NAME, {
                    keyPath: '_id'
                });
            });

        // Configure the notification UI
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
            theme: 'flat'
        }
    })
    .controller('AppCtrl', function AppCtrl($scope, $location, $indexedDB) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | The Feedulator';
            }
        });

        initComponents($indexedDB);
    });

// An instance reads entries from data/components.json and bootstraps
// the components table in the local database
var initComponents = function(dbService) {
    var componentStore = dbService.objectStore(COMPONENT_TABLE_NAME);

    for (var compId in components) {
        componentStore.insert(components[compId]);
    }
}
