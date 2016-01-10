(function () {
  'use strict';

  angular
    .module('app.categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$rootScope', 'categoryService', '$state', '$stateParams'];

  function CategoriesController($rootScope, categoryService, $state, $stateParams) {
    var vm = this;
    vm.category = categoryService.item;
    $rootScope.title = vm.category.name;

    if (typeof $stateParams.dtls === 'string') {
      vm.dtlSearch = $.deparam($stateParams.dtls, true);
    }

    vm.search = function (data) {
      $state.go('app.categories', {
        dtls: data
      });
    };

  }
})();

