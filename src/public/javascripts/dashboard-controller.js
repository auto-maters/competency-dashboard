/* global angular coreApp XLSX Materialize */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', ($scope, $q, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.dashboardData = [];

  function fillDataToDashboard() {
    $scope.nodeJS = {};

    for (const comp in $scope.dashboardData.data.records) { // eslint-disable-line
      if (comp.emp_comp_name === 'Digital : Node.js') {
        $scope.nodeJS[comp.emp_comp_level] = comp.comp_level_count;
      }
    }
  }

  function initializeData() {
    const requests = [CompetencyData.getDashboardData()];

    $q.all(requests).then((results) => {
      $scope.dashboardData = results[0];
      fillDataToDashboard();
    }).catch((error) => {
      console.log('Error in initializing method', error.message);
      Materialize.toast('Some error occurred, please refresh the page', 4000);
    });
  }

  initializeData();
}]);
