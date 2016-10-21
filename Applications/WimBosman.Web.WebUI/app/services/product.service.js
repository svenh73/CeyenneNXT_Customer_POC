var app;
(function (app) {
    var services;
    (function (services) {
        var ProductService = (function () {
            function ProductService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            ProductService.prototype.getProduct = function (sku) {
                var _this = this;
                return this.$http.get(app.Constants.ProductsApiBase + '/api/product/' + sku)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            ProductService.prototype.getProductByExternalProductIdentifier = function (productId) {
                var _this = this;
                return this.$http.get(app.Constants.ProductsApiBase + '/api/product/getBySKU/' + productId)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            ProductService.prototype.search = function (filter) {
                var _this = this;
                return this.$http.get(app.Constants.ProductsApiBase + '/api/product/search', { params: filter })
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return ProductService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new ProductService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.ProductService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=product.service.js.map