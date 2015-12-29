(function () {
  'use strict';

  angular
    .module('app.purchase')
    .controller('PurchaseController', PurchaseController);

  PurchaseController.$inject = ['purchaseService'];

  function PurchaseController(purchaseService) {
    var vm = this;
    console.log(purchaseService);
    vm.items = purchaseService.items;
  }

})();

