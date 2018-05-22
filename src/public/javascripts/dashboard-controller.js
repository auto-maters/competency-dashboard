/* global angular coreApp XLSX Materialize */

coreApp.controller('dashboardController', ['$scope', '$q', '$timeout', 'CompetencyData', ($scope, $q, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
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
      }, 800  );
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

    $scope.dashboardData.data.records[1].forEach((train) => {
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

    $scope.dashboardData.data.records[0].forEach((comp) => {
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
