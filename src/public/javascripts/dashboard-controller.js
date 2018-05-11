/* global angular coreApp XLSX Materialize */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', ($scope, $q, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.dashboardData = [];

  function fillDataToDashboard() {
    $scope.nodeJS = [];
    $scope.angularJS = [];
    $scope.htmlCSS = [];
    $scope.rubyOnRails = [];
    $scope.cloudComputingGeneral = [];
    $scope.internetOfThings = [];
    $scope.bigDataHadoop = [];
    $scope.mobileAndroid = [];
    $scope.tableauBI = [];
    $scope.wex = [];

    $scope.dashboardData.data.records.forEach((comp) => {
      if (comp.emp_comp_name === 'Digital : Node.js') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.nodeJS.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : AngularJS') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.angularJS.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : HTML5-CSS3') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.htmlCSS.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : Ruby on Rails') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.rubyOnRails.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : Cloud Computing (General)') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.cloudComputingGeneral.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : Internet of Things') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.internetOfThings.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : BigData and Hadoop Ecosystems') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.bigDataHadoop.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : Mobile Computing - Android') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.mobileAndroid.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : BI Data Visualization - Tableau') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.tableauBI.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : IBM Watson Explorer') {
        const obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.wex.push(obj);
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
