'use strict';

/* global angular coreApp XLSX M */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', function ($scope, $q, $timeout, CompetencyData) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $(document).ready(function () {
    $('select').formSelect();
  });

  $scope.dashboardData = [];
  $scope.isDashComp = true;
  $scope.dashboardType = 'Competency';

  if ($scope.isDashComp) {
    $scope.dashboardType = 'Competency';
  } else {
    $timeout(function () {
      $scope.dashboardType = 'Training';
    }, 500);
  }

  $("input[type='checkbox']").on('change', function () {
    if ($scope.isDashComp) {
      $timeout(function () {
        $scope.dashboardType = 'Competency';
      }, 800);
    } else {
      $timeout(function () {
        $scope.dashboardType = 'Training';
      }, 800);
    }
  });

  function fillDataToDashboard() {
    $scope.nodeJS = { comp: 'NodeJS', total: '0', details: [] };
    $scope.angular1 = { comp: 'AngularJS', total: '0', details: [] };
    $scope.htmlCSS = { comp: 'HTML5-CSS3', total: '0', details: [] };
    $scope.rOR = { comp: 'Ruby on Rails', total: '0', details: [] };
    $scope.clCmpGen = { comp: 'Cloud Computing', total: '0', details: [] };
    $scope.iOT = { comp: 'Internet of Things', total: '0', details: [] };
    $scope.hadoop = { comp: 'Big Data-Hadoop', total: '0', details: [] };
    $scope.android = { comp: 'Mobile-Android', total: '0', details: [] };
    $scope.tableau = { comp: 'Tableau', total: '0', details: [] };
    $scope.wex = { comp: 'IBM Watson Explorer', total: '0', details: [] };

    $scope.pharmaMandatory = { type: 'training', comp: 'Pharma Mandatory' };
    $scope.agileE0E1 = { type: 'training', comp: 'Agile' };
    $scope.itilE0 = { type: 'training', comp: 'ITIL E0' };
    $scope.agileCertifications = { type: 'training', comp: 'Agile Certifications' };
    $scope.itilCertifications = { type: 'training', comp: 'ITIL Certifications' };
    $scope.ascentCertifications = { type: 'training', comp: 'Ascent Certifications' };
    $scope.estimationE0 = { type: 'training', comp: 'Estimation E0' };
    $scope.gdpr = { type: 'training', comp: 'GDPR' };

    $scope.dashboardData.data.records[1].forEach(function (train) {
      if (train.emp_comp_name === 'Pharma Mandatory') {
        $scope.pharmaMandatory.train = 'Pharma Mandatory';
        $scope.pharmaMandatory.total = train.emp_count;
      }
      if (train.emp_comp_name === 'Agile E0 and E1') {
        $scope.agileE0E1.train = 'Agile';
        $scope.agileE0E1.total = train.emp_count;
      }
      if (train.emp_comp_name === 'ITIL E0') {
        $scope.itilE0.train = 'ITIL E0';
        $scope.itilE0.total = train.emp_count;
      }
      if (train.emp_comp_name === 'Agile Certifications') {
        $scope.agileCertifications.train = 'Agile Certifications';
        $scope.agileCertifications.total = train.emp_count;
      }
      if (train.emp_comp_name === 'ITIL Certifications') {
        $scope.itilCertifications.train = 'ITIL Certifications';
        $scope.itilCertifications.total = train.emp_count;
      }
      if (train.emp_comp_name === 'Ascent Certifications') {
        $scope.ascentCertifications.train = 'Ascent Certifications';
        $scope.ascentCertifications.total = train.emp_count;
      }
      if (train.emp_comp_name === 'Estimation E0') {
        $scope.estimationE0.train = 'Estimation E0';
        $scope.estimationE0.total = train.emp_count;
      }
      if (train.emp_comp_name === 'GDPR') {
        $scope.gdpr.train = 'GDPR';
        $scope.gdpr.total = train.emp_count;
      }
    });

    $scope.dashboardData.data.records[0].forEach(function (comp) {
      if (comp.emp_comp_name === 'Digital : Node.js') {
        var obj = {};
        obj.level = comp.emp_comp_level;
        obj.level_count = comp.comp_level_count;
        $scope.nodeJS.details.push(obj);
        $scope.nodeJS.total = parseInt($scope.nodeJS.total, 10) + parseInt(obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : AngularJS') {
        var _obj = {};
        _obj.level = comp.emp_comp_level;
        _obj.level_count = comp.comp_level_count;
        $scope.angular1.details.push(_obj);
        $scope.angular1.total = parseInt($scope.angular1.total, 10) + parseInt(_obj.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : HTML5-CSS3') {
        var _obj2 = {};
        _obj2.level = comp.emp_comp_level;
        _obj2.level_count = comp.comp_level_count;
        $scope.htmlCSS.details.push(_obj2);
        $scope.htmlCSS.total = parseInt($scope.htmlCSS.total, 10) + parseInt(_obj2.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Ruby on Rails') {
        var _obj3 = {};
        _obj3.level = comp.emp_comp_level;
        _obj3.level_count = comp.comp_level_count;
        $scope.rOR.details.push(_obj3);
        $scope.rOR.total = parseInt($scope.rOR.total, 10) + parseInt(_obj3.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Cloud Computing (General)') {
        var _obj4 = {};
        _obj4.level = comp.emp_comp_level;
        _obj4.level_count = comp.comp_level_count;
        $scope.clCmpGen.details.push(_obj4);
        $scope.clCmpGen.total = parseInt($scope.clCmpGen.total, 10) + parseInt(_obj4.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Internet of Things') {
        var _obj5 = {};
        _obj5.level = comp.emp_comp_level;
        _obj5.level_count = comp.comp_level_count;
        $scope.iOT.details.push(_obj5);
        $scope.iOT.total = parseInt($scope.iOT.total, 10) + parseInt(_obj5.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : BigData and Hadoop Ecosystems') {
        var _obj6 = {};
        _obj6.level = comp.emp_comp_level;
        _obj6.level_count = comp.comp_level_count;
        $scope.hadoop.details.push(_obj6);
        $scope.hadoop.total = parseInt($scope.hadoop.total, 10) + parseInt(_obj6.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : Mobile Computing - Android') {
        var _obj7 = {};
        _obj7.level = comp.emp_comp_level;
        _obj7.level_count = comp.comp_level_count;
        $scope.android.details.push(_obj7);
        $scope.android.total = parseInt($scope.android.total, 10) + parseInt(_obj7.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : BI Data Visualization - Tableau') {
        var _obj8 = {};
        _obj8.level = comp.emp_comp_level;
        _obj8.level_count = comp.comp_level_count;
        $scope.tableau.details.push(_obj8);
        $scope.tableau.total = parseInt($scope.tableau.total, 10) + parseInt(_obj8.level_count, 10);
      }
      if (comp.emp_comp_name === 'Digital : IBM Watson Explorer') {
        var _obj9 = {};
        _obj9.level = comp.emp_comp_level;
        _obj9.level_count = comp.comp_level_count;
        $scope.wex.details.push(_obj9);
        $scope.wex.total = parseInt($scope.wex.total, 10) + parseInt(_obj9.level_count, 10);
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
      M.toast('Some error occurred, please refresh the page', 4000);
    });
  }

  initializeData();
}]);