(function () {
  'use strict';

  angular
    .module('app.categories', [])
    .config(config);


  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.categories', {
        url: '/categories/:name',
        templateUrl: '/js/categories/index.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
      })
  }

})();

