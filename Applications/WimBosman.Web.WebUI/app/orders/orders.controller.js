var app;
(function (app) {
    var orders;
    (function (orders) {
        'use strict';
        var OrdersController = (function () {
            function OrdersController($routeParams, $location, $timeout, $scope, orderService, orderStatusService, pageService) {
                var _this = this;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.$timeout = $timeout;
                this.$scope = $scope;
                this.orderService = orderService;
                this.orderStatusService = orderStatusService;
                this.pageService = pageService;
                this.filter = {};
                //TODO: channels must be retrieved from database in the future. 
                //For now they are hard-coded(discussed with Arie)
                this.channels = ['B2B', 'B2C', 'B2P'];
                this.pageSizes = app.Constants.PageSizes;
                this.pages = [];
                this.pageService.title = 'Orders';
                this.searchDebounce = app.Constants.SearchOrderDebauceValue;
                this.orderStatusService.getAllStatuses()
                    .then(function (orderStatuses) {
                    _this.statusesSelect = orderStatuses;
                });
                this.orderService.getAllTypes()
                    .then(function (types) {
                    _this.types = types;
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
            OrdersController.prototype.search = function () {
                var _this = this;
                this.orderService.search(this.filter)
                    .then(function (result) {
                    _this.result = result;
                    _this.calculatePages();
                });
            };
            OrdersController.prototype.changePage = function (page) {
                if (page === this.result.pageNumber) {
                    return;
                }
                this.filter.pageNumber = page;
                this.search();
            };
            OrdersController.prototype.newSearch = function () {
                this.filter.pageNumber = 1;
                this.search();
            };
            OrdersController.prototype.openOrder = function (id) {
                this.$location.path('/orders-details/' + id).search('orderStatus', null).search('backendId', null);
            };
            OrdersController.prototype.calculatePages = function () {
                this.pages = [];
                var counter = 1;
                var restRows = this.result.totalRows;
                do {
                    this.pages.push(counter);
                    counter++;
                    restRows -= this.result.pageSize;
                } while (restRows > 0);
            };
            return OrdersController;
        }());
        orders.OrdersController = OrdersController;
        controller.$inject = [
            '$routeParams',
            '$location',
            '$timeout',
            '$scope',
            'app.services.OrderService',
            'app.services.OrderStatusService',
            'app.services.PageService'
        ];
        function controller($routeParams, $location, $timeout, $scope, orderService, orderStatusService, pageService) {
            return new OrdersController($routeParams, $location, $timeout, $scope, orderService, orderStatusService, pageService);
        }
        ;
        angular.module('app.orders')
            .controller('app.orders.OrdersController', controller);
    })(orders = app.orders || (app.orders = {}));
})(app || (app = {}));
//# sourceMappingURL=orders.controller.js.map