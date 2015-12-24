(function () {
  'use strict';

  angular
    .module('app.products')
    .directive('productSlider', productSlider);

  productSlider.$inject = ['product', '$timeout'];

  function productSlider(product, $timeout) {
    return {
      templateUrl: '/js/products/directives/tpl/slider.html',
      scope: {
        items: '=',
        name: '@',
      },
      link,
    };

    function link(scope, element, attrs) {

      $timeout(function () {
        element.find('.mcarousel').slick({
          slidesToShow: 4,
          slidesToScroll: 2,
          rtl: true,
          swipeToSlide: true,
          responsive: [{
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
              }
            }, {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2
              }
            }, {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });
      })


      scope.quickView = function (itm) {
        product.current = itm;
        $('.quick-view-modal').modal('show');
      }
    }
  }

})();

