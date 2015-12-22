(function () {
  'use strict';

  angular
    .module('app.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http', '$localStorage'];

  function cartService($http, $localStorage) {
    var ftry = {
      storage: $localStorage.$default({
        items: []
      }),
      query,
      add,
      getTotal,
      drop,
    };
    return ftry;


    function query() {
      return ftry.storage.items;
    }

    function add(itm) {
      if (hasItem(itm)) {
        toastr.warning("کالا در سبد موجود میباشد");
        return false;
      }
      ftry.storage.items.push(itm);
      toastr.success("کالا به سبد افزوده شد");
    }

    function getTotal() {
      return ftry.storage.items.reduce(function (a, b) {
        return a + b.price;
      }, 0)
    }

    function drop() {
      ftry.storage.items = [];
      toastr.success("سبد خرید خالی شد");
    }

    //private methods
    function hasItem(itm) {
      return ftry.storage.items.find(function (one) {
        return one._id == itm._id;
      });
    }


  }
})();

