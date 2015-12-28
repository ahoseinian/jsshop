(function () {
  'use strict';

  angular
    .module('app.products')
    .directive('pSmBox', pSmBox);

  function pSmBox() {
    return {
      templateUrl: '/js/products/directives/tpl/pSmBox.html',
      scope: true,
      replace:true,
      bindToController: {
        product: '=',
      },
      controller: PSmBoxController,
      controllerAs: 'vm',
    };
  }

  PSmBoxController.$inject = ['product'];

  function PSmBoxController(product) {
    var vm = this;
    vm.quickView = function (item) {
      product.current = item;
      $('.quick-view-modal').modal('show');
    }
  }
})();

