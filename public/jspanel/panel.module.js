(function(){
	'use strict';

	angular
		.module('panelApp', [
			'ui.router',
			'app.common',
			'panelApp.directives', 
			'angular-loading-bar',
			'panelApp.products',
		])
		.config(config);


	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/products");

		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "/jspanel/home.html",
			})
	};


})();

