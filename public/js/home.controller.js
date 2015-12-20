(function () {
  'use strict';

  angular
    .module('myApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['product', '$timeout'];

  function HomeController(product, $timeout) {
    var vm = this;
    vm.pServ = product;


  }
})();

