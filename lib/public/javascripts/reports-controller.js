'use strict';

/* global angular coreApp XLSX M */

coreApp.controller('reportsController', ['$scope', '$q', '$timeout', '$routeParams', 'CompetencyData', function ($scope, $q, $timeout, $routeParams, CompetencyData) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.reRender = function reRender() {
    $('select').formSelect();
  };

  $scope.updateTextFields = function updateTextFields() {
    M.updateTextFields();
  };

  $scope.competencyList = [];
  $scope.selectedComp = null;
  $scope.selectedCompLevel = null;

  function initializeData() {
    var requests = [CompetencyData.getCompetencyList()];

    $q.all(requests).then(function (results) {
      $scope.competencyList = results[0];
      $timeout(function () {
        $scope.reRender();
      }, 300);

      if (Object.keys($routeParams).length !== 0) {
        $scope.selectedComp = $routeParams.compName || null;
        $scope.selectedCompLevel = $routeParams.compLevel || null;
        $scope.selectedTraining = $routeParams.trainName || null;
        $timeout(function () {
          $scope.reRender();
        }, 1000);
      }
    }).catch(function (error) {
      console.log('Error in initializing method', error.message);
      M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
    });
  }

  initializeData();
}]);