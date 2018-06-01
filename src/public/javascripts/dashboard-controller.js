/* global angular coreApp XLSX M */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', ($scope, $q, $timeout, CompetencyData) => {
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
    $timeout(() => {
      $scope.dashboardType = 'Training';
    }, 500);
  }

  $("input[type='checkbox']").on('change', () => {
    if ($scope.isDashComp) {
      $timeout(() => {
        $scope.dashboardType = 'Competency';
        $scope.reRender();
      }, 800);
    } else {
      $timeout(() => {
        $scope.dashboardType = 'Training';
        $scope.reRender();
      }, 800);
    }
  });

  function fillDataToDashboard() {
    return new Promise((resolve) => {
      $scope.competencyDetail = {};
      $scope.trainingDetail = {};
      $scope.compStore = [];
      $scope.selectedList = [];
      $scope.selectedListTraining = [];

      $scope.dashboardData.data.records[0].forEach((comp) => {
        if (($scope.compStore).indexOf(comp.emp_comp_name) > -1) {
          const compName = comp.emp_comp_name;
          const level = comp.emp_comp_level;
          $scope.competencyDetail[compName][level] = comp.comp_level_count;
          $scope.competencyDetail[compName].details.push({ level, level_count: comp.comp_level_count })// eslint-disable-line
          $scope.competencyDetail[compName].total += parseInt(comp.comp_level_count, 10);
        } else {
          const compName = comp.emp_comp_name;
          const level = comp.emp_comp_level;
          $scope.competencyDetail[compName] = {};
          $scope.competencyDetail[compName].type = 'Competency';
          $scope.competencyDetail[compName].comp = compName;
          $scope.competencyDetail[compName][level] = comp.comp_level_count;
          $scope.competencyDetail[compName].details = [];
          $scope.competencyDetail[compName].details.push({ level, level_count: comp.comp_level_count }); // eslint-disable-line
          $scope.competencyDetail[compName].total = parseInt(comp.comp_level_count, 10);
          $scope.compStore.push(comp.emp_comp_name);
        }
      });

      $scope.dashboardData.data.records[1].forEach((train) => {
        const trainName = train.emp_comp_name;
        $scope.trainingDetail[trainName] = {};
        $scope.trainingDetail[trainName].comp = trainName;
        $scope.trainingDetail[trainName].type = 'Training';
        $scope.trainingDetail[trainName].total = parseInt(train.emp_count, 10);
      });

      resolve(true);
    });
  }

  function initializeData() {
    const requests = [CompetencyData.getDashboardData(), CompetencyData.getCompetencyList(), CompetencyData.getTrainingList()];  // eslint-disable-line

    $q.all(requests).then((results) => {
      $scope.dashboardData = results[0];
      $scope.competencyList = results[1];
      $scope.trainingList = results[2];
      fillDataToDashboard().then((isComplete) => {
        if (isComplete) {
          $scope.selectedList = [
            { comp_name: 'Digital : Node.js', comp_group: 'Modern Web Development' },
            { comp_name: 'Digital : HTML5-CSS3', comp_group: 'Modern Web Development' },
            { comp_name: 'Digital : AngularJS', comp_group: 'Modern Web Development' },
            { comp_name: 'Digital : BigData and Hadoop Ecosystems', comp_group: 'Big Data' },
            { comp_name: 'Digital : IBM Watson Explorer', comp_group: 'Artificial Intelligence' },
            { comp_name: 'Digital : Mobile Computing - Android', comp_group: 'Mobile' },
          ];

          $scope.selectedListTraining = [
            { training_name: 'ITIL - Internal Trainings' },
            { training_name: 'Agile Certifications' },
            { training_name: 'GDPR Training' },
            { training_name: 'Agile - Internal Trainings' },
            { training_name: 'ITIL Certifications' },
            { training_name: 'SFDC Certifications' },
          ];

          $timeout(() => {
            $scope.reRender();
          }, 800);
        } else {
          console.log('Error in fill data to dashboard method');
          M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
        }
      });
    }).catch((error) => {
      console.log('Error in initializing method', error.message);
      M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
    });
  }

  initializeData();
}]);
