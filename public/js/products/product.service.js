(function () {
  'use strict';

  angular
    .module('app.products')
    .factory('product', product);

  product.$inject = ['$http'];

  function product($http) {
    var BASE_URL = '/api/products/';

    function Product(data) {
      $.extend(this, data);
      if (this.comments) this.$ratings = getRatings(this);
    }

    Product.prototype.$quickView = function () {
      find(this).success(function () {
        $('.modal').modal('show');
      });
    };

    var ftry = {
      current: new Product(),
      find: find,
      addComment: addComment,
      getNew: getNew,
      search: search
    };

    return ftry;

    function getNew(data) {
      return new Product(data);
    }

    function find(product) {
      return $http.get(BASE_URL + product._id + '/' + product.name).success(function (res) {
        ftry.current = new Product(res.data);
        ftry.current.$similars = res.similars.map(getNew);
      });
    }

    function addComment(cm) {
      return $http.post(BASE_URL + ftry.current._id + '/comments', cm).success(function (res) {
        ftry.current.comments.push(res);
        toastr.success('نظر شما با موفقیت ثبت شد');
        return res;
      });
    }

    function search(query) {
      return $http.get(BASE_URL + 'search', {
        params: {
          query: query
        }
      });
    }

    //private methods

    function getRatings(product) {
      if (!product._id || !product.comments.length) {
        return false;
      }
      var avg = product.comments.reduce(function (a, b) {
        return a + b.rate;
      }, 0) / product.comments.length;
      return {
        avg: avg,
        fullstars: new Array(parseInt(avg / 2)),
        halfstars: new Array(avg % 2 === 0 ? 0 : 1),
        emptystars: new Array(parseInt((10 - avg) / 2))
      };
    }

  }
})();

