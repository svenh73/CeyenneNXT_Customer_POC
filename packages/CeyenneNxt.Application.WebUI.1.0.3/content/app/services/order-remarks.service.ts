module app.services {
    import OrderRemark = app.typings.OrderRemark;

    export interface IOrderRemarkService {
        create(orderRemark: OrderRemark): ng.IPromise<void>;
        getByOrderId(orderId: number): ng.IPromise<OrderRemark[]>;
    }

    class OrderRemarkService implements IOrderRemarkService {
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        create(orderRemark: OrderRemark): ng.IPromise<void> {
            return this.$http.post('/api/orderRemarks', orderRemark)
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getByOrderId(orderId: number): ng.IPromise<OrderRemark[]> {
            return this.$http.get('/api/orderRemarks/getByOrderId',
                    { params: { orderId: orderId } })
                .then((result: ng.IHttpPromiseCallbackArg<OrderRemark[]>): OrderRemark[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IOrderRemarkService {
        return new OrderRemarkService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.OrderRemarkService',
            factory);
}