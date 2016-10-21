var app;
(function (app) {
    var services;
    (function (services) {
        var ResponseErrorHandlerService = (function () {
            function ResponseErrorHandlerService(toastr) {
                this.toastr = toastr;
            }
            ResponseErrorHandlerService.prototype.handleResponseError = function (response) {
                if (response.status == 500) {
                    this.displayResponseMessageOrDefault(response, "An error has occured.");
                }
                else if (response.status == 400) {
                    this.displayResponseMessageOrDefault(response, "Invalid request.");
                }
                else {
                    //Error for not implemented statuses
                    this.displayResponseMessageOrDefault(response, "An error has occured");
                }
            };
            ResponseErrorHandlerService.prototype.displayResponseMessageOrDefault = function (response, defaultMessage) {
                var messageToDisplay = response.data && response.data.message ?
                    response.data.message :
                    defaultMessage;
                this.toastr.error(messageToDisplay);
            };
            return ResponseErrorHandlerService;
        }());
        factory.$inject = ['toastr'];
        function factory(toastr) {
            return new ResponseErrorHandlerService(toastr);
        }
        angular
            .module('app.services')
            .factory('app.services.ResponseErrorHandlerService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=responseErrorHandler.service.js.map