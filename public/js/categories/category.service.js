(function () {
  'use strict';

  angular
    .module('app.categories')
    .factory('categoryService', categoryService);

  categoryService.$inject = ['$http', 'product'];

  function categoryService($http, product) {
    var BASE_URL = '/api/categories/';

    function Category(data) {
      $.extend(this, data);
      if (this._products) {
        this._products = this._products.map(product.getNew);
      }
    }

    Category.prototype.$query = function query(params, categoryName) {
      var that = this;
      $http.get(BASE_URL + (categoryName || this.name), {
        params: params
      }).success(function (res) {
        that.constructor(res);
      });
    }

    var ftry = {
      cat: new Category(),
    };

    return ftry;
  }
})();

