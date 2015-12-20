(function () {
  'use strict';

  angular
    .module('app.products')
    .factory('product', product);

  product.$inject = ['$http'];

  function product($http){
  	var BASE_URL = '/api/products/';

  	var ftry = {
  		items: [],
      current: {},
  		getAll,
      getLatest,
  	};

  	return ftry;	


    function getAll() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res, ftry.items);
      });
    }

    function getLatest() {
      return $http.get(BASE_URL);
    }
  }
})();

