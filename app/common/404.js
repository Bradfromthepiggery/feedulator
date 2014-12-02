angular.module('app.common-error', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('error', {
            url: '/404',
            views: {
                "main": {
                    templateUrl: 'app/common/404.tpl.html'
                }
            },
            data: {
                pageTitle: 'Page Not Found'
            }
        });
    })
