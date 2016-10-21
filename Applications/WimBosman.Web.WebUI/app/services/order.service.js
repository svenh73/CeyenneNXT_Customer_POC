var app;
(function (app) {
    var services;
    (function (services) {
        var OrderService = (function () {
            function OrderService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            //create(order: OrderSearchResult): void {
            //    this.$http.post('/api/orders', order);
            //}
            OrderService.prototype.search = function (filter) {
                var _this = this;
                return this.$http.get('/api/orders/search', { params: filter })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderService.prototype.getOrderById = function (orderId) {
                var _this = this;
                return this.$http.get('/api/orders/' + orderId)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderService.prototype.getDashboardData = function () {
                var _this = this;
                return this.$http.get('/api/orders/getDashboardData')
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderService.prototype.changeHoldOrder = function (model) {
                var _this = this;
                return this.$http.put('/api/orders/hold', JSON.stringify(model))
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderService.prototype.getAllTypes = function () {
                var _this = this;
                return this.$http.get('/api/orders/getAllTypes', { cache: true })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return OrderService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new OrderService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.OrderService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=order.service.js.map