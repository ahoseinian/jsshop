(function () {
  'use strict';

  angular
    .module('app.purchase', [])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.purchases', {
        url: '/purchases',
        templateUrl: '/js/purchase/index.html',
        controller: 'PurchaseController as vm',
        resolve: {
          purchasePrepService: purchasePrepService
        }
      });
  }

  purchasePrepService.$inject = ['purchaseService'];

  function purchasePrepService(purchaseService) {
  	return purchaseService.find();
  }

})();

