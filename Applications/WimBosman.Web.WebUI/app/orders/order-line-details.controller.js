var app;
(function (app) {
    var orders;
    (function (orders) {
        'use strict';
        var OrderLineDetailsController = (function () {
            function OrderLineDetailsController($routeParams, $location, toastr, orderLineService, productService) {
                var _this = this;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.toastr = toastr;
                this.orderLineService = orderLineService;
                this.productService = productService;
                this.orderLineID = $routeParams.orderLineId;
                this.orderLineService.getAllStatuses()
                    .then(function (statuses) {
                    _this.allOrderLineStatuses = statuses;
                });
                this.refreshOrderLine();
            }
            OrderLineDetailsController.prototype.changeStatus = function (code) {
                var _this = this;
                var isDataValid = this.validateChangeStatusData(code);
                if (isDataValid) {
                    var orderLineHistoryUpdate;
                    orderLineHistoryUpdate = {
                        orderLineID: this.orderLine.id,
                        statusCode: code,
                        quantityChanged: this.orderLineStatusQuantityChanged,
                        timestamp: undefined,
                        message: undefined
                    };
                    this.orderLineService.createStatusHistory(orderLineHistoryUpdate)
                        .then(function () {
                        _this.refreshOrderLine();
                        _this.orderLineStatusQuantityChanged = undefined;
                    });
                }
            };
            ;
            OrderLineDetailsController.prototype.processOrderLineHistoryChange = function () {
                this.orderLine.statusHistories.sort(function (n1, n2) { return (new Date(n2.timestamp)).getTime() - (new Date(n1.timestamp)).getTime(); });
            };
            OrderLineDetailsController.prototype.openProduct = function (externalProductIdentifier) {
                this.$location.path('/product-details/' + externalProductIdentifier);
            };
            OrderLineDetailsController.prototype.validateChangeStatusData = function (statusCode) {
                var choosenStatus = this.getStatusByCode(statusCode);
                if (choosenStatus.quantityRequired && this.orderLineStatusQuantityChanged == null) {
                    this.toastr.error("To change to status " + choosenStatus.name + " a valid quantity must be entered.");
                    return false;
                }
                var isQuantityNumber = this.isNumeric(this.orderLineStatusQuantityChanged);
                if (isQuantityNumber &&
                    this.orderLineStatusQuantityChanged < app.Constants.OrderLineStatusQuantityChangeMaxValue &&
                    this.orderLineStatusQuantityChanged > 0) {
                    return true;
                }
                else {
                    this.toastr.error("Status change quantity must be a valid number between 1 and " + app.Constants.OrderLineStatusQuantityChangeMaxValue + ".");
                    return false;
                }
            };
            OrderLineDetailsController.prototype.getStatusByCode = function (code) {
                var _this = this;
                if (!this.codeStatusRelation) {
                    this.codeStatusRelation = {};
                    this.allOrderLineStatuses.forEach(function (item) {
                        _this.codeStatusRelation[item.code] = item;
                    });
                }
                return this.codeStatusRelation[code];
            };
            OrderLineDetailsController.prototype.isNumeric = function (input) {
                return !isNaN(input);
            };
            OrderLineDetailsController.prototype.refreshOrderLine = function () {
                var _this = this;
                this.orderLineService.getOrderLineById(this.$routeParams.orderLineId)
                    .then(function (orderLine) {
                    _this.orderLine = orderLine;
                    _this.orderLineLoaded = !!orderLine;
                    if (orderLine) {
                        _this.processOrderLineHistoryChange();
                        if (!_this.productDescription) {
                            _this.productService.getProductByExternalProductIdentifier(_this.orderLine.externalProductIdentifier)
                                .then(function (result) {
                                if (result) {
                                    _this.orderLine.productDescription = _this.productDescription = result.name;
                                }
                            });
                        }
                    }
                });
            };
            return OrderLineDetailsController;
        }());
        orders.OrderLineDetailsController = OrderLineDetailsController;
        controller.$inject = [
            '$routeParams',
            '$location',
            'toastr',
            'app.services.OrderLineService',
            'app.services.ProductService',
        ];
        function controller($routeParams, $location, toastr, orderLineService, productService) {
            return new OrderLineDetailsController($routeParams, $location, toastr, orderLineService, productService);
        }
        ;
        angular.module('app.orders')
            .controller('app.orders.OrderLineDetailsController', controller);
    })(orders = app.orders || (app.orders = {}));
})(app || (app = {}));
//# sourceMappingURL=order-line-details.controller.js.map