(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$rootScope', 'product'];

  function HomeController($rootScope, product) {
    var vm = this;
    vm.pServ = product;
    vm.products = $rootScope.products.map(product.getNew);
    $rootScope.title = "";
  }
})();

