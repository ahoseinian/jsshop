(function () {
  'use strict';

  angular
    .module('app.products')
    .factory('product', product);

  product.$inject = ['$http'];

  function product($http){
  	var BASE_URL = '/api/products/';

  	var ftry = {
      cur: {},
      find,
  	};

  	return ftry;	

    function find(obj){
      return $http.get(BASE_URL + obj.name).success(function(res){
        ftry.current = res;
      });
    }

  }
})();

