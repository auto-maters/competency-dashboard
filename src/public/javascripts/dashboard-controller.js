/* global angular coreApp XLSX Materialize */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', ($scope, $q, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.dashboardData = [];

  function fillDataToDashboard() {
    $scope.nodeJS = { total: '0', details: [] };
    $scope.angular1 = { total: '0', details: [] };
    $scope.htmlCSS = { total: '0', details: [] };
    $scope.rOR = { total: '0', details: [] };
    $scope.clCmpGen = { total: '0', details: [] };
    $scope.iOT = { total: '0', details: [] };
    $scope.hadoop = { total: '0', details: [] };
    $scope.android = { total: '0', details: [] };
    $scope.tableau = { total: '0', details: [] };
    $scope.wex = { total: '0', details: [] };

    $scope.dashboardData.data.records.forEach((comp) => {
      if (comp.emp_comp_name === 'Digital : Node.js') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.nodeJS.details.push(obj);
        $scope.nodeJS.total = parseInt($scope.nodeJS.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : AngularJS') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.angular1.details.push(obj);
        $scope.angular1.total = parseInt($scope.angular1.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : HTML5-CSS3') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.htmlCSS.details.push(obj);
        $scope.htmlCSS.total = parseInt($scope.htmlCSS.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Ruby on Rails') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.rOR.details.push(obj);
        $scope.rOR.total = parseInt($scope.rOR.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Cloud Computing (General)') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.clCmpGen.details.push(obj);
        $scope.clCmpGen.total = parseInt($scope.clCmpGen.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Internet of Things') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.iOT.details.push(obj);
        $scope.iOT.total = parseInt($scope.iOT.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : BigData and Hadoop Ecosystems') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.hadoop.details.push(obj);
        $scope.hadoop.total = parseInt($scope.hadoop.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Mobile Computing - Android') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.android.details.push(obj);
        $scope.android.total = parseInt($scope.android.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : BI Data Visualization - Tableau') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.tableau.details.push(obj);
        $scope.tableau.total = parseInt($scope.tableau.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : IBM Watson Explorer') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.wex.details.push(obj);
        $scope.wex.total = parseInt($scope.wex.total, 10) + parseInt(obj.level_count, 10);
      }
    });
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
