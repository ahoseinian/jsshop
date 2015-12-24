(function(){
	'use strict';

	angular
		.module('app.products')
		.directive('productDetails', productDetails);

  function productDetails() {
    return {
      templateUrl: '/js/products/details.html',
      scope: {
        product: '=',
      },
    };
  }
})();