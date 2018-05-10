/* global angular coreApp XLSX Materialize */

coreApp.controller('reportsController', ['$scope', '$q', '$timeout', 'CompetencyData', ($scope, $q, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.$on('$viewContentLoaded', () => {
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
    const requests = [CompetencyData.getCompetencyList()];

    $q.all(requests).then((results) => {
      $scope.competencyList = results[0];
      $timeout(() => {
        $scope.reRender();
      }, 300);
    }).catch((error) => {
      console.log('Error in initializing method', error.message);
      Materialize.toast('Some error occurred, please refresh the page', 4000);
    });
  }

  initializeData();
}]);
