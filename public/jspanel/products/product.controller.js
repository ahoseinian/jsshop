(function () {
  'use strict';

  angular
    .module('panelApp.products')
    .controller('ProductController', ProductController);


  ProductController.$inject = ['productService'];

  function ProductController(productService) {
    var vm = this;
    vm.test = 'test';
    vm.pServ = productService;
    vm.getCurCat = getCurCat;
    productService.getAll();

    function getCurCat(cats) {
      if (vm.pServ.current._category !== undefined) {
        return cats.find(function (el) {
          return el._id ==  vm.pServ.current._category._id;
        })
      }
    }

  }

})();

