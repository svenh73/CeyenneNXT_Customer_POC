module app.services {

    import Stock = CeyenneNXT.Stock.WebAPI.Models.Stock;
    import StockListGetParameters = CeyenneNXT.Stock.WebAPI.Models.StockListGetParameters;

    export interface IStockService {
        getStockListByParams(parameters: StockListGetParameters): ng.IPromise<Stock[]>;
    }

    class StockService implements IStockService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        getStockListByParams(parameters: StockListGetParameters): ng.IPromise<Stock[]> {
            return this.$http.get(app.Constants.StockApiBase + '/api/stock/getStockListByParams', { params: parameters })
                .then((result: ng.IHttpPromiseCallbackArg<Stock[]>): Stock[] => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IStockService {
        return new StockService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.StockService',
        factory);
}