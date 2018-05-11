'use strict';

/* global angular coreApp XLSX Materialize */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', function ($scope, $q, $timeout, CompetencyData) {
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

    $scope.dashboardData.data.records.forEach(function (comp) {
      if (comp.emp_comp_name === 'Digital : Node.js') {
        var obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.nodeJS.push(obj);
      }
      if (comp.emp_comp_name === 'Digital : AngularJS') {
        var _obj = {};
        _obj.level = comp.emp_comp_level;
        _obj.level_count = comp.comp_level_count;
        $scope.angularJS.push(_obj);
      }
      if (comp.emp_comp_name === 'Digital : HTML5-CSS3') {
        var _obj2 = {};
        _obj2.level = comp.emp_comp_level;
        _obj2.level_count = comp.comp_level_count;
        $scope.htmlCSS.push(_obj2);
      }
      if (comp.emp_comp_name === 'Digital : Ruby on Rails') {
        var _obj3 = {};
        _obj3.level = comp.emp_comp_level;
        _obj3.level_count = comp.comp_level_count;
        $scope.rubyOnRails.push(_obj3);
      }
      if (comp.emp_comp_name === 'Digital : Cloud Computing (General)') {
        var _obj4 = {};
        _obj4.level = comp.emp_comp_level;
        _obj4.level_count = comp.comp_level_count;
        $scope.cloudComputingGeneral.push(_obj4);
      }
      if (comp.emp_comp_name === 'Digital : Internet of Things') {
        var _obj5 = {};
        _obj5.level = comp.emp_comp_level;
        _obj5.level_count = comp.comp_level_count;
        $scope.internetOfThings.push(_obj5);
      }
      if (comp.emp_comp_name === 'Digital : BigData and Hadoop Ecosystems') {
        var _obj6 = {};
        _obj6.level = comp.emp_comp_level;
        _obj6.level_count = comp.comp_level_count;
        $scope.bigDataHadoop.push(_obj6);
      }
      if (comp.emp_comp_name === 'Digital : Mobile Computing - Android') {
        var _obj7 = {};
        _obj7.level = comp.emp_comp_level;
        _obj7.level_count = comp.comp_level_count;
        $scope.mobileAndroid.push(_obj7);
      }
      if (comp.emp_comp_name === 'Digital : BI Data Visualization - Tableau') {
        var _obj8 = {};
        _obj8.level = comp.emp_comp_level;
        _obj8.level_count = comp.comp_level_count;
        $scope.tableauBI.push(_obj8);
      }
      if (comp.emp_comp_name === 'Digital : IBM Watson Explorer') {
        var _obj9 = {};
        _obj9.level = comp.emp_comp_level;
        _obj9.level_count = comp.comp_level_count;
        $scope.wex.push(_obj9);
      }
    });
  }

  function initializeData() {
    var requests = [CompetencyData.getDashboardData()];

    $q.all(requests).then(function (results) {
      $scope.dashboardData = results[0];
      fillDataToDashboard();
    }).catch(function (error) {
      console.log('Error in initializing method', error.message);
      Materialize.toast('Some error occurred, please refresh the page', 4000);
    });
  }

  initializeData();
}]);