'use strict';

angular.module('app.common-login', [
        'auth0',
        'angular-storage',
        'angular-jwt',
        'ui.router'
    ])
    .config(LoginConfig)
    .controller('LoginCtrl', LoginController)
    .run(Authenticator);

LoginConfig.$inject = ['$httpProvider', '$stateProvider', 'jwtInterceptorProvider', 'authProvider'];

function LoginConfig($httpProvider, $stateProvider, jwtInterceptorProvider, authProvider) {
    // Configure the authentication provider
    authProvider.init({
        domain: 'feedulator.auth0.com',
        clientID: 'ZlO45vSlQVp1r4EyFMaOKLiUrScgmzdW',
        loginState: 'login'
    });

    jwtInterceptorProvider.tokenGetter = function(aiStorage, $http, jwtHelper) {
        var idToken = aiStorage.get('idToken'),
            refreshToken = aiStorage.get('refreshToken');

        if (idToken) {
            if (jwtHelper.isTokenExpired(idToken)) {
                return auth.refreshIdToken(refreshToken);
            } else {
                return idToken;
            }
        }
    }

    $httpProvider.interceptors.push('jwtInterceptor');
}

LoginController.$inject = ['$rootScope', '$scope', '$state', 'auth', 'aiStorage'];

function LoginController($rootScope, $scope, $state, auth, store) {
    var loginSuccess = function(profile, id_token, access_token, state, refresh_token) {
        store.set('profile', profile);
        store.set('idToken', id_token);
        store.set('refreshToken', refresh_token);

        $rootScope.profile = auth.profile;

        $state.go('feed-list');
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
            }
        }, loginSuccess, loginFailure);
    }

    $scope.signOut = function() {
        auth.signout();

        if ('profile' in $rootScope) {
            delete $rootScope.profile;
        }

        store.remove('profile');
        store.remove('idToken');
        store.remove('refreshToken');
    }
}

Authenticator.$inject = ['$rootScope', 'auth', 'aiStorage', 'jwtHelper']

function Authenticator($rootScope, auth, store, jwtHelper) {
    var rootScope = $rootScope;

    rootScope.$on('$locationChangeStart', function() {
        if (!auth.isAuthenticated) {
            var idToken = store.get('idToken'),
                profile = store.get('profile'),
                refreshToken = store.get('refreshToken');

            if (idToken) {
                if (!jwtHelper.isTokenExpired(idToken)) {
                    auth.authenticate(profile, idToken);

                    auth.profilePromise.then(function() {
                        rootScope.profile = auth.profile;
                    });
                } else {
                    if (refreshToken) {
                        return auth.refreshIdToken(refreshToken).then(function(newIdToken) {
                            store.set('idToken', newIdToken);

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
