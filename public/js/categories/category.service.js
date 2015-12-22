(function () {
  'use strict';

  angular
    .module('app.categories')
    .factory('categoryService', categoryService);


  categoryService.$inject = ['$http'];

  function categoryService($http) {
    var BASE_URL = '/api/categories/';
    var ftry = {
      query,
    };

    return ftry;

    function query(obj) {
    	return $http.get(BASE_URL + obj.name);
    }
  }
})();

