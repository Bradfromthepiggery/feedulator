/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:03:55
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-03 02:36:00
 */

'use strict';

angular.module('app.common-ui', [])
    .service('UIUtil', UIUtil);

UIUtil.$inject = ['$timeout'];

function UIUtil($timeout) {
    var makeSticky = function(elemId) {
        $(elemId).sticky({
            topSpacing: 20,
            getWidthFrom: $(elemId).parent(),
            responsiveWidth: true
        });
    }

    var initCheckbox = function() {
        $(':checkbox').radiocheck();
    }

    var initRadio = function() {
        $(':radio').radiocheck();
    }

    var masonryInit = function(elemId) {
        var container = $(elemId);

        $timeout(function() {
            container.masonry();
        });
    }

    var masonryUpdate = function(elemId) {
        var container = $(elemId);
        container.masonry('reloadItems');

        $timeout(function() {
            container.masonry();
        });
    }

    this.makeSticky = makeSticky;
    this.initCheckbox = initCheckbox;
    this.initRadio = initRadio;
    this.masonryInit = masonryInit;
    this.masonryUpdate = masonryUpdate;
}
