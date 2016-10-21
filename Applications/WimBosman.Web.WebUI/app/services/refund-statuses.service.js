var app;
(function (app) {
    var services;
    (function (services) {
        var RefundStatusesService = (function () {
            function RefundStatusesService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            RefundStatusesService.prototype.getByRefundID = function (refundID) {
                var _this = this;
                return this.$http.get('/api/refundStatuses/getByRefundID/' + refundID)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            RefundStatusesService.prototype.create = function (refundStatusHistory) {
                var _this = this;
                return this.$http.post('/api/refundStatuses', refundStatusHistory)
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return RefundStatusesService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new RefundStatusesService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.RefundStatusesService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=refund-statuses.service.js.map