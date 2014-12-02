'use strict';

var DB_NAME = 'feedulatorDB',
    DB_VERSION = 1,
    COMPONENT_TABLE_NAME = 'components',
    FEED_TABLE_NAME = 'feeds',
    ANIMAL_TABLE_NAME = 'animals';

angular.module('app', [
        'angular.filter',
        'auth0',
        'angularMoment',
        'angularUtils.directives.dirPagination',
        'angular-storage',
        'angular-jwt',
        'app.animal-edit',
        'app.animal-list',
        'app.animal-new',
        'app.common-error',
        'app.common-home',
        'app.common-login',
        'app.common-auth',
        'app.component-edit',
        'app.component-list',
        'app.component-new',
        'app.feed-edit',
        'app.feed-list',
        'app.feed-new',
        'app.feed-view',
        'app.feed-service',
        'ngLodash',
        'ngAria',
        'ngTouch',
        'slugifier',
        'ui.router',
        'xc.indexedDB',
    ])
    .config(function($urlRouterProvider, $indexedDBProvider) {
        // Catch bad paths and route them to the error page
        $urlRouterProvider.otherwise('/');

        // Initialize the local database
        $indexedDBProvider
            .connection(DB_NAME)
            .upgradeDatabase(3, function(_, db) {
                if (db.objectStoreNames.contains(COMPONENT_TABLE_NAME)) {
                    db.deleteObjectStore(COMPONENT_TABLE_NAME);
                }

                if (db.objectStoreNames.contains(FEED_TABLE_NAME)) {
                    db.deleteObjectStore(FEED_TABLE_NAME);
                }

                if (db.objectStoreNames.contains(ANIMAL_TABLE_NAME)) {
                    db.deleteObjectStore(ANIMAL_TABLE_NAME);
                }

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
            theme: 'block'
        }
    })
    .controller('AppCtrl', AppController)
    .run(function(auth) {
        auth.hookEvents();
    });

AppController.$inject = ['$scope', '$location', '$indexedDB', 'auth'];

function AppController($scope, $location, $indexedDB, auth) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | The Feedulator';
        }
    });

    initComponents($indexedDB);
    initAnimals($indexedDB);
}

// An instance reads entries from data/components.json and bootstraps
// the components table in the local database
var initComponents = function(dbService) {
    var componentStore = dbService.objectStore(COMPONENT_TABLE_NAME);

    for (var compId in components) {
        componentStore.insert(components[compId]);
    }
}

// An instance reads entries from data/animals.json and bootstraps
// the animals table in the local database
var initAnimals = function(dbService) {
    var animalStore = dbService.objectStore(ANIMAL_TABLE_NAME);

    for (var animalId in animals) {
        animalStore.insert(animals[animalId]);
    }
}
