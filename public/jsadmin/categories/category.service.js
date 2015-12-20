(function () {
  'use strict';

  angular
    .module('admin.categories')
    .factory('categoryService', categoryService);

  categoryService.$inject = ['$http'];

  function categoryService($http) {
    const BASE_URL = '/admin/categories/';

    const ftry = {
      items: [],
      cur: {},
      getAll,
      save,
      remove,
    }
    return ftry;

    function getAll() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res, ftry.items);
      })
    }

    function save() {
      return $http.post(BASE_URL, ftry.cur).success(function (res) {
        ftry.items.push(res);
        ftry.cur = {};
        $('.modal').modal('hide');
      });
    }

    function remove(cat) {
      return $http.delete(BASE_URL + cat._id).success(function (res) {
        ftry.items = ftry.items.filter(function (itm) {
          return itm._id !== cat._id
        });
      })
    }

  }
})();

