/* global angular coreApp*/

coreApp.directive('compDetails', [() => {
  return {
    restrict: 'E',
    scope: {
      compInfo: '=compInfo',
    },
    templateUrl: '/templates/comp-card.tpl.html',
  };
}]);
