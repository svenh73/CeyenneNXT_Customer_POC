module app.services {
    import CustomerNoteSearchResult = CeyenneNXT.Orders.ApiContracts.Models.CustomerNoteSearchResult;
    import CustomerNote = CeyenneNXT.Orders.ApiContracts.Models.CustomerNote;

    export interface ICustomerNoteService {
        search(customerID: number): ng.IPromise<CustomerNoteSearchResult[]>;
        create(note: CustomerNote): ng.IPromise<void>;
    }

    class CustomerNoteService implements ICustomerNoteService {
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        search(customerID: number): ng.IPromise<CustomerNoteSearchResult[]> {
            return this.$http.get('/api/customerNotes/search/' + customerID)
                .then((result: ng.IHttpPromiseCallbackArg<CustomerNoteSearchResult[]>): CustomerNoteSearchResult[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        create(note: CustomerNote): ng.IPromise<void> {
            return this.$http.post('/api/customerNotes', note)
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): CustomerNoteService {
        return new CustomerNoteService($http, $q ,responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.CustomerNoteService',
        factory);
}