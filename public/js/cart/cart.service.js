(function () {
  'use strict';

  angular
    .module('app.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http', '$localStorage'];

  function cartService($http, $localStorage) {
    function CartItem(data) {
      $.extend(this, data);
      this.quantity = 1;
      this._product = this._id;
    }

    CartItem.prototype.$remove = function () {
      var _this = this;
      ftry.storage.items = ftry.storage.items.filter(notEqual);
      ftry.items = ftry.items.filter(notEqual);

      function notEqual(item) {
        return _this._id !== item._id;
      }
    }

    var ftry = {
      storage: $localStorage.$default({
        items: []
      }),
      getNew: getNew,
      items: $localStorage.items.map(getNew),
      add: add,
      getTotal: getTotal,
      drop: drop,
      doTransaction: doTransaction,
    };
    return ftry;

    function getNew(data) {
      return new CartItem(data);
    }

    function add(itm) {
      //remove unnecessary properties
      var item = {
        _id: itm._id,
        name: itm.name,
        price: itm.price,
        remaining: itm.remaining,
      };

      if (hasItem(item)) {
        toastr.warning("کالا در سبد موجود میباشد");
        return false;
      }
      ftry.storage.items.push(item);
      ftry.items.push(getNew(item));
      toastr.success("کالا به سبد افزوده شد");
    }

    function getTotal() {
      return ftry.items.reduce(function (a, b) {
        return a + (b.quantity * b.price);
      }, 0)
    }

    function drop() {
      ftry.storage.items = [];
      ftry.items = [];
      toastr.success("سبد خرید خالی شد");
    }

    function doTransaction(data) {
      return $http.post('/api/purchases/', data).success(function (res) {
        //evacuate cart after successful purchase
        ftry.drop();
      });
    }

    //private methods
    function hasItem(itm) {
      return ftry.storage.items.find(function (one) {
        return one._id == itm._id;
      });
    }

  }
})();

