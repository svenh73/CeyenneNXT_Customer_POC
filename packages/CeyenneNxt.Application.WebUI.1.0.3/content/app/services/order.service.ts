module app.services {
    import SearchResult = CeyenneNXT.Orders.ApiContracts.Models.SearchResult;
    import OrderSearchResultVM = CeyenneNXT.Orders.ApiContracts.Models.OrderSearchResult;
    import Order = CeyenneNXT.Orders.ApiContracts.Models.Order;
    import OrderPagingFilter = CeyenneNXT.Orders.ApiContracts.Models.OrderPagingFilter;
    import DashboardData = CeyenneNXT.Orders.ApiContracts.Models.DashboardData;
    import OrderHoldUpdate = CeyenneNXT.Orders.ApiContracts.Communication.Messages.OrderHoldUpdate;
    import OrderType = CeyenneNXT.Orders.ApiContracts.Models.OrderType;

    export interface IOrderService {
        search(filter: OrderPagingFilter): ng.IPromise<SearchResult<OrderSearchResultVM>>;
        getOrderById(orderId: number): ng.IPromise<Order>;
        getDashboardData(): ng.IPromise<DashboardData>;
        changeHoldOrder(model: OrderHoldUpdate): ng.IPromise<void>;
        getAllTypes(): ng.IPromise<OrderType[]>;
        //create(order: OrderSearchResult): void;
    }

    class OrderService implements IOrderService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) {}

        //create(order: OrderSearchResult): void {
        //    this.$http.post('/api/orders', order);
        //}

        search(filter: OrderPagingFilter): ng.IPromise<SearchResult<OrderSearchResultVM>> {
            return this.$http.get('/api/orders/search', { params: filter })
                .then((result: ng.IHttpPromiseCallbackArg<SearchResult<OrderSearchResultVM>>):
                    SearchResult<OrderSearchResultVM> => {
                        return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getOrderById(orderId: number): ng.IPromise<Order> {
            return this.$http.get('/api/orders/' + orderId)
                .then((result: ng.IHttpPromiseCallbackArg<Order>): Order => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getDashboardData(): ng.IPromise<DashboardData> {
            return this.$http.get('/api/orders/getDashboardData')
                .then((result: ng.IHttpPromiseCallbackArg<DashboardData>): DashboardData => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        changeHoldOrder(model: OrderHoldUpdate): ng.IPromise<void> {
            return this.$http.put('/api/orders/hold', JSON.stringify(model))
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getAllTypes(): ng.IPromise<OrderType[]> {
            return this.$http.get('/api/orders/getAllTypes', { cache: true })
                .then((result: ng.IHttpPromiseCallbackArg<OrderType[]>): OrderType[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IOrderService {
        return new OrderService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.OrderService',
            factory);
}