/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:03:55
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-05 14:43:41
 */

'use strict';

angular.module('app.common-ui', [
        'angular-storage'
    ])
    .service('UIUtil', UIUtil);

UIUtil.$inject = ['$timeout', 'aiStorage'];

function UIUtil($timeout, aiStorage) {
    var saveLocalForm = function(key, value) {
        aiStorage.set(value);
    }

    var getLocalForm = function(key) {
        return aiStorage.get(key);
    }

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
    this.saveLocalForm = saveLocalForm;
    this.getLocalForm = getLocalForm;
}
