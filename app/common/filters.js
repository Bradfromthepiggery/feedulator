/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2014-12-03 01:30:15
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2014-12-03 01:31:04
 */

'use strict';

angular.module('app.common-filters', [])
    .filter('precision', clampPrecision);

function clampPrecision() {
    return function(input, val) {
        if (input && !isNaN(input)) {
            return Number(input.toPrecision(val));
        } else {
            return input;
        }
    };
}
