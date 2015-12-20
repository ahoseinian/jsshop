(function(){
	'use strict';

	angular
		.module('adminApp', [
			'ui.router',
			'app.common',
			'app.directives', 
			'angular-loading-bar',
			'admin.categories',
		])
		.config(config);


	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "/jsadmin/home.html",
			})
	};


})();

