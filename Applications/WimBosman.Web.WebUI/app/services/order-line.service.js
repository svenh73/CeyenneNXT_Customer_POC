var app;
(function (app) {
    var services;
    (function (services) {
        var OrderLineService = (function () {
            function OrderLineService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            OrderLineService.prototype.getOrderLineById = function (orderLineId) {
                var _this = this;
                return this.$http.get('/api/orderlines/' + orderLineId)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderLineService.prototype.getAllStatuses = function () {
                var _this = this;
                return this.$http.get('/api/orderlines/getAllStatuses')
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderLineService.prototype.createStatusHistory = function (model) {
                var _this = this;
                return this.$http.post('/api/orderlines/createStatusHistory/?generateTimestamp=true', JSON.stringify(model))
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderLineService.prototype.getStatusHistory = function (orderLineId) {
                var _this = this;
                return this.$http.get('/api/orderlines/getStatusHistory/' + orderLineId)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return OrderLineService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new OrderLineService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.OrderLineService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=order-line.service.js.map