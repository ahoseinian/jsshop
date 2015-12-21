(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['product', 'cartService', '$state'];

  function HomeController(product, cartService, $state) {
    var vm = this;
    vm.pServ = product;
    vm.cartSrv = cartService;
    vm.gotoCurProduct = gotoCurProduct;

    function gotoCurProduct() {
      $('.modal').on('hidden.bs.modal', function (e) {
        $state.go('app.products', {
          name: product.current.name
        });
      })
    }
  }
})();

