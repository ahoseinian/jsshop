(function () {
  'use strict';

  angular
    .module('app.cart')
    .controller('CartController', CartController);

  CartController.$inject = ['cartService'];

  function CartController(cartService) {
  	var vm = this;
  	vm.srv = cartService;
  }
})();

