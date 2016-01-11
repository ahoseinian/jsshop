(function () {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductController', ProductController);

  ProductController.$inject = ['$rootScope', 'product', 'cartService'];

  function ProductController($rootScope, product, cartService) {
    var vm = this;
    vm.item = product.current;
    vm.cart = cartService;
    vm.addComment = addComment;
    
    $rootScope.title = vm.item.name;

    function addComment(cm) {
      product.addComment(cm).success(function () {
        vm.comment = null;
      });
    }
  }
})();

