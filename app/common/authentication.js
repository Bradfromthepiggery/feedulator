'use strict';

angular.module('app.common-auth', [
        'auth0'
    ])
    .service('AuthUtil', function() {
        var isPrivilegedUser = function(scope) {
            if (scope.profile) {
                return scope.profile.email === 'kenlimmj@gmail.com';
            } else {
                return false;
            }
        }

        var isLoggedIn = function(scope) {
            return scope.profile ? true : false;
        }

        this.isPrivilegedUser = isPrivilegedUser;
        this.isLoggedIn = isLoggedIn;
    })
    .controller('AuthCtrl', AuthController);

AuthController.$inject = ['$scope', 'auth'];

function AuthController($scope, auth) {
    auth.profilePromise.then(function() {
        $scope.profile = auth.profile;
    });
}
