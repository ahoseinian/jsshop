(function () {
  'use strict';

  angular
    .module('app.cart', ['ngStorage'])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.cart', {
        url: '/cart',
        templateUrl: '/js/cart/index.html',
        controller: 'CartController as vm'
      })

  }
})();

