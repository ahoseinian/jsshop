(function () {
  'use strict';

  angular
    .module('app.products', [])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('products', {
      	templateUrl: '/js/products/index.html',
      })
  }
})();

