module app.services {
    import RefundStatus = CeyenneNXT.Orders.ApiContracts.Models.RefundStatus;
    import RefundStatusHistory = CeyenneNXT.Orders.ApiContracts.Models.RefundStatusHistory;

    export interface IRefundStatusesService {
        getByRefundID(refundID: number): ng.IPromise<RefundStatusHistory[]>;
        create(refundStatusHistory: RefundStatusHistory): ng.IPromise<void>;
    }

    class RefundStatusesService implements IRefundStatusesService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        getByRefundID(refundID: number): ng.IPromise<RefundStatusHistory[]> {
            return this.$http.get('/api/refundStatuses/getByRefundID/' + refundID)
                .then((result: ng.IHttpPromiseCallbackArg<RefundStatusHistory[]>): RefundStatusHistory[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        create(refundStatusHistory: RefundStatusHistory): ng.IPromise<void> {
            return this.$http.post('/api/refundStatuses', refundStatusHistory)
                .then((result: ng.IHttpPromiseCallbackArg<any>): void => {
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IRefundStatusesService {
        return new RefundStatusesService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.RefundStatusesService',
        factory);
}