/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:15:05
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-11 02:04:45
 */

'use strict';

var appDependencies = [
    'angular-jwt',
    'angular-loading-bar',
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
    'app.common-filters',
    'app.common-home',
    'app.common-login',
    'app.common-ui',
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

/**
 * @ngdoc  overview
 * @name  app
 * @requires  angular-jwt
 * @requires  angular-loading-bar
 * @requires  angular-storage
 * @requires  angular.filter
 * @requires  angularMoment
 * @requires  angularUtils.directives.dirPagination
 * @requires  app.animal-edit
 * @requires  app.animal-list
 * @requires  app.animal-new
 * @requires  app.common-api
 * @requires  app.common-auth
 * @requires  app.common-error
 * @requires  app.common-filters
 * @requires  app.common-home
 * @requires  app.common-login
 * @requires  app.common-ui
 * @requires  app.component-edit
 * @requires  app.component-list
 * @requires  app.component-new
 * @requires  app.feed-edit
 * @requires  app.feed-list
 * @requires  app.feed-new
 * @requires  app.feed-service
 * @requires  app.feed-view
 * @requires  auth0
 * @requires  ngAria
 * @requires  ngLodash
 * @requires  ngTouch
 * @requires  restangular
 * @requires  slugifier
 * @requires  ui.route
 *
 * @description
 * The Feedulator Main Application
 */
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
    'cfpLoadingBarProvider',
    'RestangularProvider',
]

function AppConfig($httpProvider, $locationProvider, $urlRouterProvider, cfpLoadingBarProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://thepiggery.net:8011/feedulator');

    // Catch bad paths and route them to the error page
    $urlRouterProvider.otherwise('/');

    // Configure the notification UI
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'block'
    }

    cfpLoadingBarProvider.includeSpinner = false;
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
