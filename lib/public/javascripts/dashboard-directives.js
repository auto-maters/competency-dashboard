'use strict';

/* global angular coreApp*/

coreApp.directive('compDetails', [function () {
  return {
    restrict: 'E',
    scope: {
      compInfo: '=compInfo'
    },
    templateUrl: '/templates/comp-card.tpl.html'
  };
}]);