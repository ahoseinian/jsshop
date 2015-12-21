(function(){
	'use strict';
	angular
		.module('app.routes.auth', [])
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider){

		$stateProvider
			.state('app.auth', {
				url: "/auth/:state?",
				templateUrl: "/js/auth/login.html",
				controller: 'AuthController',
				controllerAs: 'vm',
			})

			.state('app.auth.signup', {
				url: "/signup",
				templateUrl: "/js/auth/signup.html",
				controller: "SignUpController",
				controllerAs: "vm",
			})
	}
})();