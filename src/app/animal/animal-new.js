'use strict';

angular.module('app.animal-new', [
        'ui.router',
        'xc.indexedDB'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('animal-new', {
            url: '/animals/new',
            views: {
                "main": {
                    controller: 'AnimalCreationCtrl',
                    templateUrl: 'app/animal/animal-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Create Animal'
            }
        });
    })
    .controller('AnimalCreationCtrl', function AnimalCreationController($scope, Slug, $indexedDB, $state) {
        $scope.submit = function() {
            $scope.formResult._id = Slug.slugify($scope.formResult.name);

            $indexedDB.objectStore('animals')
                .upsert($scope.formResult)
                .then(function(e) {
                    Messenger().post("Saved animal " + $scope.formResult.name);

                    $state.go('animal-list');
                });
        }
    });
