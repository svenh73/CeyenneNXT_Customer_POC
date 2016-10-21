var app;
(function (app) {
    var services;
    (function (services) {
        var OrderRemarkService = (function () {
            function OrderRemarkService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            OrderRemarkService.prototype.create = function (orderRemark) {
                var _this = this;
                return this.$http.post('/api/orderRemarks', orderRemark)
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderRemarkService.prototype.getByOrderId = function (orderId) {
                var _this = this;
                return this.$http.get('/api/orderRemarks/getByOrderId', { params: { orderId: orderId } })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return OrderRemarkService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new OrderRemarkService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.OrderRemarkService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=order-remarks.service.js.map