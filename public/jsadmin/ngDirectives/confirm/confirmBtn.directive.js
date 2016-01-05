(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('confirmBtn', confirmBtn);


  confirmBtn.$inject = ['MODULE_PATH'];

  function confirmBtn(MODULE_PATH) {
    var directive = {
      link: link,
      templateUrl: MODULE_PATH + '/confirm/confirm.html',
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

