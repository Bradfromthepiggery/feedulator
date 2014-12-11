/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-10 22:09:11
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-11 02:19:09
 */

'use strict';

var DEBUG = false;

angular.module('app.common-api', [
        'app.common-auth',
        'ngLodash',
        'restangular'
    ])
    .service('APIUtil', APIUtil);

APIUtil.$inject = [
    'AuthUtil',
    'Restangular',
    'lodash'
];

/**
 * @ngdoc  service
 * @name  app.common-api.APIUtil
 * @requires  AuthUtil
 * @requires  Restangular
 * @requires  lodash
 *
 * @description
 * Provides convenience functions for making requests to the API
 */
function APIUtil(AuthUtil, Restangular, lodash) {
    // API Endpoints
    var animalEndpoint = Restangular.all('animal'),
        componentEndpoint = Restangular.all('component'),
        feedEndpoint = Restangular.all('mixture');

    ////////////////////////////////////////////////////////////////////////
    // Animal API Calls ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#getAllAnimals
     * @methodOf app.common-api.APIUtil
     * @name  getAllAnimals
     * @param {Object} scope The scope which this function will act upon.
     *
     * @description
     * Retrieves all animal entries from the database
     */
    var getAllAnimals = function(scope) {
        return animalEndpoint.get('all').then(function(data) {
            var data = lodash.toArray(Restangular.stripRestangular(data));

            scope.animalData = data.filter(function(item) {
                return AuthUtil.itemFilter(scope, item);
            });

            scope.animalCount = scope.animalData.length;
        }, function(response) {
            scope.animalData = [];
            scope.animalCount = 0;

            if (DEBUG) {
                console.log("API Error", response.status);
            }
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#getAnimal
     * @methodOf app.common-api.APIUtil
     * @name  getAnimal
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} animalId The id associated with the animal to be retrieved
     *
     * @description
     * Retrieves a specific animal from the database
     */
    var getAnimal = function(scope, animalId) {
        return componentEndpoint.get(animalId).then(function(data) {
            scope.formResult = lodash.toArray(Restangular.stripRestangular(data))[0];
        }, function(response) {
            scope.formResult = null;

            if (DEBUG) {
                console.log("API Error", response.status);
            }
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#addAnimal
     * @methodOf app.common-api.APIUtil
     * @name  addAnimal
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} data The data for the animal to be inserted. This should be a string representation of a JSON object.
     *
     * @description
     * Inserts an animal into the database via a POST request
     */
    var addAnimal = function(data) {
        return animalEndpoint.all('new').post(data);
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#updateAnimal
     * @methodOf app.common-api.APIUtil
     * @name  updateAnimal
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} animalId The id associated with the animal to be updated
     * @param {String} data The data for the animal to be updated. This should be a string representation of a JSON object.
     *
     * @description
     * Updates an animal in the database. Note that this uses a POST request instead of a PATCH request to keep things simple.
     */
    var updateAnimal = function(animalId, data) {
        return feedEndpoint.all(animalId).post(data);
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#deleteAnimal
     * @methodOf app.common-api.APIUtil
     * @name  deleteAnimal
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} animalId The id associated with the animal to be deleted
     *
     * @description
     * Deletes an animal in the database via a DELETE request
     */
    var deleteAnimal = function(animalId) {
        return animalEndpoint.all(animalId).remove();
    }


    ////////////////////////////////////////////////////////////////////////
    // Component API Calls /////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#getAllComponents
     * @methodOf app.common-api.APIUtil
     * @name  getAllComponents
     * @param {Object} scope The scope which this function will act upon.
     *
     * @description
     * Retrieves all component entries from the database
     */
    var getAllComponents = function(scope) {
        return componentEndpoint.get('all').then(function(data) {
            var data = lodash.toArray(Restangular.stripRestangular(data));

            scope.compData = data.filter(function(item) {
                return AuthUtil.itemFilter(scope, item);
            });

            scope.compCount = scope.compData.length;
        }, function(response) {
            scope.compData = [];
            scope.compCount = 0;

            if (DEBUG) {
                console.log("API Error", response.status);
            }
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#getComponent
     * @methodOf app.common-api.APIUtil
     * @name  getComponent
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} componentId The id associated with the component to be retrieved
     *
     * @description
     * Retrieves a specific component from the database
     */
    var getComponent = function(scope, componentId) {
        return componentEndpoint.get(componentId).then(function(data) {
            scope.formResult = lodash.toArray(Restangular.stripRestangular(data))[0];
        }, function(response) {
            scope.formResult = null;

            if (DEBUG) {
                console.log("API Error", response.status);
            }
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#addComponent
     * @methodOf app.common-api.APIUtil
     * @name  addComponent
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} data The data for the component to be inserted. This should be a string representation of a JSON object.
     *
     * @description
     * Inserts an component into the database via a POST request
     */
    var addComponent = function(data) {
        return componentEndpoint.all('new').post(data);
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#updateComponent
     * @methodOf app.common-api.APIUtil
     * @name  updateComponent
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} componentId The id associated with the component to be updated
     * @param {String} data The data for the component to be updated. This should be a string representation of a JSON object.
     *
     * @description
     * Updates an component in the database. Note that this uses a POST request instead of a PATCH request to keep things simple.
     */
    var updateComponent = function(componentId, data) {
        return feedEndpoint.all(componentId).post(data);
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#deleteComponent
     * @methodOf app.common-api.APIUtil
     * @name  deleteComponent
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} componentId The id associated with the component to be deleted
     *
     * @description
     * Deletes an component in the database via a DELETE request
     */
    var deleteComponent = function(componentId) {
        return componentEndpoint.all(componentId).remove();
    }


    ////////////////////////////////////////////////////////////////////////
    // Feed API Calls //////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#getAllFeeds
     * @methodOf app.common-api.APIUtil
     * @name  getAllFeeds
     * @param {Object} scope The scope which this function will act upon.
     *
     * @description
     * Retrieves all feed entries from the database
     */
    var getAllFeeds = function(scope) {
        return feedEndpoint.get('all').then(function(data) {
            var data = lodash.toArray(Restangular.stripRestangular(data));

            scope.feedData = data.filter(function(item) {
                return AuthUtil.itemFilter(scope, item);
            });

            scope.feedCount = scope.feedData.length;
        }, function(response) {
            scope.feedData = [];
            scope.feedCount = 0;

            if (DEBUG) {
                console.log("API Error", response.status);
            }
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#getFeed
     * @methodOf app.common-api.APIUtil
     * @name  getFeed
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} feedId The id associated with the feed to be retrieved
     *
     * @description
     * Retrieves a specific feed from the database
     */
    var getFeed = function(scope, feedId) {
        return feedEndpoint.get(feedId).then(function(data) {
            scope.formResult = lodash.toArray(Restangular.stripRestangular(data))[0];
        }, function(response) {
            scope.formResult = null;

            if (DEBUG) {
                console.log("API Error", response.status);
            }
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#addFeed
     * @methodOf app.common-api.APIUtil
     * @name  addFeed
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} data The data for the feed to be inserted. This should be a string representation of a JSON object.
     *
     * @description
     * Inserts an feed into the database via a POST request
     */
    var addFeed = function(data) {
        return feedEndpoint.all('new').post(data);
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#updateFeed
     * @methodOf app.common-api.APIUtil
     * @name  updateFeed
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} feedId The id associated with the feed to be updated
     * @param {String} data The data for the feed to be updated. This should be a string representation of a JSON object.
     *
     * @description
     * Updates an feed in the database. Note that this uses a POST request instead of a PATCH request to keep things simple.
     */
    var updateFeed = function(feedId, data) {
        return feedEndpoint.all(feedId).post(data);
    }

    /**
     * @ngdoc method
     * @name  app.common-api.APIUtil#deleteFeed
     * @methodOf app.common-api.APIUtil
     * @name  deleteFeed
     * @param {Object} scope The scope which this function will act upon.
     * @param {String} feedId The id associated with the feed to be deleted
     *
     * @description
     * Deletes an feed in the database via a DELETE request
     */
    var deleteFeed = function(feedId) {
        return feedEndpoint.all(feedId).remove();
    }

    this.animalEndpoint = animalEndpoint;
    this.componentEndpoint = componentEndpoint;
    this.feedEndpoint = feedEndpoint;

    this.getAllAnimals = getAllAnimals;
    this.getAllComponents = getAllComponents;
    this.getAllFeeds = getAllFeeds;

    this.getAnimal = getAnimal;
    this.getComponent = getComponent;
    this.getFeed = getFeed;

    this.addAnimal = addAnimal;
    this.addComponent = addComponent;
    this.addFeed = addFeed;

    this.updateAnimal = updateAnimal;
    this.updateComponent = updateComponent;
    this.updateFeed = updateFeed;

    this.deleteAnimal = deleteAnimal;
    this.deleteComponent = deleteComponent;
    this.deleteFeed = deleteFeed;
}
