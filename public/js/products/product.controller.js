(function(){
	'use strict';

	angular
		.module('app.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['product', 'cartService']
	function ProductController(product, cartService){
		var vm = this;
		vm.item = product.cur;
		vm.cart = cartService;
		vm.item.rate = getAverage();
		vm.addComment = addComment;

		function getAverage(){
			var	avg = vm.item.comments.reduce(function(a, b){ return a + b.rate }, 0) / vm.item.comments.length;
			return {
				avg: avg,
				fullstars: new Array(parseInt(avg / 2)),
				halfstars: new Array(parseInt(avg % 2)),
				emptystars: new Array(parseInt((10 - avg) / 2)),
			}
		}

		function addComment(cm){
			product.addComment(cm).success(function(){
				vm.comment = null;
			});
		}
	}
})();