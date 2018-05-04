'use strict';

/* global angular coreApp XLSX Materialize */

coreApp.controller('uploadController', ['$scope', '$timeout', 'CompetencyData', function ($scope, $timeout, CompetencyData) {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  function dataToArray(fileData) {
    return new Promise(function (resolve) {
      var finalArray = [];
      var i = void 0;

      for (i = 0; i < fileData.length; i++) {
        for (var key in fileData[i]) {
          // eslint-disable-line
          var obj = {};
          if (Object.prototype.hasOwnProperty.call(fileData[i], key)) {
            if (fileData[i][key] === 'E0' || fileData[i][key] === 'E1' || fileData[i][key] === 'E2' || fileData[i][key] === 'E3' || fileData[i][key] === 'E4') {
              obj.empId = fileData[i]['Employee Number'];
              obj.empName = fileData[i]['Employee Name'];
              obj.compName = key;
              obj.profLvl = fileData[i][key];
              finalArray.push(obj);
            }
          }
        }
      }
      resolve(finalArray);
    });
  }

  $scope.uploadCompetencyData = function uploadCompetencyData() {
    if (!angular.isUndefinedOrNullOrEmpty($scope.result.data)) {
      dataToArray($scope.result.data).then(function (arrData) {
        var arrDataToJson = {
          data: arrData
        };
        CompetencyData.uploadCompData(arrDataToJson).then(function (responseCode) {
          console.log(responseCode);
          if (responseCode === 200) {
            Materialize.toast('File uploaded successfully', 4000, 'rounded');
          }
        });
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