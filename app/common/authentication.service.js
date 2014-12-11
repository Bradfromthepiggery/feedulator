/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-02 14:37:58
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-11 02:41:14
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

/**
 * @ngdoc  service
 * @name  app.common-auth.AuthUtil
 * @requires lodash
 *
 * @description
 * Provides convenience functions for authorizing and authenticating users
 */
function AuthUtil(lodash) {
    /**
     * @ngdoc method
     * @name  app.common-auth.AuthUtil#isPrivilegedUser
     * @methodOf app.common-auth.AuthUtil
     * @name  isPrivilegedUser
     * @param {Object} scope The scope which this function will act upon.
     *
     * @description
     * Looks up an internal list to check if a user has privileged rights.
     */
    var isPrivilegedUser = function(scope) {
        if (scope.profile) {
            return lodash.contains(authorizedUsers, scope.profile.email);
        } else {
            return false;
        }
    }

    /**
     * @ngdoc method
     * @name  app.common-auth.AuthUtil#isLoggedIn
     * @methodOf app.common-auth.AuthUtil
     * @name  isLoggedIn
     * @param {Object} scope The scope which this function will act upon.
     *
     * @description
     * Determines if a user has successfully logged in.
     */
    var isLoggedIn = function(scope) {
        return scope.profile ? true : false;
    }

    /**
     * @ngdoc method
     * @name  app.common-auth.AuthUtil#itemFilter
     * @methodOf app.common-auth.AuthUtil
     * @name  itemFilter
     * @param {Object} scope The scope which this function will act upon.
     * @param {Object} item The item to be filtered. The function expects this input to have the field <code>isPrivate</code>.
     *
     * @description
     * Checks if a user is permitted to view the item. This is used to prune any list of items that has to be displayed to users.
     */
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
