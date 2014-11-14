'use strict';

angular.module('app.feed-calculator', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('feed-calculator', {
            url: '/feeds/calculator',
            views: {
                "main": {
                    controller: 'FeedNewCtrl',
                    templateUrl: 'app/feed/feed-new.tpl.html'
                }
            },
            data: {
                pageTitle: 'Feed Calculator'
            }
        });
    });
