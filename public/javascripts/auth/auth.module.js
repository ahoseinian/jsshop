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
				templateUrl: "/javascripts/auth/login.html",
			})

			.state('auth.signup', {
				url: "/signup",
				templateUrl: "/javascripts/auth/signup.html",
				controller: "SignUpController",
				controllerAs: "vm",
			})
	}
})();