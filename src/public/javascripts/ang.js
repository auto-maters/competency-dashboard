/* global angular jQuery*/
const coreApp = angular.module('angularApp', ['ngRoute']);

coreApp.config(($routeProvider, $locationProvider) => {
  $routeProvider.when('/upload', {
    controller: 'uploadController',
    templateUrl: '/templates/upload.tpl.html',
  });
  $routeProvider.otherwise({
    redirectTo: '/',
  });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
});

coreApp.directive('loading', ['$http', ($http) => {
  return {
    restrict: 'A',
    link: ($scope) => {
      $scope.isLoading = () => {
        return $http.pendingRequests.length > 0;
      };

      $scope.$watch($scope.isLoading, (v) => {
        if (v) {
          $scope.showLoader = true;
        } else {
          $scope.showLoader = false;
        }
      });
    },
  };
}]);
