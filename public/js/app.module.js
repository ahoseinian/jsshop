(function () {
  'use strict';
  angular
    .module('myApp', [
      'ui.router',
      'app.common',
      'app.products',
      'app.routes.auth',
      'app.categories',
      'app.cart',
      'app.directives',
      'app.purchase',
      'app.filters',
      'app.search',
      'angular-loading-bar',
      'ngAnimate'
    ])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          cart: {
            templateUrl: '/js/cart/small.html',
            controller: 'CartController as vm'
          },

          main: {
            templateUrl: '/js/index.html',
            controller: 'HomeController as vm'
          },

          search: {
            templateUrl: '/js/search/index.html',
            controller: 'SearchController as vm'
          }

        }
      })
      .state('app.home', {
        url: '/home',
        controller: 'HomeController as vm',
        templateUrl: '/js/home.html'
      });
  }

})();

