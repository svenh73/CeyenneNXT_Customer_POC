module app.customers {
    'use strict'


    interface IRouteParams extends ng.route.IRouteParamsService {

    }

    export class CustomersController {
        private filter: CeyenneNXT.Orders.ApiContracts.Models.CustomerPagingFilter = <any>{};
        private result: CeyenneNXT.Orders.ApiContracts.Models.SearchResult<CeyenneNXT.Orders.ApiContracts.Models.CustomerSearchResult>;
        private searchDebounce: number;

        private pageSizes = app.Constants.PageSizes;
        private pages: number[] = [];

        constructor(
            private $routeParams: IRouteParams,
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private customerService: app.services.ICustomerService,
            private pageService: app.services.IPageService
        ) {
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

        search() {
            this.customerService.search(this.filter)
                .then((result) => {
                    this.result = result;
                    this.calculatePages();
                });
        }

        changePage(page: number) {
            if (page === this.result.pageNumber) {
                return;
            }
            this.filter.pageNumber = page;
            this.search();
        }

        newSearch() {
            this.filter.pageNumber = 1;
            this.search();
        }

        openCustomer(id: number): void {
            this.$location.path('/customer-details/' + id);
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
        '$routeParams',
        '$location',
        '$scope',
        'app.services.CustomerService',
        'app.services.PageService'
    ];

    function controller($routeParams, $location, $scope, customerService, pageService): CustomersController {
        return new CustomersController($routeParams, $location, $scope, customerService, pageService);
    };

    angular.module('app.customers')
        .controller('app.customers.CustomersController', controller);
}