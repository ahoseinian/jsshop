(function () {
  'use strict';

  angular
    .module('admin.categories')
    .controller('DetailsController', DetailsController);

  DetailsController.$inject = ['categoryService'];

  function DetailsController(categoryService) {
    var vm = this;
    vm.item = categoryService.cur;
  }
})();

