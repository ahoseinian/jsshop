(function () {
  'use strict';
  angular
    .module('myApp', [
      'ui.router',
      'app.common',
      'app.directives',
      'app.products',
      'app.routes.auth',
      'app.categories',
      'angular-loading-bar',
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          cart: {
            templateUrl: '/js/cart/index.html',
          },

          '': {
            templateUrl: '/js/home.html',
            controller: 'HomeController as vm'
          },

        }
      })
      .state('app.home', {
        url: "/home",
        templateUrl: "/js/home.html",
        controller: 'HomeController',
        controllerAs: 'vm',
      })
  };



})();

