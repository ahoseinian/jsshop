(function(){
	'use strict';

	angular
		.module('panelApp.products', [])
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider){
		$stateProvider
			.state('products',{
				url: "/products",
				templateUrl: "/jspanel/products/index.html",
				controller: 'IndexController',
				controllerAs: 'vm',
			});

	}


})();