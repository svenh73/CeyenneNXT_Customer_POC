var app;
(function (app) {
    var services;
    (function (services) {
        var StockService = (function () {
            function StockService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            StockService.prototype.getStockListByParams = function (parameters) {
                var _this = this;
                return this.$http.get(app.Constants.StockApiBase + '/api/stock/getStockListByParams', { params: parameters })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return StockService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new StockService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.StockService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=stock.service.js.map