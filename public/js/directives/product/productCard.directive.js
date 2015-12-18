(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('productCard', productCard);

  function productCard() {
    return {
      templateUrl: '/js/directives/product/card.html',
      scope: {
        vm: '=',
        product: '=',
      },
    };

  }

})();

