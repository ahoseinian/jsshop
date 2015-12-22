(function () {
  'use strict';

  angular
    .module('app.cart')
    .factory('cartService', cartService);

  cartService.$inject = ['$http'];

  function cartService($http) {
    var ftry = {
      items: [],
      add,
      getTotal,
      drop,
    };
    return ftry;

    function add(itm) {
      if (hasItem(itm)){
        toastr.warning("کالا در سبد موجود میباشد");
        return false;
      }
      ftry.items.push(itm);
      toastr.success("کالا به سبد افزوده شد");
    }

    function getTotal(){
      return ftry.items.reduce(function(a, b){
        return a + b.price;
      },0)
    }

    function drop(){
      ftry.items = [];
      toastr.success("سبد خرید خالی شد");
    }

    //private methods
    function hasItem(itm) {
      return ftry.items.find(function (one) {
        return one._id == itm._id;
      });
    }


  }
})();

