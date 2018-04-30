/* global angular coreApp */

coreApp.factory('CompetencyData', ['$http', ($http) => {
  return {
    uploadCompData: (empCompData) => {
      return $http({
        method: 'PUT',
        url: '/data/upload',
        data: empCompData,
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
