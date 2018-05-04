/* global angular coreApp XLSX Materialize */

coreApp.controller('uploadController', ['$scope', '$timeout', 'CompetencyData', ($scope, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  function dataToArray(fileData) {
    return new Promise((resolve) => {
      const finalArray = [];
      let i;

      for (i = 0; i < fileData.length; i++) {
        for (const key in fileData[i]) { // eslint-disable-line
          const obj = {};
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
      dataToArray($scope.result.data).then((arrData) => {
        const arrDataToJson = {
          data: arrData,
        };
        CompetencyData.uploadCompData((arrDataToJson)).then((responseCode) => {
          console.log(responseCode);
          if (responseCode === 200) {
            Materialize.toast('File uploaded successfully', 4000, 'rounded');
          }
        });
      });
    }
  };
}]);

coreApp.directive('fileread', [() => {
  return {
    scope: {
      opts: '=',
    },
    link: ($scope, $elm) => {
      $elm.on('change', (changeEvent) => {
        const reader = new FileReader();

        reader.onload = (evt) => {
          $scope.$apply(() => {
            const fileData = evt.target.result;

            const workbook = XLSX.read(fileData, {
              type: 'binary',
            });

            const headerNames = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
              header: 1,
            })[0];

            const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

            $scope.opts = {};
            $scope.opts.columnDefs = [];
            headerNames.forEach((h) => {
              $scope.opts.columnDefs.push({
                field: h,
              });
            });

            $scope.opts.data = data;
            $elm.val(null);
          });
        };

        reader.readAsBinaryString(changeEvent.target.files[0]);
      });
    },
  };
}]);
