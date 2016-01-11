(function () {
  'use strict';

  angular
    .module('app.categories')
    .factory('categoryService', categoryService);

  categoryService.$inject = ['$http', 'product'];

  function categoryService($http, product) {
    var BASE_URL = '/api/categories/';

    function Category(data) {
      if (!(this instanceof Category)) return new Category(data);
      $.extend(this, data);
      if (this.data && this.data._products.length) {
        this.data._products = this.data._products.map(product.getNew);
      }
    }

    Category.prototype.$query = function query(params, categoryName) {
      var _this = this;
      params = params ? '?' + $.param(params) : '';
      return $http.get(BASE_URL + (categoryName || _this.data.name) + params).success(function (res) {
        _this.constructor(res);
        ftry.item = _this;
      });
    };

    var ftry = {
      item: Category()
    };

    return ftry;
  }
})();

