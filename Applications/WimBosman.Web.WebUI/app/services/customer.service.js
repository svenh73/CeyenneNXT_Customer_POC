var app;
(function (app) {
    var services;
    (function (services) {
        var CustomerService = (function () {
            function CustomerService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            CustomerService.prototype.search = function (filter) {
                var _this = this;
                return this.$http.get('/api/customers/search', { params: filter })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            CustomerService.prototype.getCustomerById = function (customerId) {
                var _this = this;
                return this.$http.get('/api/customers/' + customerId)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return CustomerService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new CustomerService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.CustomerService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=customer.service.js.map