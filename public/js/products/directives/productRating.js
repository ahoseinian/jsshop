(function(){
  'use strict';

  angular
    .module('app.products')
    .directive('productRating', productRating);

  function productRating() {
    return {
      templateUrl: '/js/products/directives/tpl/productRating.html',
      scope: {
        product: '=',
      },
    };
  }
})();