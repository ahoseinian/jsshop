(function () {
  'use strict';

  angular
    .module('admin.categories')
    .controller('DetailsController', DetailsController);

  DetailsController.$inject = ['categoryService'];

  function DetailsController(categoryService) {
    var vm = this;
    vm.item = categoryService.cur;
    vm.addValueToDetail = addValueToDetail;

    function addValueToDetail() {
      categoryService.addValueToDetail(vm.dtl).success(function (res) {
      	vm.item = res;
        vm.dtl = {};
      });
    }
  }
})();

