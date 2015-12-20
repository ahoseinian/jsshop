(function(){
	'use strict';

	angular
		.module('admin.categories', [])
		.config(config);


	config.$inject = ['$stateProvider'];
	function config($stateProvider){

		$stateProvider
			.state('categories', {
				url: "/categories",
				templateUrl: "/jsadmin/categories/index.html",
				controller: 'CategoriesController',
				controllerAs: 'vm',
			})
	};


})();

