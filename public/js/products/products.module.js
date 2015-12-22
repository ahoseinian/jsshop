(function () {
  'use strict';

  angular
    .module('app.products', [])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.products', {
        url: '/products/:name',
        templateUrl: '/js/products/index.html',
        controller: 'ProductController as vm',
        resolve: {
          productPrepService: productPrepService
        }
      })
  }

  productPrepService.$inject = ['product', '$stateParams'];

  function productPrepService(product, $stateParams) {
    return product.find({
      name: $stateParams.name
    });
  }
})();

