(function () {
  'use strict';

  angular
    .module('app.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http'];

  function cartService($http) {
    var ftry = {
      items: [],
      addItem,
    };
    return ftry;

    function addItem(itm) {
      if (!hasItem(itm)) ftry.items.push(itm);
      toastr.success("کالا به سبد افزوده شد");
      $('.modal').modal('hide');
    }

    //private methods
    function hasItem(itm) {
      return ftry.items.find(function (one) {
        return one._id == itm._id;
      });
    }
  }
})();

