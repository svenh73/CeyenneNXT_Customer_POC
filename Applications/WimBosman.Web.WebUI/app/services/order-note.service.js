var app;
(function (app) {
    var services;
    (function (services) {
        var OrderNoteService = (function () {
            function OrderNoteService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            OrderNoteService.prototype.search = function (orderID) {
                var _this = this;
                return this.$http.get('/api/orderNotes/search/' + orderID)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            OrderNoteService.prototype.create = function (note) {
                var _this = this;
                return this.$http.post('/api/orderNotes', note)
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return OrderNoteService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new OrderNoteService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.OrderNoteService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=order-note.service.js.map