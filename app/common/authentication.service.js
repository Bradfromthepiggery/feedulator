/*
* @Author: Lim Mingjie, Kenneth
* @Date:   2014-12-02 14:37:58
* @Last Modified by:   Lim Mingjie, Kenneth
* @Last Modified time: 2014-12-03 02:54:01
*/

'use strict';

angular.module('app.common-auth', [
        'auth0',
        'ngLodash'
    ])
    .service('AuthUtil', AuthUtil)
    .controller('AuthCtrl', AuthController);

AuthController.$inject = ['$scope', 'auth'];

function AuthController($scope, auth) {
    auth.profilePromise.then(function() {
        $scope.profile = auth.profile;
    });
}

AuthUtil.$inject = ['lodash'];

function AuthUtil(lodash) {
        var isPrivilegedUser = function(scope) {
            if (scope.profile) {
                return lodash.contains(authorizedUsers, scope.profile.email);
            } else {
                return false;
            }
        }

        var isLoggedIn = function(scope) {
            return scope.profile ? true : false;
        }

        var itemFilter = function(scope, item) {
            // Privileged Users can see everything
            if (isPrivilegedUser(scope)) {
                return true;
            } else {
                // Everyone can see public feeds
                if (!item.isPrivate) {
                    return true;
                } else {
                    // Normal users can only see their own feeds
                    if (isLoggedIn(scope)) {
                        return item.owner === scope.profile.user_id;
                    } else {
                        return false;
                    }
                }
            }
        }

        this.isPrivilegedUser = isPrivilegedUser;
        this.isLoggedIn = isLoggedIn;
        this.itemFilter = itemFilter;
    }
