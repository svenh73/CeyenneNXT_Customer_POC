module app.services {
    import Refund = CeyenneNXT.Orders.ApiContracts.Models.Refund;
    import ReturnCode = CeyenneNXT.Orders.ApiContracts.Models.ReturnCode;
    import PaymentMethod = CeyenneNXT.Orders.ApiContracts.Models.PaymentMethod;
    import RefundStatus = CeyenneNXT.Orders.ApiContracts.Models.RefundStatus
    import SearchResult = CeyenneNXT.Orders.ApiContracts.Models.SearchResult;
    import RefundSearchResult = CeyenneNXT.Orders.ApiContracts.Models.RefundSearchResult;
    import RefundPagingFilter = CeyenneNXT.Orders.ApiContracts.Models.RefundPagingFilter;

    export interface IRefundService {
        search(filter: RefundPagingFilter): ng.IPromise<SearchResult<RefundSearchResult>>;
        getByOrderID(id: number): ng.IPromise<Refund[]>;
        create(refund: Refund): ng.IPromise<void>
        update(refund: Refund): ng.IPromise<void>;
        getReturnCodes(): ng.IPromise<ReturnCode[]>;
        getPaymentMethods(): ng.IPromise<PaymentMethod[]>;
        getRefundStatuses(): ng.IPromise<RefundStatus[]>;
    }

    class RefundService implements IRefundService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        search(filter: RefundPagingFilter): ng.IPromise<SearchResult<RefundSearchResult>> {
            return this.$http.get('/api/refunds/search', { params: filter })
                .then((result: ng.IHttpPromiseCallbackArg<SearchResult<RefundSearchResult>>):
                    SearchResult<RefundSearchResult> => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getByOrderID(id: number): ng.IPromise<Refund[]> {
            return this.$http.get('/api/refunds/getByOrderID/' + id)
                .then((result: ng.IHttpPromiseCallbackArg<Refund[]>): Refund[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getRefundStatuses(): ng.IPromise<RefundStatus[]> {
            return this.$http.get('/api/refunds/GetRefundStatuses')
                .then((result: ng.IHttpPromiseCallbackArg<RefundStatus[]>): RefundStatus[] => {
                    return result.data;
                }, (response: ng.IHttpPromiseCallbackArg<any>) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getReturnCodes(): ng.IPromise<ReturnCode[]> {
            return this.$http.get('/api/refunds/GetReturnCodes')
                .then((result: ng.IHttpPromiseCallbackArg<ReturnCode[]>): ReturnCode[] => {
                    return result.data;
                }, (response: ng.IHttpPromiseCallbackArg<any>) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getPaymentMethods(): ng.IPromise<PaymentMethod[]> {
            return this.$http.get('/api/refunds/getPaymentMethods')
                .then((result: ng.IHttpPromiseCallbackArg<PaymentMethod[]>): PaymentMethod[] => {
                    return result.data;
                }, (response: ng.IHttpPromiseCallbackArg<any>) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        create(refund: Refund): ng.IPromise<void> {
            return this.$http.post('/api/refunds', refund)
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        update(refund: Refund): ng.IPromise<void> {
            return this.$http.put('/api/refunds/update', refund)
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IRefundService {
        return new RefundService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.RefundService',
        factory);
}