(function(){
	'use strict';

	angular
		.module('panelApp', [
			'ui.router',
			'app.common',
			'app.directives', 
			'angular-loading-bar',
		])
		.config(config);


	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "/jspanel/home.html",
			})
	};


})();

