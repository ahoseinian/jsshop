(function () {
  'use strict';

  angular
    .module('panelApp.products')
    .factory('productService', productService);


  productService.$inject = ['$http'];

  function productService($http) {
    var BASE_URL = '/panel/products/';
    var ftry = {
      items: [],
      current: {},
      getAll: getAll,
      save: save,
      remove: remove
    };

    return ftry;


    function getAll() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res, ftry.items);
      });
    }

    function save() {
      if (ftry.current._id) update(ftry.current);
      else insert(ftry.current);
      ftry.current = {};
    }

    function remove(item) {
      $http.delete(BASE_URL + item._id).success(function () {
        ftry.items = ftry.items.filter(function (el) {
          return el._id !== item._id;
        });
      });
    }



    // Private methods
    function insert(item) {
      return $http.post(BASE_URL, item).success(function (res) {
        ftry.items.unshift(res);
        $('.modal').modal('hide');
      });
    }

    function update(item) {
      return $http.put(BASE_URL + item._id, item).success(function () {
        $('.modal').modal('hide');
      });
    }

  }
})();

