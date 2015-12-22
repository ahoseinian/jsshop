(function(){
	'use strict';

	angular
		.module('app.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['productPrepService', 'cartService']
	function ProductController(productPrepService, cartService){
		var vm = this;
		vm.item = productPrepService.data;
		vm.cart = cartService;
	}
})();