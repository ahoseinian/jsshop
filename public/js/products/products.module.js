(function () {
  'use strict';

  angular
    .module('app.products', [])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.products', {
        url:'/products/:name',
      	templateUrl: '/js/products/index.html',
        controller: 'ProductController as vm',
      })
  }
})();

