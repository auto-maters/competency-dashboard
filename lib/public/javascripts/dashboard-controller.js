'use strict';

/* global angular coreApp XLSX M */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', function ($scope, $q, $timeout, CompetencyData) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.reRender = function reRender() {
    $('select').formSelect();
  };

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
        $scope.reRender();
      }, 800);
    } else {
      $timeout(function () {
        $scope.dashboardType = 'Training';
        $scope.reRender();
      }, 800);
    }
  });

  function fillDataToDashboard() {
    return new Promise(function (resolve) {
      $scope.competencyDetail = {};
      $scope.trainingDetail = {};
      $scope.compStore = [];
      $scope.selectedList = [];
      $scope.selectedListTraining = [];

      $scope.dashboardData.data.records[0].forEach(function (comp) {
        if ($scope.compStore.indexOf(comp.emp_comp_name) > -1) {
          var compName = comp.emp_comp_name;
          var level = comp.emp_comp_level;
          $scope.competencyDetail[compName][level] = comp.comp_level_count;
          $scope.competencyDetail[compName].details.push({ level: level, level_count: comp.comp_level_count }); // eslint-disable-line
          $scope.competencyDetail[compName].total += parseInt(comp.comp_level_count, 10);
        } else {
          var _compName = comp.emp_comp_name;
          var _level = comp.emp_comp_level;
          $scope.competencyDetail[_compName] = {};
          $scope.competencyDetail[_compName].type = 'Competency';
          $scope.competencyDetail[_compName].comp = _compName;
          $scope.competencyDetail[_compName][_level] = comp.comp_level_count;
          $scope.competencyDetail[_compName].details = [];
          $scope.competencyDetail[_compName].details.push({ level: _level, level_count: comp.comp_level_count }); // eslint-disable-line
          $scope.competencyDetail[_compName].total = parseInt(comp.comp_level_count, 10);
          $scope.compStore.push(comp.emp_comp_name);
        }
      });

      $scope.dashboardData.data.records[1].forEach(function (train) {
        var trainName = train.emp_comp_name;
        $scope.trainingDetail[trainName] = {};
        $scope.trainingDetail[trainName].comp = trainName;
        $scope.trainingDetail[trainName].type = 'Training';
        $scope.trainingDetail[trainName].total = parseInt(train.emp_count, 10);
      });

      resolve(true);
    });
  }

  function initializeData() {
    var requests = [CompetencyData.getDashboardData(), CompetencyData.getCompetencyList(), CompetencyData.getTrainingList()]; // eslint-disable-line

    $q.all(requests).then(function (results) {
      $scope.dashboardData = results[0];
      $scope.competencyList = results[1];
      $scope.trainingList = results[2];
      fillDataToDashboard().then(function (isComplete) {
        if (isComplete) {
          $scope.selectedList = [{ comp_name: 'Digital : Node.js', comp_group: 'Modern Web Development' }, { comp_name: 'Digital : HTML5-CSS3', comp_group: 'Modern Web Development' }, { comp_name: 'Digital : AngularJS', comp_group: 'Modern Web Development' }, { comp_name: 'Digital : BigData and Hadoop Ecosystems', comp_group: 'Big Data' }, { comp_name: 'Digital : IBM Watson Explorer', comp_group: 'Artificial Intelligence' }, { comp_name: 'Digital : Mobile Computing - Android', comp_group: 'Mobile' }];

          $scope.selectedListTraining = [{ training_name: 'ITIL - Internal Trainings' }, { training_name: 'Agile Certifications' }, { training_name: 'GDPR Training' }, { training_name: 'Agile - Internal Trainings' }, { training_name: 'ITIL Certifications' }, { training_name: 'SFDC Certifications' }];

          $timeout(function () {
            $scope.reRender();
          }, 800);
        } else {
          console.log('Error in fill data to dashboard method');
          M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
        }
      });
    }).catch(function (error) {
      console.log('Error in initializing method', error.message);
      M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
    });
  }

  initializeData();
}]);