(function () {
  'use strict';

  angular
    .module('app.products')
    .directive('productMslider', productMslider);

  productMslider.$inject = ['product'];
  function productMslider(product) {
    return {
      templateUrl: '/js/products/directives/tpl/mslider.html',
      scope: {
        products: '=',
        name: '@',
      },
      link: link,
    };

    function link(scope, el, attrs) {
      el.find('.mslider').mousewheel(function (e, delta) {
        this.scrollLeft -= (delta * 40);
        e.preventDefault();
      });
    }
  }
})();

