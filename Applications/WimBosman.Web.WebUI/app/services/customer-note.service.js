var app;
(function (app) {
    var services;
    (function (services) {
        var CustomerNoteService = (function () {
            function CustomerNoteService($http, $q, responseErrorHandlerService) {
                this.$http = $http;
                this.$q = $q;
                this.responseErrorHandlerService = responseErrorHandlerService;
            }
            CustomerNoteService.prototype.search = function (customerID) {
                var _this = this;
                return this.$http.get('/api/customerNotes/search/' + customerID)
                    .then(function (result) {
                    return result.data;
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            CustomerNoteService.prototype.create = function (note) {
                var _this = this;
                return this.$http.post('/api/customerNotes', note)
                    .then(function (result) {
                }, function (response) {
                    _this.responseErrorHandlerService.handleResponseError(response);
                    return _this.$q.reject(response);
                });
            };
            return CustomerNoteService;
        }());
        factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];
        function factory($http, $q, responseErrorHandlerService) {
            return new CustomerNoteService($http, $q, responseErrorHandlerService);
        }
        angular
            .module('app.services')
            .factory('app.services.CustomerNoteService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=customer-note.service.js.map