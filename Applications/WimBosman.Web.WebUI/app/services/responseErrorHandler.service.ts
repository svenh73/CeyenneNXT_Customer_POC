module app.services {
    export interface IResponseErrorHandlerService {
        handleResponseError(response: any): void;
    }

    class ResponseErrorHandlerService implements IResponseErrorHandlerService {

        constructor(
            private toastr: angular.toastr.IToastrService
        ) { }

        handleResponseError(response: any): void {
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
        }

        private displayResponseMessageOrDefault(response: any, defaultMessage: string): void {
            var messageToDisplay = response.data && response.data.message ?
                response.data.message :
                defaultMessage;

            this.toastr.error(messageToDisplay);
        }
    }

    factory.$inject = ['toastr'];

    function factory(toastr): ResponseErrorHandlerService {
        return new ResponseErrorHandlerService(toastr);
    }

    angular
        .module('app.services')
        .factory('app.services.ResponseErrorHandlerService',
        factory);
}