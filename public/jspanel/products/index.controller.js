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
    vm.setCurCat = setCurCat;

    productService.getAll();

    function setCurCat(cats, cat) {
      vm.curCat = cats.find(function (itm) {
      	return itm.name === cat; 
      });
    }
  }

})();

