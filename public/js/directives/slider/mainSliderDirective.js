(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('mainSlider', mainSlider);

  function mainSlider() {
    return {
      templateUrl: '/js/directives/slider/mainSlider.html',
      controller: MainSliderController,
      controllerAs: 'vm',
      scope: true,
    };
  }

  function MainSliderController($interval) {
    var vm = this;
    vm.slides = [{
      name: 1
    }, {
      name: 2
    }, {
      name: 3
    }];
    vm.iteration = 1;

    $interval(function () {
      if (vm.iteration < vm.slides.length ) {
        vm.iteration++;
      } else {
        vm.iteration = 1;
      }

    }, 12000);

  }
})();

