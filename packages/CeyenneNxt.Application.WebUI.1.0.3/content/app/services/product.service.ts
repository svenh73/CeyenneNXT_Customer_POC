module app.services {
    import Product = CeyenneNXT.Products.ApiContracts.Models.Product;
    import SearchResult = CeyenneNXT.Products.ApiContracts.Models.SearchResult;
    import ProductSearchResult = CeyenneNXT.Products.ApiContracts.Models.ProductSearchResult;
    import ProductPagingFilter = CeyenneNXT.Products.ApiContracts.Models.ProductPagingFilter;

    export interface IProductService {
        getProduct(sku: string): ng.IPromise<Product>;
        getProductByExternalProductIdentifier(productId: string): ng.IPromise<ProductSearchResult>;
        search(filter: ProductPagingFilter): ng.IPromise<SearchResult<ProductSearchResult>>;
    }

    class ProductService implements IProductService {

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private responseErrorHandlerService: app.services.IResponseErrorHandlerService
        ) { }

        getProduct(sku: string): ng.IPromise<Product> {
            return this.$http.get(app.Constants.ProductsApiBase + '/api/product/' + sku)
                .then((result: ng.IHttpPromiseCallbackArg<Product>): Product => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        getProductByExternalProductIdentifier(productId: string): ng.IPromise<ProductSearchResult> {
            return this.$http.get(app.Constants.ProductsApiBase + '/api/product/getBySKU/' + productId)
                .then((result: ng.IHttpPromiseCallbackArg<ProductSearchResult>): ProductSearchResult => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }

        search(filter: ProductPagingFilter): ng.IPromise<SearchResult<ProductSearchResult>> {
            return this.$http.get(app.Constants.ProductsApiBase + '/api/product/search', { params: filter })
                .then((result: ng.IHttpPromiseCallbackArg<SearchResult<ProductSearchResult>>):
                    SearchResult<ProductSearchResult> => {
                    return result.data;
                }, (response: any) => {
                    this.responseErrorHandlerService.handleResponseError(response);
                    return this.$q.reject(response);
                });
        }
    }

    factory.$inject = ['$http', '$q', 'app.services.ResponseErrorHandlerService'];

    function factory($http, $q, responseErrorHandlerService): IProductService {
        return new ProductService($http, $q, responseErrorHandlerService);
    }

    angular
        .module('app.services')
        .factory('app.services.ProductService',
        factory);
}