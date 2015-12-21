(function () {
  'use strict';

  angular
    .module('app.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http'];

  function cartService($http) {
    var ftry = {
      items: []
    };
    return ftry;
  }
})();

