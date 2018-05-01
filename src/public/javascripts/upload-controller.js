/* global angular coreApp XLSX Materialize */

coreApp.controller('uploadController', ['$scope', 'CompetencyData', ($scope, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.uploadCompetencyData = function uploadCompetencyData() {
    if (!angular.isUndefinedOrNullOrEmpty($scope.result.data)) {
      CompetencyData.uploadCompData($scope.result.data).then((responseCode) => {
        console.log(responseCode);
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