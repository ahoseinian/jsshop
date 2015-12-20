(function(){
	'use strict';

	angular
		.module('app.routes.auth')
		.controller('AuthController', AuthController);

		AuthController.$inject = ['$stateParams'];
		function AuthController($stateParams){
			var vm = this;
			vm.state = $stateParams.state;
		}
})();