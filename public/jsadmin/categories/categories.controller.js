(function () {
  'use strict';

  angular
    .module('admin.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoryService'];

  function CategoriesController(categoryService) {
    const vm = this;
    vm.srv = categoryService;
    vm.child = {
      dtls: [],
    }
    categoryService.getAll();

    vm.addDetail = addDetail;
    vm.saveChild = saveChild;
    vm.newCat = newCat;

    function addDetail() {
      vm.srv.cur.dtls.push({});
    }

    function saveChild(parent, child) {
      categoryService.saveChild(parent._id, child).success(function () {
        vm.parent = null;
        vm.child = {
          dtls: [],
        };
      });
    }

    function newCat() {
      vm.srv.cur = {
        dtls: [],
      };
    }
  }
})();

