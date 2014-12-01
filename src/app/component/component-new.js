'use strict';

angular.module('app.component-new', [
        'slugifier',
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('component-new', {
            url: '/components/new',
            views: {
                "main": {
                    controller: 'ComponentNewCtrl',
                    templateUrl: 'app/component/component-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Create Feed Component'
            }
        });
    })
    .controller('ComponentNewCtrl', ComponentNewController);

ComponentNewController.$inject = ['$scope', '$timeout', '$indexedDB', '$state', 'Slug'];

function ComponentNewController($scope, $timeout, $indexedDB, $state, Slug) {
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
        $scope.formResult._id = Slug.slugify($scope.formResult.name);

        $indexedDB.objectStore('components')
            .upsert($scope.formResult)
            .then(function(e) {
                Messenger().post("Saved component " + $scope.formResult.name);

                $state.go('component-list');
            });
    }

    $scope.initCheckbox = function() {
        $('input[type="radio"]').radiocheck();
    }
}
