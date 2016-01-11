(function () {
  'use strict';

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['$timeout', 'product'];

  function SearchController($timeout, product) {
    var vm = this;
    vm.search = search;
    vm.choose = choose;
    vm.searching = false;

    function search(query) {
      vm.searching = !!query;
      var tempQuery = query;
      $timeout(function () {
        if (tempQuery == vm.query) {
          product.search(query).success(function (res) {
            vm.products = res;
          });
        }
      }, 500);
    }

    function choose(name) {
      vm.query = name;
      vm.searching = false;
    }
  }
})();

