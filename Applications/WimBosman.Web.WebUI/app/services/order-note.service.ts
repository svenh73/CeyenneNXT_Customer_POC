module app.services {
    import OrderNoteSearchResult = CeyenneNXT.Orders.ApiContracts.Models.OrderNoteSearchResult;
    import OrderNote = CeyenneNXT.Orders.ApiContracts.Models.OrderNote;

    export interface IOrderNoteService {
        search(orderID: number): ng.IPromise<OrderNoteSearchResult[]>;
        create(note: OrderNote): ng.IPromise<void>;
    }

    class OrderNoteService implements IOrderNoteService {
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        search(orderID: number): ng.IPromise<OrderNoteSearchResult[]> {
            return this.$http.get('/api/orderNotes/search/' + orderID)
                .then((result: ng.IHttpPromiseCallbackArg<OrderNoteSearchResult[]>): OrderNoteSearchResult[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        create(note: OrderNote): ng.IPromise<void> {
            return this.$http.post('/api/orderNotes', note)
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): OrderNoteService {
        return new OrderNoteService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.OrderNoteService',
        factory);
}