(function () {
  'use strict';

  angular
    .module('app.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoryService'];

  function CategoriesController(categoryService) {
    var vm = this;
    vm.category = categoryService.cat;
  }
})();

