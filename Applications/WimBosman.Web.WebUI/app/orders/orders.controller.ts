module app.orders {
    'use strict'
    import OrderPagingFilter = CeyenneNXT.Orders.ApiContracts.Models.OrderPagingFilter;
    import OrderSearchResult = CeyenneNXT.Orders.ApiContracts.Models.OrderSearchResult;
    import SearchResult = CeyenneNXT.Orders.ApiContracts.Models.SearchResult;

    interface IRouteParams extends ng.route.IRouteParamsService {
        backendId?: string;
        orderStatus?: string;
    }

    export class OrdersController {
        private filter: OrderPagingFilter = <any>{};
        private result: SearchResult<OrderSearchResult>;
        private statusesSelect: CeyenneNXT.Orders.ApiContracts.Models.OrderStatus[];
        private types: CeyenneNXT.Orders.ApiContracts.Models.OrderType[];
        private searchDebounce: number;

        //TODO: channels must be retrieved from database in the future. 
        //For now they are hard-coded(discussed with Arie)
        private channels = ['B2B', 'B2C', 'B2P'];

        private pageSizes = app.Constants.PageSizes;
        private pages: number[] = [];

        constructor(
            private $routeParams: IRouteParams,
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private $scope: ng.IScope,
            private orderService: app.services.IOrderService,
            private orderStatusService: app.services.IOrderStatusService,
            private pageService: app.services.IPageService
        ) {
            this.pageService.title = 'Orders';
            this.searchDebounce = app.Constants.SearchOrderDebauceValue;

            this.orderStatusService.getAllStatuses()
                .then((orderStatuses) => {
                    this.statusesSelect = orderStatuses;
                });

            this.orderService.getAllTypes()
                .then((types) => {
                    this.types = types;
                });

            this.filter.pageNumber = 1;
            this.filter.pageSize = app.Constants.DefaultPageSize;
            if (this.$routeParams.backendId != null) {
                this.filter.backendId = this.$routeParams.backendId;
            }
            if (this.$routeParams.orderStatus != null) {
                this.filter.orderStatus = this.$routeParams.orderStatus;
            }

            /*Disabled for now. First Version will be with button for search. Because there are issues that must be resolved
            for the autosearch to run properly*/
            //var watchExpressions = [
            //    () => { return this.filter.backendId },
            //    () => { return this.filter.channel },
            //    () => { return this.filter.orderStatus },
            //    () => { return this.filter.typeID },
            //    () => { return this.filter.customerBackendIDOrName }
            //]
            
            //$scope.$watchGroup(watchExpressions, (newValues, oldValues) => {
            //    if (JSON.stringify(newValues) != JSON.stringify(oldValues)) {
            //        this.search();
            //    }
            //});

            this.newSearch();
        }

        search() {
            this.orderService.search(this.filter)
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

        openOrder(id: number): void {
            this.$location.path('/orders-details/' + id).search('orderStatus', null).search('backendId', null);
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
        '$timeout',
        '$scope',
        'app.services.OrderService',
        'app.services.OrderStatusService',
        'app.services.PageService'
    ];

    function controller($routeParams, $location, $timeout, $scope, orderService, orderStatusService, pageService): OrdersController {
        return new OrdersController($routeParams, $location, $timeout, $scope, orderService, orderStatusService, pageService);
    };

    angular.module('app.orders')
        .controller('app.orders.OrdersController', controller);
}