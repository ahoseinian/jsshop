(function () {
  'use strict';

  angular
    .module('app.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$rootScope', 'categoryService'];

  function CategoriesController($rootScope, categoryService) {
    var vm = this;
    vm.category = categoryService.item;
    $rootScope.title = vm.category.name;

    var currentSearch = {};
    vm.search = function (data) {
      $.extend(currentSearch, data);
      vm.category.$query(currentSearch);
    };

  }
})();

