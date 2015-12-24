(function () {
  'use strict';

  angular
    .module('app.products')
    .directive('productQuickView', productQuickView);

  function productQuickView() {
    return {
      templateUrl: '/js/products/directives/tpl/quickView.html',
      controller: QuickViewController,
      controllerAs: 'vm',
      scope: true,
      bindToController: {
        product: '=',
      }
    };
  }

  QuickViewController.$inject = ['cartService'];

  function QuickViewController(cartService) {
    var vm = this;
    vm.cartSrv = cartService;
  }
})();

