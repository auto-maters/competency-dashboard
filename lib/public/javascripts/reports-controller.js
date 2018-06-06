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
  $scope.selectedListComp = null;
  $scope.selectedListTraining = null;
  $scope.selectedCompLevel = null;
  $scope.searchType = 'Competency';
  $scope.compDisabled = false;
  $scope.trainDisabled = true;

  $("input[name='rblSearchType']").on('change', function () {
    if ($scope.searchType === 'Competency') {
      $scope.compDisabled = false;
      $scope.trainDisabled = true;
      $scope.$apply();
    } else if ($scope.searchType === 'Training') {
      $scope.compDisabled = true;
      $scope.trainDisabled = false;
      $scope.$apply();
    }
  });

  function initializeData() {
    var requests = [CompetencyData.getCompetencyList(), CompetencyData.getTrainingList()];

    $q.all(requests).then(function (results) {
      $scope.competencyList = results[0];
      $scope.trainingList = results[1];
      $timeout(function () {
        $scope.reRender();
      }, 300);

      if (Object.keys($routeParams).length !== 0) {
        if ($routeParams.trainName) {
          $scope.selectedListTraining = [{ training_name: $routeParams.trainName }];
          $scope.searchType = 'Training';
          $scope.compDisabled = true;
          $scope.trainDisabled = false;
        } else if ($routeParams.compName && $routeParams.compGroup) {
          $scope.selectedListComp = [{ comp_name: $routeParams.compName, comp_group: $routeParams.compGroup }]; // eslint-disable-line
          $scope.selectedCompLevel = $routeParams.compLevel;
          $scope.searchType = 'Competency';
          $scope.compDisabled = false;
          $scope.trainDisabled = true;
        }
      }

      $timeout(function () {
        $scope.reRender();
      }, 1000);
    }).catch(function (error) {
      console.log('Error in initializing method', error.message);
      M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
    });
  }

  initializeData();
}]);