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
    },
    getReportData: function getReportData(reportconfig) {
      return new Promise(function (resolve, reject) {
        $http({
          method: 'POST',
          url: '/reports/getReportData',
          data: reportconfig,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    },

    getCompetencyList: function getCompetencyList() {
      return $http({
        method: 'GET',
        url: '/reports/getCompetency'
      }).then(function (response) {
        console.log('response: ', response.data);
        return response;
      }).catch(function (error) {
        console.log('error:', error.data);
        return error.status;
      });
    },

    getTrainingList: function getTrainingList() {
      return $http({
        method: 'GET',
        url: '/reports/getTraining'
      }).then(function (response) {
        console.log('response: ', response.data);
        return response;
      }).catch(function (error) {
        console.log('error:', error.data);
        return error.status;
      });
    },

    getDashboardData: function getDashboardData() {
      return $http({
        method: 'GET',
        url: '/getDashboardData'
      }).then(function (response) {
        console.log('response: ', response.data);
        return response;
      }).catch(function (error) {
        console.log('error:', error.data);
        return error.status;
      });
    }
  };
}]);