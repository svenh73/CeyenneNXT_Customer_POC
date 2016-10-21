var app;
(function (app) {
    var services;
    (function (services) {
        var OrderStatusService = (function () {
            function OrderStatusService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            OrderStatusService.prototype.getAllStatuses = function () {
                var _this = this;
                return this.$http.get('/api/orderstatus', { cache: true })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            ;
            OrderStatusService.prototype.changeStatus = function (model) {
                var _this = this;
                return this.$http.post('/api/orderstatus/?generateTimestamp=true', JSON.stringify(model))
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            ;
            OrderStatusService.prototype.getStatusHistory = function (orderId) {
                var _this = this;
                return this.$http.get('/api/orderstatus/getStatusHistory/' + orderId)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return OrderStatusService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new OrderStatusService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.OrderStatusService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=order-status.service.js.map