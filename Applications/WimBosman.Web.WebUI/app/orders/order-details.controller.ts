module app.orders {
    'use strict'

    import OrderLine = CeyenneNXT.Orders.ApiContracts.Models.OrderLine;

    interface IRouteParams extends ng.route.IRouteParamsService {
        orderId: number;
    }

    export class OrderDetailsController {
        private order: CeyenneNXT.Orders.ApiContracts.Models.Order;
        private orderRemarks: app.typings.OrderRemark[];
        private orderRemark: app.typings.OrderRemark;
        private possibleOrderStatuses: CeyenneNXT.Orders.ApiContracts.Models.OrderStatus[];
        private allOrderStatuses: CeyenneNXT.Orders.ApiContracts.Models.OrderStatus[];
        private notes: CeyenneNXT.Orders.ApiContracts.Models.OrderNoteSearchResult[] = [];
        private newNote: CeyenneNXT.Orders.ApiContracts.Models.OrderNote = <any>{};
        private orderLoaded: boolean;
        private orderID: number;
        private refund: CeyenneNXT.Orders.ApiContracts.Models.Refund = <any>{
            returnCodeID: null,
            paymentMethod: 'Buckaroo'
        };
        private returnCodes: CeyenneNXT.Orders.ApiContracts.Models.ReturnCode[] = [{ id: null, name: "Not selected" }];
        private paymentMethods: CeyenneNXT.Orders.ApiContracts.Models.PaymentMethod[];
        private buckarooPaymentMethodID: number;

        constructor(
            private $routeParams: IRouteParams,
            private $location: ng.ILocationService,
            private orderService: app.services.IOrderService,
            private orderRemarkService: app.services.IOrderRemarkService,
            private orderStatusService: app.services.IOrderStatusService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private productService: app.services.IProductService,
            private orderNoteService: app.services.IOrderNoteService,
            private pageService: app.services.IPageService,
            private refundService: app.services.IRefundService,
            private toastr: angular.toastr.IToastrService
        ) {
            this.orderID = $routeParams.orderId;
            this.pageService.title = 'Order Details';
            this.newNote.orderID = $routeParams.orderId;
            this.orderNoteService.search($routeParams.orderId)
                .then((notes) => {
                    this.notes = notes;
                });
            //We should get all statuses before order loading because 
            //we need them to filter the possible statuses for change
            this.orderStatusService.getAllStatuses()
                .then((orderStatuses) => {
                    this.allOrderStatuses = orderStatuses;
                });

            this.orderService.getOrderById($routeParams.orderId)
                .then((order) => {
                    this.order = order;
                    this.orderLoaded = !!order

                    if (order) {
                        this.processOrderHistoryChange();
                        this.attachOrderLinesDescription(this.order.orderLines);
                    }
                });


            this.refundService.getReturnCodes()
                .then((returnCodes) => {
                    this.returnCodes = this.returnCodes.concat(returnCodes);
                });
            this.refundService.getPaymentMethods()
                .then((paymentMethods) => {
                    this.paymentMethods = paymentMethods;
                    for (var i = 0; i < paymentMethods.length; i++){
                        if (paymentMethods[i].name == Constants.BuckarooPaymentMethod) {
                            this.refund.paymentMethodID = paymentMethods[i].id;
                            this.buckarooPaymentMethodID = paymentMethods[i].id;
                            break;
                        }
                    }
                });
        }

        createNote(): void {
            this.orderNoteService.create(this.newNote)
                .then(() => {
                    this.newNote.subject = '';
                    this.newNote.details = '';
                    this.orderNoteService.search(this.order.id)
                        .then((notes) => {
                            this.notes = notes;
                        });
                });
        }

        loadRemarks() {
            this.orderRemarkService.getByOrderId(this.$routeParams.orderId)
                .then((orderRemarks) => {
                    this.orderRemarks = orderRemarks;
                });
        }


        createOrderRemark() {
            this.orderRemark.orderId = this.$routeParams.orderId;
            this.orderRemarkService.create(this.orderRemark)
                .then(() => {
                    this.orderRemark = {};
                    this.loadRemarks();
                });
        }

        changeHoldOrder() {
            var orderHoldUpdate: CeyenneNXT.Orders.ApiContracts.Communication.Messages.OrderHoldUpdate;
            orderHoldUpdate = {
                orderID: this.order.id,
                hold: !this.order.holdOrder
            };

            this.orderService.changeHoldOrder(orderHoldUpdate).then(() => {
                this.order.holdOrder = !this.order.holdOrder;
            });
        }

        changeStatus(code) {
            var orderHistoryUpdate: CeyenneNXT.Orders.ApiContracts.Communication.Messages.OrderHistoryUpdate;
            orderHistoryUpdate = {
                orderID: this.order.id,
                statusCode: code,
                timestamp: undefined
            };

            this.orderStatusService.changeStatus(orderHistoryUpdate)
                .then(() => {
                    this.orderStatusService.getStatusHistory(this.order.id)
                        .then((history) => {
                            this.order.history = history;
                            this.processOrderHistoryChange();
                        });
                })
        };

        processOrderHistoryChange() {
            this.order.history.sort((n1, n2) => (new Date((<any>n2.timestamp))).getTime() - (new Date((<any>n1.timestamp))).getTime());

            this.possibleOrderStatuses = this.allOrderStatuses
                .filter((orderStatus) => {
                    return this.order.history.every(h => h.status.code !== orderStatus.code);
                });
        }

        openOrderLine(orderLineId: number) {
            this.$location.path('/order-line-details/' + orderLineId);
        }

        openProduct(externalProductIdentifier: string) {
            this.$location.path('/product-details/' + externalProductIdentifier);
        }

        createRefund() {
            this.refund.orderID = this.order.id;
            this.refundService.create(this.refund).then(() => {
                this.toastr.success("Refund created!");
                
            });
            this.refund = <any>{
                returnCodeID: null,
                paymentMethodID: this.buckarooPaymentMethodID
            };
        }

        openCustomer(customerId: number) {
            this.$location.path('/customer-details/' + customerId);
        }

        private attachOrderLinesDescription(orderLines: OrderLine[]) {
            //ToDo: make it with bulk load
            orderLines.forEach((item) => {
                this.productService.getProductByExternalProductIdentifier(item.externalProductIdentifier)
                    .then((result) => {
                        if (result) {
                            (<any>item).productDescription = result.name;
                        }
                    });
            })
        }
    }

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

    function controller(
        $routeParams,
        $location,
        orderService,
        orderRemarkService,
        orderStatusService,
        $uibModal,
        productService,
        orderNoteService,
        pageService,
        refundService,
        toastr
    ): OrderDetailsController {
        return new OrderDetailsController(
            $routeParams,
            $location,
            orderService,
            orderRemarkService,
            orderStatusService,
            $uibModal,
            productService,
            orderNoteService,
            pageService,
            refundService,
            toastr
        );
    };

    angular.module('app.orders')
        .controller('app.orders.OrderDetailsController', controller);
}