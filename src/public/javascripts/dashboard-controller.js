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
      }, 800);
    } else {
      $timeout(() => {
        $scope.dashboardType = 'Training';
      }, 800);
    }
  });

  function fillDataToDashboard() {
    return new Promise((resolve) => {
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

      $scope.competencyDetail = {};
      $scope.compStore = [];
      $scope.selectedList = [];

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
          $scope.competencyDetail[compName].comp = compName;
          $scope.competencyDetail[compName][level] = comp.comp_level_count;
          $scope.competencyDetail[compName].details = [];
          $scope.competencyDetail[compName].details.push({ level, level_count: comp.comp_level_count }); // eslint-disable-line
          $scope.competencyDetail[compName].total = parseInt(comp.comp_level_count, 10);
          $scope.competencyDetail[compName].visible = true;
          $scope.compStore.push(comp.emp_comp_name);
        }
      });
      resolve(true);
    });
  }

  $scope.handleSelection = function handleSelection() {
    Object.keys($scope.competencyDetail).forEach((item) => {
      if ($scope.selectedList.indexOf(item) > -1) {
        $scope.competencyDetail[item].visible = true;
      } else {
        $scope.competencyDetail[item].visible = false;
      }
    });
  };


  function initializeData() {
    const requests = [CompetencyData.getDashboardData(), CompetencyData.getCompetencyList()];

    $q.all(requests).then((results) => {
      $scope.dashboardData = results[0];
      $scope.competencyList = results[1];
      $timeout(() => {
        $scope.reRender();
      }, 300);
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
        }
      });
    }).catch((error) => {
      console.log('Error in initializing method', error.message);
      M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
    });
  }

  initializeData();
}]);
