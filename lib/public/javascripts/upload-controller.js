'use strict';

/* global angular coreApp XLSX Materialize */

coreApp.controller('uploadController', ['$scope', 'CompetencyData', function ($scope, CompetencyData) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.uploadCompetencyData = function uploadCompetencyData() {
    if (!angular.isUndefinedOrNullOrEmpty($scope.result.data)) {
      CompetencyData.uploadCompData($scope.result.data).then(function (responseCode) {
        console.log(responseCode);
      });
    }
  };
}]);

coreApp.directive('fileread', [function () {
  return {
    scope: {
      opts: '='
    },
    link: function link($scope, $elm) {
      $elm.on('change', function (changeEvent) {
        var reader = new FileReader();

        reader.onload = function (evt) {
          $scope.$apply(function () {
            var fileData = evt.target.result;

            var workbook = XLSX.read(fileData, {
              type: 'binary'
            });

            var headerNames = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
              header: 1
            })[0];

            var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

            $scope.opts = {};
            $scope.opts.columnDefs = [];
            headerNames.forEach(function (h) {
              $scope.opts.columnDefs.push({
                field: h
              });
            });

            $scope.opts.data = data;

            $elm.val(null);
          });
        };

        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    }
  };
}]);