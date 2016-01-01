(function () {
  'use strict';

  angular
    .module('app.cart')
    .filter('range', function () {
      return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
          input.push(i);

        return input;
      };
    })
    .controller('CartController', CartController);

  CartController.$inject = ['cartService', '$state'];

  function CartController(cartService, $state) {
    var vm = this;
    vm.srv = cartService;
    vm.doTransaction = doTransaction;

    function doTransaction() {
      var data = {
        address: vm.address,
        products: vm.srv.items,
      };
      cartService.doTransaction(data).success(function () {
        $state.go('app.purchases');
      });
    }
  }
})();

