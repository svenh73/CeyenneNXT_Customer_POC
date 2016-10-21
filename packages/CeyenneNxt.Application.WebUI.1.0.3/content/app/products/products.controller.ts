module app.products {
    'use strict'
    import ProductPagingFilter = CeyenneNXT.Products.ApiContracts.Models.ProductPagingFilter;
    import ProductSearchResult = CeyenneNXT.Products.ApiContracts.Models.ProductSearchResult;
    import SearchResult = CeyenneNXT.Products.ApiContracts.Models.SearchResult;

    export class ProductsController {
        private filter: ProductPagingFilter = <any>{};
        private result: SearchResult<ProductSearchResult>;
        private pageSizes = app.Constants.PageSizes;
        private pages: number[] = [];
        private searchDebounce: number = app.Constants.SearchOrderDebauceValue;

        constructor(
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private productService: app.services.IProductService,
            private pageService: app.services.IPageService
        ) {
            this.pageService.title = 'Products';
            this.filter.pageNumber = 1;
            this.filter.pageSize = app.Constants.DefaultPageSize;

            /*Disabled for now. First Version will be with button for search. Because there are issues that must be resolved
            for the autosearch to run properly*/
            //var watchExpressions = [
            //    () => { return this.filter.nameOrSKU }
            //]

            //$scope.$watchGroup(watchExpressions, (newValues, oldValues) => {
            //    if (JSON.stringify(newValues) != JSON.stringify(oldValues)) {
            //        this.search();
            //    }
            //});

            this.newSearch();
        }

        search() {
            this.productService.search(this.filter)
                .then((result) => {
                    this.result = result;
                    this.calculatePages();
                });
        }

        newSearch() {
            this.filter.pageNumber = 1;
            this.search();
        }

        changePage(page: number) {
            if (page === this.result.pageNumber) {
                return;
            }
            this.filter.pageNumber = page;
            this.search();
        }

        openProduct(sku: string): void {
            this.$location.path('/product-details/' + sku);
        }

        private calculatePages() {
            this.pages = [];
            var counter: number = 1;
            var restRows: number = this.result.totalRows;
            do {
                this.pages.push(counter);
                counter++;
                restRows -= this.result.pageSize;
            } while (restRows > 0);
        }
    }

    controller.$inject = [
        '$scope',
        '$location',
        'app.services.ProductService',
        'app.services.PageService'
    ];

    function controller($scope, $location, productService, pageService): ProductsController {
        return new ProductsController($scope, $location, productService, pageService);
    };

    angular.module('app.products')
        .controller('app.products.ProductsController', controller);
}