(function(){
	'use strict';

	angular
		.module('app.routes.products', [])
		.config(config);

		config.$inject = ['$stateProvider'];
		function config($stateProvider){
			$stateProvider

				.state('products', {
					url: "/products",
					templateUrl: "/js/products/templates/index.html",
					controller: 'ProductsController',
					controllerAs: 'vm',
					resolve:{
						modelsPromise: ['model', function(model){
							return model.getAll();
						}],
					}
				})

				.state('products.models', {
					url: "/models/:id",
					templateUrl: "/js/products/templates/models.html",
					controller: 'ProductsModelsController',
					controllerAs: 'vm',
					resolve:{
						modelPromise: ['model', '$stateParams', function(model, $stateParams){
							return model.getProducts($stateParams.id);
						}],
					}
				})

				.state('products.models.new', {
					url: "/new/:pid",
					templateUrl: "/js/products/templates/new.html",
					controller: 'ProductsModelsNewController',
					controllerAs: 'vm',
				})

				.state('products.models.search', {
					url: '/search',
					templateUrl: "/js/products/templates/search.html",
					controller: 'ProductsModelsSearchController',
					controllerAs: 'vm',
				})

		}
})();
