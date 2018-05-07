'use strict';

/* global angular coreApp */

coreApp.factory('CompetencyData', ['$http', function ($http) {
  return {
    uploadCompData: function uploadCompData(empCompData) {
      return $http({
        method: 'POST',
        url: '/data/upload',
        data: empCompData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        console.log('response: ', response.data);
        return response.status;
      }).catch(function (error) {
        console.log('error:', error.data);
        return error.status;
      });
    }
  };
}]);