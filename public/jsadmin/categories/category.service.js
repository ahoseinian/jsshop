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
      cur: {
        dtls: []
      },
      find: find,
      getAll: getAll,
      save: save,
      saveChild: saveChild,
      remove: remove,
      addValueToDetail: addValueToDetail,
    }
    return ftry;

    function find(params) {
      return $http.get(BASE_URL, {
        params: params
      }).success(function (res) {
        ftry.cur = res;
      });
    }

    function getAll() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res, ftry.items);
      })
    }

    function save() {
      ftry.cur.dtls = ftry.cur.dtls.filter(hasName);
      return $http.post(BASE_URL, ftry.cur).success(function (res) {
        if (!ftry.cur._id) ftry.items.push(res);
        ftry.cur = {};
      });
    }

    function saveChild(parentId, child) {
      child.dtls = child.dtls.filter(hasName);
      return $http.post(BASE_URL + parentId + '/children', child).success(function (res) {
        ftry.items.push(res);
      });
    }

    function remove(cat) {
      return $http.delete(BASE_URL + cat._id).success(function (res) {
        ftry.items = ftry.items.filter(function (itm) {
          return itm._id !== cat._id
        });
      })
    }

    function addValueToDetail(dtl) {
      return $http.post(BASE_URL + ftry.cur._id + '/details/' + dtl.id, {
        name: dtl.value
      });
    }


    //private methods

    function hasName(dtl) {
      return !!dtl.name;
    }

  }
})();

