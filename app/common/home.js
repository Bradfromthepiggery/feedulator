/*
* @Author: Lim Mingjie, Kenneth
* @Date:   2014-12-10 22:09:12
* @Last Modified by:   Lim Mingjie, Kenneth
* @Last Modified time: 2014-12-11 01:22:59
*/

'use strict';

angular.module('app.common-home', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'app/common/home.tpl.min.html'
                }
            },
            data: {
                pageTitle: 'Start'
            }
        });
    })
    .controller('HomeCtrl', function HomeController($scope) {});
