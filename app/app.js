'use strict';

var appDependencies = [
    'angular-jwt',
    'angular-storage',
    'angular.filter',
    'angularMoment',
    'angularUtils.directives.dirPagination',
    'app.animal-edit',
    'app.animal-list',
    'app.animal-new',
    'app.common-api',
    'app.common-auth',
    'app.common-error',
    'app.common-home',
    'app.common-login',
    'app.component-edit',
    'app.component-list',
    'app.component-new',
    'app.feed-edit',
    'app.feed-list',
    'app.feed-new',
    'app.feed-service',
    'app.feed-view',
    'auth0',
    'ngAria',
    'ngLodash',
    'ngTouch',
    'restangular',
    'slugifier',
    'ui.router'
]

angular.module('app', appDependencies)
    .config(AppConfig)
    .controller('AppCtrl', AppController)
    .run(AppRun);


////////////////////////////////////////////////////////////////////////////////
// Initial Application Configuration ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AppConfig.$inject = [
    '$httpProvider',
    '$locationProvider',
    '$urlRouterProvider',
    'RestangularProvider'
]

function AppConfig($httpProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://thepiggery.net:8011/feedulator');

    // Catch bad paths and route them to the error page
    $urlRouterProvider.otherwise('/');

    // Configure the notification UI
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'block'
    }
}


////////////////////////////////////////////////////////////////////////////////
// Main Application Controller /////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AppController.$inject = [
    '$cacheFactory',
    '$location',
    '$scope',
    'auth',
    'Restangular'
];

function AppController($cacheFactory, $location, $scope, auth, Restangular) {
    var cache = $cacheFactory('http');

    Restangular.setDefaultHttpFields({
        cache: cache
    });
    Restangular.setResponseInterceptor(function(response, operation) {
        if (operation === 'put' || operation === 'post' || operation === 'delete') {
            cache.removeAll();
        }
        return response;
    });

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | The Feedulator';
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// Application Run-on-load Functions ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AppRun.$inject = ['auth'];

function AppRun(auth) {
    auth.hookEvents();
}
