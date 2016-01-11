(function () {
  'use strict';

  angular
    .module('app.categories', [])
    .config(config);

  config.$inject = ['$stateProvider', '$urlMatcherFactoryProvider'];

  function config($stateProvider, $urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.type('coolParam', {
      encode: function (item) {
        if (typeof item !== 'string') return $.param(item);
        return item;
      }
    });

    $stateProvider
      .state('app.categories', {
        url: '/categories/:name?priceFrom&priceTo&{dtls:coolParam}',
        templateUrl: '/js/categories/index.html',
        controller: 'CategoriesController as vm',
        resolve: {
          categoryPrepService: categoryPrepService
        }
      });
  }

  categoryPrepService.$inject = ['categoryService', '$stateParams'];

  function categoryPrepService(categoryService, $stateParams) {
    if (typeof $stateParams.dtls === 'object') return true;

    var query = {
      price: {
        $gt: $stateParams.priceFrom,
        $lte: $stateParams.priceTo
      }
    };

    if ($stateParams.dtls && typeof $stateParams.dtls === 'string') {
      var details = $.deparam($stateParams.dtls, true);
      $.each(details, function (k, v) {
        $.each(v, function (key, value) {
          if (!value) delete v[key];
          query['dtls.' + k] = {};
          query['dtls.' + k].$in = Object.keys(v);
        });
      });
    }
    return categoryService.item.$query(query, $stateParams.name);
  }

})();

