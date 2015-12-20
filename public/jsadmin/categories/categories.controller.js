(function () {
  'use strict';

  angular
    .module('admin.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoryService'];

  function CategoriesController(categoryService) {
    const vm = this;
    vm.srv = categoryService;
    categoryService.getAll();
  }
})();

