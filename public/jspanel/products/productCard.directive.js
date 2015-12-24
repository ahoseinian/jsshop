(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('productCard', productCard);

  function productCard() {
    return {
      templateUrl: '/jspanel/products/card.html',
      scope: {
        vm: '=',
        product: '=',
      },
    };

  }

})();

