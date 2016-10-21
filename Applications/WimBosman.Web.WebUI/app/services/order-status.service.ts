module app.services {
    import OrderStatus = CeyenneNXT.Orders.ApiContracts.Models.OrderStatus;
    import OrderHistoryUpdate = CeyenneNXT.Orders.ApiContracts.Communication.Messages.OrderHistoryUpdate;
    import OrderStatusHistory = CeyenneNXT.Orders.ApiContracts.Models.OrderStatusHistory;


    export interface IOrderStatusService {
        getAllStatuses(): ng.IPromise<OrderStatus[]>;
        changeStatus(model: OrderHistoryUpdate): ng.IPromise<void>;
        getStatusHistory(orderId: number): ng.IPromise<OrderStatusHistory[]>;
    }

    class OrderStatusService implements IOrderStatusService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        getAllStatuses(): ng.IPromise<OrderStatus[]> {
            return this.$http.get('/api/orderstatus', { cache: true })
                .then((result: ng.IHttpPromiseCallbackArg<OrderStatus[]>): OrderStatus[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        };

        changeStatus(model: OrderHistoryUpdate): ng.IPromise<void> {
            return this.$http.post('/api/orderstatus/?generateTimestamp=true', JSON.stringify(model))
                .then((result: ng.IHttpPromiseCallbackArg<any>): any => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        };

        getStatusHistory(orderId: number): ng.IPromise<OrderStatusHistory[]> {
            return this.$http.get('/api/orderstatus/getStatusHistory/' + orderId)
                .then((result: ng.IHttpPromiseCallbackArg<OrderStatusHistory[]>): OrderStatusHistory[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IOrderStatusService {
        return new OrderStatusService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.OrderStatusService',
        factory);
}