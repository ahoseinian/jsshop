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
      scope: true
    };
  }

  MainSliderController.$inject = ['$interval', '$rootScope'];

  function MainSliderController($interval, $rootScope) {
    console.log($rootScope);
    var vm = this;
    vm.iteration = 0;

    $interval(function () {
      if (vm.iteration < $rootScope.cats.length - 1) {
        vm.iteration++;
      } else {
        vm.iteration = 0;
      }

    }, 15000);

  }
})();

