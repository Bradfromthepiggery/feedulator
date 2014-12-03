'use strict';

var DEBUG = false;

angular.module('app.common-api', [
        'ngLodash',
        'restangular'
    ])
    .service('APIUtil', function(Restangular, lodash) {
        // API Endpoints
        var animalEndpoint = Restangular.all('animal'),
            componentEndpoint = Restangular.all('component'),
            feedEndpoint = Restangular.all('mixture');

        ////////////////////////////////////////////////////////////////////////
        // Animal API Calls ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

        var getAllAnimals = function(scope) {
            return animalEndpoint.get('all').then(function(data) {
                scope.animalData = lodash.toArray(Restangular.stripRestangular(data));
                scope.animalCount = scope.animalData.length;
            }, function(response) {
                scope.animalData = [];
                scope.animalCount = 0;

                if (DEBUG) {
                    console.log("API Error", response.status);
                }
            });
        }

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

        var addAnimal = function(data) {
            return animalEndpoint.all('new').post(data);
        }

        var updateAnimal = function(animalId, data) {
            return feedEndpoint.all(animalId).post(data);
        }

        var deleteAnimal = function(animalId) {
            return animalEndpoint.all(animalId).remove();
        }


        ////////////////////////////////////////////////////////////////////////
        // Component API Calls /////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

        var getAllComponents = function(scope) {
            return componentEndpoint.get('all').then(function(data) {
                scope.compData = lodash.toArray(Restangular.stripRestangular(data));
                scope.compCount = scope.compData.length;
            }, function(response) {
                scope.compData = [];
                scope.compCount = 0;

                if (DEBUG) {
                    console.log("API Error", response.status);
                }
            });
        }

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

        var addComponent = function(data) {
            return componentEndpoint.all('new').post(data);
        }

        var updateComponent = function(componentId, data) {
            return feedEndpoint.all(componentId).post(data);
        }

        var deleteComponent = function(componentId) {
            return componentEndpoint.all(componentId).remove();
        }


        ////////////////////////////////////////////////////////////////////////
        // Feed API Calls //////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

        var getAllFeeds = function(scope) {
            return feedEndpoint.get('all').then(function(data) {
                scope.feedData = lodash.toArray(Restangular.stripRestangular(data));
                scope.feedCount = scope.feedData.length;
            }, function(response) {
                scope.feedData = [];
                scope.feedCount = 0;

                if (DEBUG) {
                    console.log("API Error", response.status);
                }
            });
        }

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

        var addFeed = function(data) {
            return feedEndpoint.all('new').post(data);
        }

        var updateFeed = function(feedId, data) {
            return feedEndpoint.all(feedId).post(data);
        }

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
    });
