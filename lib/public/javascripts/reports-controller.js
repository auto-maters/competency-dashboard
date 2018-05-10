'use strict';

/* global angular coreApp XLSX Materialize */

coreApp.controller('reportsController', ['$scope', '$q', '$timeout', 'CompetencyData', function ($scope, $q, $timeout, CompetencyData) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.$on('$viewContentLoaded', function () {
    // call it here
    $scope.reRender();
  });

  $scope.reRender = function reRender() {
    $('select').material_select();
  };

  $scope.updateTextFields = function updateTextFields() {
    Materialize.updateTextFields();
  };

  $scope.competencyList = [];

  function initializeData() {
    var requests = [CompetencyData.getCompetencyList()];

    $q.all(requests).then(function (results) {
      $scope.competencyList = results[0];
      $timeout(function () {
        $scope.reRender();
      }, 300);
    }).catch(function (error) {
      console.log('Error in initializing method', error.message);
      Materialize.toast('Some error occurred, please refresh the page', 4000);
    });
  }

  initializeData();
}]);