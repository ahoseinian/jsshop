(function () {
  'use strict';

  angular
    .module('panelApp.purchase')
    .factory('purchaseService', purchaseService);

  purchaseService.$inject = ['$http'];

  function purchaseService($http) {
    var BASE_URL = '/panel/purchases/';

    function Purchase(atrs) {
      if (!(this instanceof Purchase)) return new Purchase(atrs);
      $.extend(this, atrs);
    };

    Purchase.prototype.$setStatus = function (status) {
      var _this = this;
      return $http.put(BASE_URL + this._id, {
        status: status
      }).success(function (res) {
        _this.status = res.status;
      });
    }

    var ftry = {
      find: find,
    };

    return ftry;

    function find() {
      return $http.get(BASE_URL).success(function (res) {
        ftry.items = res.map(Purchase);
      });
    }

  }
})();

