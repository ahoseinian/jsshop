(function () {
  'use strict';

  angular
    .module('app.products')
    .directive('pSmBox', pSmBox);

  function pSmBox() {
    return {
      templateUrl: '/js/products/directives/tpl/pSmBox.html',
      replace:true,
      scope: {
        product: '=',
      },
    };
  }

})();

