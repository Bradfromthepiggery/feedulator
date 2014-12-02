angular.module('app.common-home', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'app/common/home.tpl.html'
                }
            },
            data: {
                pageTitle: 'Start'
            }
        });
    })
    .controller('HomeCtrl', function HomeController($scope) {});
