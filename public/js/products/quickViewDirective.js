(function () {
  'use strict';

  angular
    .module('app.products')
    .directive('productQuickView', productQuickView);

  function productQuickView() {
    return {
      templateUrl: '/js/products/quickView.html',
      controller: QuickViewController,
      controllerAs: 'vm',
      scope: true,
      bindToController: {
        product: '=',
      }
    };
  }

  QuickViewController.$inject = ['cartService', '$state'];

  function QuickViewController(cartService, $state) {
    var vm = this;
    vm.cartSrv = cartService;
    vm.gotoCurProduct = gotoCurProduct;

    function gotoCurProduct() {
      $('.modal').on('hidden.bs.modal', function (e) {
        $state.go('app.products', {
          name: vm.product.name
        });
      })
    }
  }
})();

