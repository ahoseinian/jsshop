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

  CartController.$inject = ['cartService'];

  function CartController(cartService) {
    var vm = this;
    vm.srv = cartService;
  }
})();

