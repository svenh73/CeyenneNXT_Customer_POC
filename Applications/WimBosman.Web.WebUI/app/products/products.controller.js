var app;
(function (app) {
    var products;
    (function (products) {
        'use strict';
        var ProductsController = (function () {
            function ProductsController($scope, $location, productService, pageService) {
                this.$scope = $scope;
                this.$location = $location;
                this.productService = productService;
                this.pageService = pageService;
                this.filter = {};
                this.pageSizes = app.Constants.PageSizes;
                this.pages = [];
                this.searchDebounce = app.Constants.SearchOrderDebauceValue;
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
            ProductsController.prototype.search = function () {
                var _this = this;
                this.productService.search(this.filter)
                    .then(function (result) {
                    _this.result = result;
                    _this.calculatePages();
                });
            };
            ProductsController.prototype.newSearch = function () {
                this.filter.pageNumber = 1;
                this.search();
            };
            ProductsController.prototype.changePage = function (page) {
                if (page === this.result.pageNumber) {
                    return;
                }
                this.filter.pageNumber = page;
                this.search();
            };
            ProductsController.prototype.openProduct = function (sku) {
                this.$location.path('/product-details/' + sku);
            };
            ProductsController.prototype.calculatePages = function () {
                this.pages = [];
                var counter = 1;
                var restRows = this.result.totalRows;
                do {
                    this.pages.push(counter);
                    counter++;
                    restRows -= this.result.pageSize;
                } while (restRows > 0);
            };
            return ProductsController;
        }());
        products.ProductsController = ProductsController;
        controller.$inject = [
            '$scope',
            '$location',
            'app.services.ProductService',
            'app.services.PageService'
        ];
        function controller($scope, $location, productService, pageService) {
            return new ProductsController($scope, $location, productService, pageService);
        }
        ;
        angular.module('app.products')
            .controller('app.products.ProductsController', controller);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
//# sourceMappingURL=products.controller.js.map