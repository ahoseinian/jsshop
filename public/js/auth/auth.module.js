(function(){
	'use strict';
	angular
		.module('app.routes.auth', [])
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider){

		$stateProvider
			.state('auth', {
				url: "/auth",
				templateUrl: "/js/auth/login.html",
			})

			.state('auth.signup', {
				url: "/signup",
				templateUrl: "/js/auth/signup.html",
				controller: "SignUpController",
				controllerAs: "vm",
			})
	}
})();