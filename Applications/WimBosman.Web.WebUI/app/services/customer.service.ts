module app.services {
    import SearchResult = CeyenneNXT.Orders.ApiContracts.Models.SearchResult;
    import CustomerSearchResult = CeyenneNXT.Orders.ApiContracts.Models.CustomerSearchResult;
    import CustomerPagingFilter = CeyenneNXT.Orders.ApiContracts.Models.CustomerPagingFilter;

    export interface ICustomerService {
        search(filter: CustomerPagingFilter): ng.IPromise<SearchResult<CustomerSearchResult>>;
        getCustomerById(customerId: number): ng.IPromise<CustomerSearchResult>;
    }

    class CustomerService implements ICustomerService {
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        search(filter: CustomerPagingFilter): ng.IPromise<SearchResult<CustomerSearchResult>> {
            return this.$http.get('/api/customers/search', { params: filter })
                .then((result: ng.IHttpPromiseCallbackArg<SearchResult<CustomerSearchResult>>):
                    SearchResult<CustomerSearchResult> => {
                        return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getCustomerById(customerId: number): ng.IPromise<CustomerSearchResult> {
            return this.$http.get('/api/customers/' + customerId)
                .then((result: ng.IHttpPromiseCallbackArg<CustomerSearchResult>): CustomerSearchResult => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): CustomerService {
        return new CustomerService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.CustomerService',
            factory);
}