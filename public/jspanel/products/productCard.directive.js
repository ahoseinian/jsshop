(function () {
  'use strict';

  angular
    .module('panelApp.directives')
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

