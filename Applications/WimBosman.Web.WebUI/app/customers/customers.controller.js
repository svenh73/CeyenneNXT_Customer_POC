var app;
(function (app) {
    var customers;
    (function (customers) {
        'use strict';
        var CustomersController = (function () {
            function CustomersController($routeParams, $location, $scope, customerService, pageService) {
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.$scope = $scope;
                this.customerService = customerService;
                this.pageService = pageService;
                this.filter = {};
                this.pageSizes = app.Constants.PageSizes;
                this.pages = [];
                this.pageService.title = 'Customers';
                this.filter.pageNumber = 1;
                this.filter.pageSize = app.Constants.DefaultPageSize;
                this.searchDebounce = app.Constants.SearchOrderDebauceValue;
                /*Disabled for now. First Version will be with button for search. Because there are issues that must be resolved
                for the autosearch to run properly*/
                //var watchExpressions = [
                //    () => { return this.filter.company },
                //    () => { return this.filter.email },
                //    () => { return this.filter.name },
                //    () => { return this.filter.phone },
                //]
                //$scope.$watchGroup(watchExpressions, (newValues, oldValues) => {
                //    if (JSON.stringify(newValues) != JSON.stringify(oldValues)) {
                //        this.search();
                //    }
                //});
                this.newSearch();
            }
            CustomersController.prototype.search = function () {
                var _this = this;
                this.customerService.search(this.filter)
                    .then(function (result) {
                    _this.result = result;
                    _this.calculatePages();
                });
            };
            CustomersController.prototype.changePage = function (page) {
                if (page === this.result.pageNumber) {
                    return;
                }
                this.filter.pageNumber = page;
                this.search();
            };
            CustomersController.prototype.newSearch = function () {
                this.filter.pageNumber = 1;
                this.search();
            };
            CustomersController.prototype.openCustomer = function (id) {
                this.$location.path('/customer-details/' + id);
            };
            CustomersController.prototype.calculatePages = function () {
                this.pages = [];
                var counter = 1;
                var restRows = this.result.totalRows;
                do {
                    this.pages.push(counter);
                    counter++;
                    restRows -= this.result.pageSize;
                } while (restRows > 0);
            };
            return CustomersController;
        }());
        customers.CustomersController = CustomersController;
        controller.$inject = [
            '$routeParams',
            '$location',
            '$scope',
            'app.services.CustomerService',
            'app.services.PageService'
        ];
        function controller($routeParams, $location, $scope, customerService, pageService) {
            return new CustomersController($routeParams, $location, $scope, customerService, pageService);
        }
        ;
        angular.module('app.customers')
            .controller('app.customers.CustomersController', controller);
    })(customers = app.customers || (app.customers = {}));
})(app || (app = {}));
//# sourceMappingURL=customers.controller.js.map