(function () {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['product', 'cartService']

  function ProductController(product, cartService) {
    var vm = this;
    vm.item = product.current;
    vm.cart = cartService;
    vm.addComment = addComment;



    function addComment(cm) {
      product.addComment(cm).success(function () {
      	vm.item.rate = getAverage();
        vm.comment = null;
      });
    }
  }
})();

