(function () {
  'use strict';

  angular
    .module('app.products')
    .factory('product', product);

  product.$inject = ['$http'];

  function product($http) {
    var BASE_URL = '/api/products/';

    var ftry = {
      cur: {},
      find,
      addComment,
    };

    return ftry;

    function find(obj) {
      return $http.get(BASE_URL + obj.name).success(function (res) {
        ftry.cur = res;
      });
    }

    function addComment(cm) {
      return $http.post(BASE_URL + ftry.cur._id + '/comments', cm).success(function (res) {
        ftry.cur.comments.push(res);
        toastr.success("نظر شما با موفقیت ثبت شد");
        return res;
      });
    }

  }
})();

