(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('productSlider', productSlider);

  productSlider.$inject = ['product', '$timeout'];

  function productSlider(product, $timeout) {
    return {
      templateUrl: '/js/directives/product/slider.html',
      scope: {
        items: '='
      },
      link,
    };

    function link(scope, element, attrs) {

      $timeout(function () {
        $($(element)[0].children[0])
          .slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            rtl: true,
          });
      })


      scope.quickView = function (itm) {
        product.current = itm;
        $('.quick-view-modal')
          .modal('show');
      }
    }
  }

})();

