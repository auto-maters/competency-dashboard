'use strict';

/* global angular coreApp XLSX M */

coreApp.controller('reportsController', ['$scope', '$q', "$rootScope", '$timeout', '$routeParams', 'CompetencyData', 'Excel', function ($scope, $q, $rootScope, $timeout, $routeParams, CompetencyData, Excel) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.reRender = function reRender() {
    $('select').formSelect();
  };

  $scope.updateTextFields = function updateTextFields() {
    M.updateTextFields();
  };

  $scope.exportToExcel = function (tableId) {
    if ($scope.searchResult && $scope.searchResult.length > 0) {
      var ws = XLSX.utils.json_to_sheet($scope.searchResult);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, $scope.searchType);
      XLSX.writeFile(wb, $scope.searchType + ".xlsx");
    }
  };

  var test = function test() {

    $(function () {

      $("table").tablesorter({
        theme: "materialize",

        widthFixed: true
        // widget code contained in the jquery.tablesorter.widgets.js file
        // use the zebra stripe widget if you plan on hiding any rows (filter widget)
        // widgets : [ "filter", "zebra" ],

        // widgetOptions : {
        //   // using the default zebra striping class name, so it actually isn't included in the theme variable above
        //   // this is ONLY needed for materialize theming if you are using the filter widget, because rows are hidden
        //   zebra : ["even", "odd"],

        //   // reset filters button
        //   filter_reset : ".reset",

        //   // extra css class name (string or array) added to the filter element (input or select)
        //   // select needs a "browser-default" class or it gets hidden
        //   filter_cssFilter: ["", "", "browser-default"]
        // }
      }).tablesorterPager({

        // target the pager markup - see the HTML block below
        container: $(".ts-pager"),

        // target the pager page select dropdown - choose a page
        cssGoto: ".pagenum",

        // remove rows from the table to speed up the sort of large tables.
        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
        removeRows: false,

        // output string - default is '{page}/{totalPages}';
        // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
        output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'

      });
    });
  };

  $scope.SearchByText = false;
  $scope.competencyList = [];
  $scope.selectedListComp = null;
  $scope.selectedListTraining = null;
  $scope.selectedCompLevel = null;
  $scope.searchType = 'Competency';
  $scope.compDisabled = false;
  $scope.trainDisabled = true;
  $scope.StartDate = new Date('2005-01-01');
  $scope.EndDate = new Date();
  $scope.searchResult = [];
  $scope.searchText = "";
  $scope.tableHeaders = [];
  $scope.showNoOfReckonertext = false;
  $scope.showLoder = false;
  $scope.search = function () {
    var _selectedListComp = [];
    if ($scope.selectedListComp) $scope.selectedListComp.forEach(function (el) {
      _selectedListComp.push(el.comp_name);
    });
    var _selectedListTraining = [];
    if ($scope.selectedListTraining) $scope.selectedListTraining.forEach(function (el) {
      _selectedListTraining.push(el.training_name);
    });
    var reportConfig = {
      StartData: $scope.StartDate,
      EndDate: $scope.EndDate,
      SearchType: $scope.searchType,
      SearchText: $scope.searchText,
      Competency: _selectedListComp,
      CompetencyLevel: $scope.selectedCompLevel,
      Training: _selectedListTraining,
      SearchByText: $scope.SearchByText
    };

    $scope.showNoOfReckonertext = false;
    $scope.showLoder = true;

    CompetencyData.getReportData(reportConfig).then(function (data) {
      data = data.data.records;
      $scope.tableHeaders = [];
      $scope.searchResult = [];
      $scope.$apply();
      if (data.length > 0) {
        if ($scope.searchType === 'Competency') $scope.tableHeaders = ["  ##  ", "Employee Id", "Employee Name", "Competency Date", "Competency Name", "Competency Level", "Competency Group", "Created By"];else if ($scope.searchType === 'Training') $scope.tableHeaders = ["  ##  ", "Employee Id", "Employee Name", "Training Date", "TrainingName", "Created By"];
        $scope.searchResult = data;
      } else {
        $scope.searchResult = [];
        $scope.tableHeaders = [];
      }
      $scope.showNoOfReckonertext = true;
      $scope.showLoder = false;
      $scope.$apply();
      test();
    }).catch(function (err) {});
  };
  $scope.timerFunction = function () {};
  $scope.resetForm = function () {
    $scope.StartDate = new Date('2005-01-01');
    $scope.EndDate = new Date();
    $scope.searchResult = [];
    $scope.searchText = "";
    $scope.tableHeaders = [];
    $scope.selectedListComp = []; //[{ comp_name: "", comp_group: "-- Select List--" }];;
    $scope.selectedListTraining = [];
    $scope.selectedCompLevel = null;
    $scope.reRender();
    $scope.SearchByText = false;
    $scope.showNoOfReckonertext = false;
    $scope.showLoder = false;

    $scope.timer = $timeout(function () {
      $scope.$apply();
      $scope.resetForm1();
    }, 200);
  };
  $scope.resetForm1 = function () {
    $scope.StartDate = new Date('2005-01-01');
    $scope.EndDate = new Date();
    $scope.searchResult = [];
    $scope.searchText = "";
    $scope.tableHeaders = [];
    $scope.selectedListComp = []; //[{ comp_name: "", comp_group: "-- Select List--" }];;
    $scope.selectedListTraining = [];
    $scope.selectedCompLevel = null;
    $scope.reRender();
    $scope.SearchByText = false;
    $scope.showNoOfReckonertext = false;
    $scope.showLoder = false;
    $scope.$apply();
  };
  var refresh = function refresh() {
    $rootScope.refresh = function () {
      $log.info("fired");
      eventService.events();
    };
  };

  $("input[name='rblSearchType']").on('change', function () {
    if ($scope.searchType === 'Competency') {
      $scope.compDisabled = false;
      $scope.trainDisabled = true;
      $scope.StartDate = new Date('2005-01-01');
      $scope.EndDate = new Date();
      $scope.searchResult = [];
      $scope.searchText = "";
      $scope.SearchByText = false;
      $scope.tableHeaders = [];
      $scope.$apply();
    } else if ($scope.searchType === 'Training') {
      $scope.compDisabled = true;
      $scope.trainDisabled = false;
      $scope.StartDate = new Date('2005-01-01');
      $scope.EndDate = new Date();
      $scope.searchResult = [];
      $scope.searchText = "";
      $scope.SearchByText = false;
      $scope.tableHeaders = [];
      $scope.$apply();
    }
  });

  function initializeData() {
    var requests = [CompetencyData.getCompetencyList(), CompetencyData.getTrainingList()];

    $q.all(requests).then(function (results) {
      $scope.competencyList = results[0];
      $scope.trainingList = results[1];
      $timeout(function () {
        $scope.reRender();
      }, 300);

      if (Object.keys($routeParams).length !== 0) {
        if ($routeParams.trainName) {
          $scope.selectedListTraining = [{ training_name: $routeParams.trainName }];
          $scope.searchType = 'Training';
          $scope.compDisabled = true;
          $scope.SearchByText = false;
          $scope.trainDisabled = false;
          $scope.search();
        } else if ($routeParams.compName && $routeParams.compGroup) {
          $scope.selectedListComp = [{ comp_name: $routeParams.compName, comp_group: $routeParams.compGroup }]; // eslint-disable-line
          $scope.selectedCompLevel = $routeParams.compLevel;
          $scope.searchType = 'Competency';
          $scope.compDisabled = false;
          $scope.trainDisabled = true;
          $scope.SearchByText = false;
          $scope.search();
        }
      }

      $timeout(function () {
        $scope.reRender();
      }, 1000);
    }).catch(function (error) {
      console.log('Error in initializing method', error.message);
      M.toast({ html: 'Some error occurred, please refresh the page', classes: 'rounded' });
    });
  }

  initializeData();
}]);