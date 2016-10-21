module app.services {
    import OrderLine = CeyenneNXT.Orders.ApiContracts.Models.OrderLine;
    import Status = CeyenneNXT.Orders.ApiContracts.Models.OrderLineStatus;
    import StatusHistory = CeyenneNXT.Orders.ApiContracts.Models.OrderLineStatusHistory;
    import OrderLineHistoryUpdate = CeyenneNXT.Orders.ApiContracts.Communication.Messages.OrderLineHistoryUpdate;

    export interface IOrderLineService {
        getOrderLineById(orderLineId: number): ng.IPromise<OrderLine>;
        getAllStatuses(): ng.IPromise<Status[]>;
        createStatusHistory(model: OrderLineHistoryUpdate): ng.IPromise<void>;
        getStatusHistory(orderLineId: number): ng.IPromise<StatusHistory[]>;
    }

    class OrderLineService implements IOrderLineService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        getOrderLineById(orderLineId: number): ng.IPromise<OrderLine> {
            return this.$http.get('/api/orderlines/' + orderLineId)
                .then((result: ng.IHttpPromiseCallbackArg<OrderLine>): OrderLine => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getAllStatuses(): ng.IPromise<Status[]> {
            return this.$http.get('/api/orderlines/getAllStatuses')
                .then((result: ng.IHttpPromiseCallbackArg<Status[]>): Status[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        createStatusHistory(model: OrderLineHistoryUpdate): ng.IPromise<void> {
            return this.$http.post('/api/orderlines/createStatusHistory/?generateTimestamp=true', JSON.stringify(model))
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getStatusHistory(orderLineId: number): ng.IPromise<StatusHistory[]> {
            return this.$http.get('/api/orderlines/getStatusHistory/' + orderLineId)
                .then((result: ng.IHttpPromiseCallbackArg<StatusHistory[]>): StatusHistory[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): OrderLineService {
        return new OrderLineService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.OrderLineService',
        factory);
}