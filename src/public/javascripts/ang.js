/* global angular */
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
