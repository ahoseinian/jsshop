(function () {
  'use strict';

  angular
    .module('panelApp.purchase', [])
    .constant('PURCHASE_STATES', ['ثبت سفارش', 'تایید سفارش', 'ارسال سفارش', 'تایید رسیدن به مشتری'])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('purchase', {
        url: "/purchase",
        templateUrl: "/jspanel/purchase/index.html",
        controller: 'PurchaseController as vm',
        resolve: {
          purchasePrepService: purchasePrepService
        },
      });

  }

  purchasePrepService.$inject = ['purchaseService'];

  function purchasePrepService(purchaseService) {
    return purchaseService.find();
  }

})();

