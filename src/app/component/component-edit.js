'use strict';

angular.module('app.component-edit', [
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('component-edit', {
            url: '/components/:compId/edit',
            views: {
                "main": {
                    controller: 'ComponentEditCtrl',
                    templateUrl: 'app/component/component-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Edit Feed Component'
            }
        });
    })
    .controller('ComponentEditCtrl', function ComponentEditController($scope, $indexedDB, $stateParams, $state, Slug) {
        $indexedDB.objectStore('components').find($stateParams.compId).then(function(result) {
            $scope.formResult = result;
        });

        $scope.submit = function() {
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            $indexedDB.objectStore('components')
                .upsert($scope.formResult)
                .then(function(e) {
                    $state.go('component-list');
                });
        }
    });
