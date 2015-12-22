(function () {
  'use strict';

  angular
    .module('app.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoryPrepService'];

  function CategoriesController(categoryPrepService) {
    var vm = this;
    vm.category = categoryPrepService.data;

  }
})();

