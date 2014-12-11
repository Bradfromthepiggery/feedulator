/*
* @Author: Lim Mingjie, Kenneth
* @Date:   2014-12-10 22:09:13
* @Last Modified by:   Lim Mingjie, Kenneth
* @Last Modified time: 2014-12-11 01:23:03
*/

'use strict';

angular.module('app.common-login', [
        'angular-jwt',
        'angular-storage',
        'app.common-api',
        'auth0',
        'ui.router'
    ])
    .config(LoginConfig)
    .controller('LoginCtrl', LoginController)
    .run(Authenticator);

LoginConfig.$inject = [
    '$httpProvider',
    '$stateProvider',
    'authProvider',
    'jwtInterceptorProvider'
];

function LoginConfig($httpProvider, $stateProvider, authProvider, jwtInterceptorProvider) {
    // Configure the authentication provider
    authProvider.init({
        domain: 'feedulator.auth0.com',
        clientID: 'ZlO45vSlQVp1r4EyFMaOKLiUrScgmzdW',
        loginState: 'login'
    });

    jwtInterceptorProvider.tokenGetter = ['$http', 'aiStorage', 'auth', 'jwtHelper', function($http, aiStorage, auth, jwtHelper) {
        var idToken = aiStorage.get('idToken'),
            refreshToken = aiStorage.get('refreshToken');

        if (idToken) {
            if (jwtHelper.isTokenExpired(idToken)) {
                return auth.refreshIdToken(refreshToken);
            } else {
                return idToken;
            }
        }
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
}

LoginController.$inject = [
    '$rootScope',
    '$scope',
    '$state',
    'aiStorage',
    'APIUtil',
    'auth'
];

function LoginController($rootScope, $scope, $state, aiStorage, APIUtil, auth) {
    var loginSuccess = function(profile, id_token, access_token, state, refresh_token) {
        aiStorage.set('profile', profile);
        aiStorage.set('idToken', id_token);
        aiStorage.set('refreshToken', refresh_token);

        $rootScope.profile = auth.profile;

        if ($state.is('feed-list')) {
            APIUtil.getAllFeeds($scope.$$nextSibling);
        } else if ($state.is('component-list')) {
            APIUtil.getAllComponents($scope.$$nextSibling);
        } else if ($state.is('animal-list')) {
            APIUtil.getAllAnimals($scope.$$nextSibling);
        }
    }

    var loginFailure = function(err) {
        console.error("Error logging in: " + err);
    }

    $scope.signIn = function() {
        auth.signin({
            authParams: {
                popup: true,
                connection: 'google-oauth2',
                scope: 'openid name email offline_access'
            },
            socialBigButtons: true,
            icon: './app/assets/pig.svg'
        }, loginSuccess, loginFailure);
    }

    $scope.signOut = function() {
        auth.signout();

        if ('profile' in $rootScope) {
            delete $rootScope.profile;
        }

        aiStorage.remove('profile');
        aiStorage.remove('idToken');
        aiStorage.remove('refreshToken');

        $state.reload();
    }
}

Authenticator.$inject = [
    '$rootScope',
    'aiStorage',
    'auth',
    'jwtHelper'
]

function Authenticator($rootScope, aiStorage, auth, jwtHelper) {
    var rootScope = $rootScope;

    rootScope.$on('$locationChangeStart', function() {
        if (!auth.isAuthenticated) {
            var idToken = aiStorage.get('idToken'),
                profile = aiStorage.get('profile'),
                refreshToken = aiStorage.get('refreshToken');

            if (idToken) {
                if (!jwtHelper.isTokenExpired(idToken)) {
                    auth.authenticate(profile, idToken);

                    auth.profilePromise.then(function() {
                        rootScope.profile = auth.profile;
                    });
                } else {
                    if (refreshToken) {
                        return auth.refreshIdToken(refreshToken).then(function(newIdToken) {
                            aiStorage.set('idToken', newIdToken);

                            auth.authenticate(profile, newIdToken);

                            auth.profilePromise.then(function() {
                                rootScope.profile = auth.profile;
                            });
                        });
                    } else {
                        console.error("Need to log in");
                    }
                }
            }
        }
    });
}
