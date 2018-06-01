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
        return error.status;
      });
    },

    getCompetencyList: () => {
      return $http({
        method: 'GET',
        url: '/reports/getCompetency',
      }).then((response) => {
        console.log('response: ', response.data);
        return response;
      }).catch((error) => {
        console.log('error:', error.data);
        return error.status;
      });
    },

    getTrainingList: () => {
      return $http({
        method: 'GET',
        url: '/reports/getTraining',
      }).then((response) => {
        console.log('response: ', response.data);
        return response;
      }).catch((error) => {
        console.log('error:', error.data);
        return error.status;
      });
    },

    getDashboardData: () => {
      return $http({
        method: 'GET',
        url: '/getDashboardData',
      }).then((response) => {
        console.log('response: ', response.data);
        return response;
      }).catch((error) => {
        console.log('error:', error.data);
        return error.status;
      });
    },
  };
}]);
