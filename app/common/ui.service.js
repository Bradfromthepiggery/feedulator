/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:03:55
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-11 02:38:09
 */

'use strict';

angular.module('app.common-ui', [
        'angular-storage'
    ])
    .service('UIUtil', UIUtil);

UIUtil.$inject = ['$timeout', 'aiStorage'];

/**
 * @ngdoc  service
 * @name  app.common-ui.UIUtil
 * @requires  $timeout
 * @requires  aiStorage
 *
 * @description
 * Provides convenience functions for manipulating the user interface
 */
function UIUtil($timeout, aiStorage) {
    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#saveLocalForm
     * @methodOf app.common-ui.UIUtil
     * @name  saveLocalForm
     * @param {String} key The key to be inserted into localStorage.
     * @param {String} value The value to be inserted into localStorage.
     *
     * @description
     * Stores the data for a form in local storage on browsers that support it.
     */
    var saveLocalForm = function(key, value) {
        aiStorage.set(value);
    }

    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#getLocalForm
     * @methodOf app.common-ui.UIUtil
     * @name  getLocalForm
     * @param {String} key The key to be retrieved from localStorage.
     * @return {String} A string representation of the JSON object retrieved from storage.
     *
     * @description
     * Retrieves the data for a form from local storage.
     */
    var getLocalForm = function(key) {
        return aiStorage.get(key);
    }

    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#makeSticky
     * @methodOf app.common-ui.UIUtil
     * @name  makeSticky
     * @param {String} elemId The DOM selector for the element to be made sticky.
     *
     * @description
     * Calls jQuery Sticky to set <code>position: fixed</code> on the specified element.
     */
    var makeSticky = function(elemId) {
        $(elemId).sticky({
            topSpacing: 20,
            getWidthFrom: $(elemId).parent(),
            responsiveWidth: true
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#initCheckbox
     * @methodOf app.common-ui.UIUtil
     * @name  initCheckbox
     *
     * @description
     * Initializes the Flat-UI checkboxes for all checkbox elements on-screen
     */
    var initCheckbox = function() {
        $(':checkbox').radiocheck();
    }

    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#initRadiobox
     * @methodOf app.common-ui.UIUtil
     * @name  initRadiobox
     *
     * @description
     * Initializes the Flat-UI radioboxes for all radiobox elements on-screen.
     */
    var initRadio = function() {
        $(':radio').radiocheck();
    }

    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#masonryInit
     * @methodOf app.common-ui.UIUtil
     * @name  masonryInit
     * @param {String} elemId The DOM selector for the element to be laid out.
     *
     * @description
     * Initializes the Masonry layout manager on the element specified.
     */
    var masonryInit = function(elemId) {
        var container = $(elemId);

        $timeout(function() {
            container.masonry();
        });
    }

    /**
     * @ngdoc method
     * @name  app.common-ui.UIUtil#masonryInit
     * @methodOf app.common-ui.UIUtil
     * @name  masonryInit
     * @param {String} elemId The DOM selector for the element to be laid out.
     *
     * @description
     * Updates the Masonry layout associated with the specified element. This does two things.
     * First, it reloads all items which are currently on-screen, then queues a re-layout
     * on Angular's $digest loop to actually perform the rearrangement.
     */
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
