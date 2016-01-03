(function(){
	'use strict';

	angular
		.module('app.products')
		.directive('productPrice', productPrice);

  function productPrice() {
    return {
      templateUrl: '/js/products/directives/tpl/price.html',
      scope: {
        product: '=',
      },
    };
  }
})();