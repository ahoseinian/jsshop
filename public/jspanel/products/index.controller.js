(function () {
  'use strict';

  angular
    .module('panelApp.products')
    .controller('IndexController', IndexController);


  IndexController.$inject = ['productService'];

  function IndexController(productService) {
    var vm = this;
    vm.test = 'test';
    vm.pServ = productService;

    productService.getAll();

  }

})();

