(function () {
  'use strict';

  angular
    .module('app.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$stateParams'];

  function CategoriesController($stateParams) {
    var vm = this;
    vm.name = $stateParams.name;

  }
})();

