/* global angular coreApp XLSX M */

coreApp.controller('uploadController', ['$scope', '$timeout', 'CompetencyData', ($scope, $timeout, CompetencyData) => {
  angular.isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
    return angular.isUndefined(val) || val === null || val === '';
  };

  $scope.fileType = true;

  if ($scope.fileType) {
    $scope.typeOfFile = 'Competency';
  } else {
    $timeout(() => {
      $scope.typeOfFile = 'Training';
    }, 500);
  }

  $("input[type='checkbox']").on('change', () => {
    if ($scope.fileType) {
      $scope.typeOfFile = 'Competency';
    } else {
      $scope.typeOfFile = 'Training';
    }
    $timeout(() => {
      if (!angular.isUndefinedOrNullOrEmpty($scope.result)) {
        $("form :input[id='fileInput']").val('');
        $("form :input[id='fileInputText']").val('');
        $scope.result = {};
      }
    }, 100);
  });

  function dataToArray(fileData) {
    return new Promise((resolve) => {
      const finalArray = [];
      let i;

      for (i = 0; i < fileData.length; i++) {
        for (const key in fileData[i]) { // eslint-disable-line
          const obj = {};
          if (Object.prototype.hasOwnProperty.call(fileData[i], key)) {
            if ($scope.typeOfFile === 'Competency') {
              if (fileData[i][key] === 'E0' || fileData[i][key] === 'E1' || fileData[i][key] === 'E2' || fileData[i][key] === 'E3' || fileData[i][key] === 'E4') {
                obj.emp_id = fileData[i]['Employee Number'];
                obj.emp_name = fileData[i]['Employee Name'];
                obj.emp_comp_name = key;
                obj.emp_comp_level = fileData[i][key];
                obj.created_by = 'Admin';
                finalArray.push(obj);
              }
            } else if ($scope.typeOfFile === 'Training') {
              if (fileData[i][key] === 'Yes' || fileData[i][key] === 'No') {
                obj.emp_id = fileData[i]['Employee Number'];
                obj.emp_name = fileData[i]['Employee Name'];
                obj.emp_comp_name = key;
                obj.emp_status = fileData[i][key];
                obj.created_by = 'Admin';
                finalArray.push(obj);
              }
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
        if (jQuery.isEmptyObject(arrData) || angular.isUndefinedOrNullOrEmpty(arrData)) {
          M.toast({ html: 'File upload failed. Please re-check the file format', classes: 'rounded' });
          $("form :input[id='fileInput']").val('');
          $("form :input[id='fileInputText']").val('');
          $scope.result.data = [];
          console.log('Error in formatting data');
        } else {
          const arrDataToJson = {
            typeFile: $scope.typeOfFile,
            fileData: arrData,
          };
          CompetencyData.uploadCompData((arrDataToJson)).then((responseCode) => {
            console.log(responseCode);
            if (responseCode === 200) {
              M.toast({ html: 'File uploaded successfully', classes: 'rounded' });
              $("form :input[id='fileInput']").val('');
              $("form :input[id='fileInputText']").val('');
              $scope.result = {};
            } else {
              M.toast({ html: 'File upload failed due to some error', classes: 'rounded' });
              $("form :input[id='fileInput']").val('');
              $("form :input[id='fileInputText']").val('');
              $scope.result = {};
            }
          }).catch((ex) => {
            M.toast({ html: 'File upload failed due to some error', classes: 'rounded' });
            $("form :input[id='fileInput']").val('');
            $("form :input[id='fileInputText']").val('');
            $scope.result = {};
            console.log(ex.message);
          });
        }
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
