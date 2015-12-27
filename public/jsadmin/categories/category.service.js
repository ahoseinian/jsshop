(function () {
  'use strict';
  angular.module('admin.categories').factory('categoryService', categoryService);
  categoryService.$inject = ['$http'];

  function categoryService($http) {
    const BASE_URL = '/admin/categories/';

    function Cat(data) {
      if (data) {
        for (var p in data) {
          this[p] = data[p];
        }
      } else {
        this.dtls = [];
      }
    };

    Cat.prototype.$removeDetailValue = function (detail, value) {
      var that = this;
      $http.delete(BASE_URL + this._id + '/details/' + detail._id + '/values/' + value._id).success(function (res) {
        that.constructor(res);
      });
    };

    Cat.prototype.$addValueToDetail = function (detail) {
      var that = this;
      $http.post(BASE_URL + this._id + '/details/' + detail._id, {
        name: detail.value
      }).success(function (res) {
        that.constructor(res);
      });
    }

    const ftry = {
      items: [],
      cur: getNew(),
      getNew: getNew,
      find: find,
      getAll: getAll,
      save: save,
      saveChild: saveChild,
      remove: remove,
    }

    return ftry;

    function getNew(itm) {
      return new Cat(itm)
    }

    function find(params) {
      return $http.get(BASE_URL, {
        params: params
      }).success(function (res) {
        ftry.cur = getNew(res);
      });
    }

    function getAll() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res.map(getNew), ftry.items);
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

    //private methods
    function hasName(dtl) {
      return !!dtl.name;
    }
  }
})();

