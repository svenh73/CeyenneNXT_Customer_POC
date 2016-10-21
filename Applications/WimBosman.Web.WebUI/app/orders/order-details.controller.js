var app;
(function (app) {
    var orders;
    (function (orders) {
        'use strict';
        var OrderDetailsController = (function () {
            function OrderDetailsController($routeParams, $location, orderService, orderRemarkService, orderStatusService, $uibModal, productService, orderNoteService, pageService, refundService, toastr) {
                var _this = this;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.orderService = orderService;
                this.orderRemarkService = orderRemarkService;
                this.orderStatusService = orderStatusService;
                this.$uibModal = $uibModal;
                this.productService = productService;
                this.orderNoteService = orderNoteService;
                this.pageService = pageService;
                this.refundService = refundService;
                this.toastr = toastr;
                this.notes = [];
                this.newNote = {};
                this.refund = {
                    returnCodeID: null,
                    paymentMethod: 'Buckaroo'
                };
                this.returnCodes = [{ id: null, name: "Not selected" }];
                this.orderID = $routeParams.orderId;
                this.pageService.title = 'Order Details';
                this.newNote.orderID = $routeParams.orderId;
                this.orderNoteService.search($routeParams.orderId)
                    .then(function (notes) {
                    _this.notes = notes;
                });
                //We should get all statuses before order loading because 
                //we need them to filter the possible statuses for change
                this.orderStatusService.getAllStatuses()
                    .then(function (orderStatuses) {
                    _this.allOrderStatuses = orderStatuses;
                });
                this.orderService.getOrderById($routeParams.orderId)
                    .then(function (order) {
                    _this.order = order;
                    _this.orderLoaded = !!order;
                    if (order) {
                        _this.processOrderHistoryChange();
                        _this.attachOrderLinesDescription(_this.order.orderLines);
                    }
                });
                this.refundService.getReturnCodes()
                    .then(function (returnCodes) {
                    _this.returnCodes = _this.returnCodes.concat(returnCodes);
                });
                this.refundService.getPaymentMethods()
                    .then(function (paymentMethods) {
                    _this.paymentMethods = paymentMethods;
                    for (var i = 0; i < paymentMethods.length; i++) {
                        if (paymentMethods[i].name == app.Constants.BuckarooPaymentMethod) {
                            _this.refund.paymentMethodID = paymentMethods[i].id;
                            _this.buckarooPaymentMethodID = paymentMethods[i].id;
                            break;
                        }
                    }
                });
            }
            OrderDetailsController.prototype.createNote = function () {
                var _this = this;
                this.orderNoteService.create(this.newNote)
                    .then(function () {
                    _this.newNote.subject = '';
                    _this.newNote.details = '';
                    _this.orderNoteService.search(_this.order.id)
                        .then(function (notes) {
                        _this.notes = notes;
                    });
                });
            };
            OrderDetailsController.prototype.loadRemarks = function () {
                var _this = this;
                this.orderRemarkService.getByOrderId(this.$routeParams.orderId)
                    .then(function (orderRemarks) {
                    _this.orderRemarks = orderRemarks;
                });
            };
            OrderDetailsController.prototype.createOrderRemark = function () {
                var _this = this;
                this.orderRemark.orderId = this.$routeParams.orderId;
                this.orderRemarkService.create(this.orderRemark)
                    .then(function () {
                    _this.orderRemark = {};
                    _this.loadRemarks();
                });
            };
            OrderDetailsController.prototype.changeHoldOrder = function () {
                var _this = this;
                var orderHoldUpdate;
                orderHoldUpdate = {
                    orderID: this.order.id,
                    hold: !this.order.holdOrder
                };
                this.orderService.changeHoldOrder(orderHoldUpdate).then(function () {
                    _this.order.holdOrder = !_this.order.holdOrder;
                });
            };
            OrderDetailsController.prototype.changeStatus = function (code) {
                var _this = this;
                var orderHistoryUpdate;
                orderHistoryUpdate = {
                    orderID: this.order.id,
                    statusCode: code,
                    timestamp: undefined
                };
                this.orderStatusService.changeStatus(orderHistoryUpdate)
                    .then(function () {
                    _this.orderStatusService.getStatusHistory(_this.order.id)
                        .then(function (history) {
                        _this.order.history = history;
                        _this.processOrderHistoryChange();
                    });
                });
            };
            ;
            OrderDetailsController.prototype.processOrderHistoryChange = function () {
                var _this = this;
                this.order.history.sort(function (n1, n2) { return (new Date(n2.timestamp)).getTime() - (new Date(n1.timestamp)).getTime(); });
                this.possibleOrderStatuses = this.allOrderStatuses
                    .filter(function (orderStatus) {
                    return _this.order.history.every(function (h) { return h.status.code !== orderStatus.code; });
                });
            };
            OrderDetailsController.prototype.openOrderLine = function (orderLineId) {
                this.$location.path('/order-line-details/' + orderLineId);
            };
            OrderDetailsController.prototype.openProduct = function (externalProductIdentifier) {
                this.$location.path('/product-details/' + externalProductIdentifier);
            };
            OrderDetailsController.prototype.createRefund = function () {
                var _this = this;
                this.refund.orderID = this.order.id;
                this.refundService.create(this.refund).then(function () {
                    _this.toastr.success("Refund created!");
                });
                this.refund = {
                    returnCodeID: null,
                    paymentMethodID: this.buckarooPaymentMethodID
                };
            };
            OrderDetailsController.prototype.openCustomer = function (customerId) {
                this.$location.path('/customer-details/' + customerId);
            };
            OrderDetailsController.prototype.attachOrderLinesDescription = function (orderLines) {
                var _this = this;
                //ToDo: make it with bulk load
                orderLines.forEach(function (item) {
                    _this.productService.getProductByExternalProductIdentifier(item.externalProductIdentifier)
                        .then(function (result) {
                        if (result) {
                            item.productDescription = result.name;
                        }
                    });
                });
            };
            return OrderDetailsController;
        }());
        orders.OrderDetailsController = OrderDetailsController;
        controller.$inject = [
            '$routeParams',
            '$location',
            'app.services.OrderService',
            'app.services.OrderRemarkService',
            'app.services.OrderStatusService',
            '$uibModal',
            'app.services.ProductService',
            'app.services.OrderNoteService',
            'app.services.PageService',
            'app.services.RefundService',
            'toastr'
        ];
        function controller($routeParams, $location, orderService, orderRemarkService, orderStatusService, $uibModal, productService, orderNoteService, pageService, refundService, toastr) {
            return new OrderDetailsController($routeParams, $location, orderService, orderRemarkService, orderStatusService, $uibModal, productService, orderNoteService, pageService, refundService, toastr);
        }
        ;
        angular.module('app.orders')
            .controller('app.orders.OrderDetailsController', controller);
    })(orders = app.orders || (app.orders = {}));
})(app || (app = {}));
//# sourceMappingURL=order-details.controller.js.map