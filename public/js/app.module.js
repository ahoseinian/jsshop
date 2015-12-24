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
      'angular-loading-bar',
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
            templateUrl: '/js/cart/index.html',
            controller: 'CartController as vm'
          },

          '': {
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
    $rootScope.$on("$stateChangeStart", function () {
      $('.modal-backdrop').hide();
    });
  }

})();

