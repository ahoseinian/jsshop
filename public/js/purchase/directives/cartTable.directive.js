(function(){
	'use strict';

	angular
		.module('app.purchase')
		.directive('purchaseTable', purchaseTable);

  function purchaseTable() {
    return {
      templateUrl: '/js/purchase/directives/purchaseTable.html',
      scope: {
        products: '=',
        price: '=',
      },
    };
  }
})();