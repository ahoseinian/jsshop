(function () {
  'use strict';

  angular
    .module('app.purchase')
    .factory('purchaseService', purchaseService);

  purchaseService.$inject = ['$http'];

  function purchaseService($http) {
    var BASE_URL = '/api/purchases/';
    var ftry = {
    	items: [],
      find: find,
    };

    return ftry;

    function find() {
      $http.get(BASE_URL).success(function (res) {
      	angular.copy(res, ftry.items);
      });
    }
  }
})();

