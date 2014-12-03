'use strict';

angular.module('app.animal-new', [
        'app.common-api',
        'app.common-auth',
        'ngLodash',
        'slugifier',
        'ui.router'
    ])
    .config(AnimalNewConfig)
    .controller('AnimalNewCtrl', AnimalNewController);

////////////////////////////////////////////////////////////////////////////////
// Animal New Configuration ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AnimalNewConfig.$inject = ['$stateProvider'];

function AnimalNewConfig($stateProvider) {
    $stateProvider.state('animal-new', {
        url: '/animals/new',
        views: {
            "main": {
                controller: 'AnimalNewCtrl',
                templateUrl: 'app/animal/animal-new.tpl.html'
            }
        },
        data: {
            pageTitle: 'Create Animal'
        }
    });
}


////////////////////////////////////////////////////////////////////////////////
// Animal New Controller ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

AnimalNewController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'APIUtil',
    'AuthUtil',
    'lodash',
    'Slug'
]

function AnimalNewController($scope, $state, $timeout, APIUtil, AuthUtil, lodash, Slug) {
    $scope.formResult = {
        creationDate: new Date(),
        nutrients: nutrientMasterList
    }

    $scope.makeSticky = function() {
        $('#nutritionPanel').sticky({
            topSpacing: 20,
            getWidthFrom: 'aside',
            responsiveWidth: true
        });
    }

    $scope.submit = function() {
        // Create an ID using the provided name
        $scope.formResult._id = Slug.slugify($scope.formResult.name);

        $scope.formResult.nutrients = lodash.pick($scope.formResult.nutrients, function(item) {
            return item.value !== 0;
        });

        // Tag the feed with the owner ID
        $scope.formResult.owner = $scope.profile.user_id;

        // Set the privacy status depending on the user's privileges. Only a
        // superuser may choose privacy state - default users can only create
        // private feeds
        if (AuthUtil.isPrivilegedUser($scope)) {
            $scope.formResult.isPrivate = Boolean($('input[name="privacySelector"]:checked').val());
        } else {
            $scope.formResult.isPrivate = true;
        }

        var result = {};
        result[$scope.formResult._id] = $scope.formResult;

        APIUtil.addAnimal(result).then(function() {
            Messenger().post("Saved animal '" + $scope.formResult.name + "'");

            $state.go('animal-list');
        });
    }
}
