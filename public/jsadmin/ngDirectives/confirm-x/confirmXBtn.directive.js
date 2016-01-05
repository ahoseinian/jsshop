(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('confirmXBtn', confirmXBtn);

  confirmXBtn.$inject = ['MODULE_PATH'];

  function confirmXBtn(MODULE_PATH) {
    var directive = {
      link: link,
      templateUrl: MODULE_PATH + '/confirm-x/confirm-x.html',
      scope: {
        clickFunc: '&'
      },
    };

    return directive;

    function link(scope, el, attrs) {
      scope.confirmed = false;
    }
  }
})();

