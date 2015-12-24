(function(){
	'use strict';

	angular
		.module('panelApp.directives')
		.directive('confirmBtn', confirmBtn);

	function confirmBtn() {
	  var directive = {
	    link: link,
	    templateUrl: '/jspanel/directives/confirm/confirm.html',
	    scope:{
	    	clickFunc: '&'
	    },
	  };

	  return directive;

	  function link(scope, el, attrs) {
    	scope.confirmed = false;
    }	
	}
})();