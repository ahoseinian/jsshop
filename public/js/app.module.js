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
      'angular-loading-bar',
      'ngAnimate',
    ])
    .run(runFunction)
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          cart: {
            templateUrl: '/js/cart/small.html',
            controller: 'CartController as vm'
          },

          main: {
            templateUrl: '/js/home.html',
            controller: 'HomeController as vm'
          },

        }
      })
      .state('app.home', {
        url: "/home",
      })
  };

  runFunction.$inject = ['$rootScope'];

  function runFunction($rootScope) {
    $rootScope.$on("$stateChangeSuccess", function () {
      // $('.modal-backdrop').hide();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }

})();

