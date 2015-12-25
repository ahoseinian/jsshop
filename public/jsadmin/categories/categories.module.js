(function () {
  'use strict';

  angular
    .module('admin.categories', [])
    .config(config);


  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    $stateProvider
      .state('categories', {
        url: "/categories",
        templateUrl: "/jsadmin/categories/index.html",
        controller: 'CategoriesController',
        controllerAs: 'vm',
      })
      .state('categories.detail', {
        url: '/categories/:id/details',
        templateUrl: '/jsadmin/categories/detail.html',
        controller: 'DetailsController as vm',
        resolve: {
          categoryPrepService: categoryPrepService
        }
      })
  };

  categoryPrepService.$inject = ['categoryService', '$stateParams'];

  function categoryPrepService(categoryService, $stateParams) {
    return categoryService.find({
      _id: $stateParams.id
    });
  }
})();

