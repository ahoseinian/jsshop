(function () {
  'use strict';

  angular
    .module('panelApp.purchase')
    .controller('PurchaseController', PurchaseController);

  PurchaseController.$inject = ['purchaseService', 'PURCHASE_STATES'];

  function PurchaseController(purchaseService, PURCHASE_STATES) {
    var vm = this;
    vm.items = purchaseService.items;
    vm.purchaseStates = PURCHASE_STATES;
  }

})();

