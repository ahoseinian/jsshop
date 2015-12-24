(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['product'];

  function HomeController(product) {
    var vm = this;
    vm.pServ = product;
  }
})();

