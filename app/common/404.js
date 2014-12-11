/*
* @Author: Lim Mingjie, Kenneth
* @Date:   2014-12-10 22:09:09
* @Last Modified by:   Lim Mingjie, Kenneth
* @Last Modified time: 2014-12-11 01:23:26
*/

'use strict';

angular.module('app.common-error', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('error', {
            url: '/404',
            views: {
                "main": {
                    templateUrl: 'app/common/404.tpl.min.html'
                }
            },
            data: {
                pageTitle: 'Page Not Found'
            }
        });
    })
