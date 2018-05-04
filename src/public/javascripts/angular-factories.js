/* global angular coreApp */

coreApp.factory('CompetencyData', ['$http', ($http) => {
  return {
    uploadCompData: (empCompData) => {
      return $http({
        method: 'POST',
        url: '/data/upload',
        data: empCompData,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('response: ', response.data);
        return response.status;
      }).catch((error) => {
        console.log('error:', error.data);
        return 500;
      });
    },
  };
}]);
