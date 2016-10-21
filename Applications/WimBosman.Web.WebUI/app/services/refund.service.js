var app;
(function (app) {
    var services;
    (function (services) {
        var RefundService = (function () {
            function RefundService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            RefundService.prototype.search = function (filter) {
                var _this = this;
                return this.$http.get('/api/refunds/search', { params: filter })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundService.prototype.getByOrderID = function (id) {
                var _this = this;
                return this.$http.get('/api/refunds/getByOrderID/' + id)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundService.prototype.getRefundStatuses = function () {
                var _this = this;
                return this.$http.get('/api/refunds/GetRefundStatuses')
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundService.prototype.getReturnCodes = function () {
                var _this = this;
                return this.$http.get('/api/refunds/GetReturnCodes')
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundService.prototype.getPaymentMethods = function () {
                var _this = this;
                return this.$http.get('/api/refunds/getPaymentMethods')
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundService.prototype.create = function (refund) {
                var _this = this;
                return this.$http.post('/api/refunds', refund)
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundService.prototype.update = function (refund) {
                var _this = this;
                return this.$http.put('/api/refunds/update', refund)
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return RefundService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new RefundService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.RefundService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=refund.service.js.map