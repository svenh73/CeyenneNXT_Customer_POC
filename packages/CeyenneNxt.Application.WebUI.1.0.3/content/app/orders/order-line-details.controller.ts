module app.orders {
    'use strict'

    import OrderLineStatus = CeyenneNXT.Orders.ApiContracts.Models.OrderLineStatus;

    interface IRouteParams extends ng.route.IRouteParamsService {
        orderLineId: number;
    }

    export class OrderLineDetailsController {
        private orderLine: CeyenneNXT.Orders.ApiContracts.Models.OrderLine;
        private allOrderLineStatuses: OrderLineStatus[];
        private orderLineStatusQuantityChanged: number;
        private productDescription: string;
        private codeStatusRelation: any;
        private orderLineLoaded: boolean;
        private orderLineID: number;

        constructor(
            private $routeParams: IRouteParams,
            private $location: ng.ILocationService,
            private toastr: angular.toastr.IToastrService,
            private orderLineService: app.services.IOrderLineService,
            private productService: app.services.IProductService
        ) {
            this.orderLineID = $routeParams.orderLineId;
            this.orderLineService.getAllStatuses()
                .then((statuses) => {
                    this.allOrderLineStatuses = statuses;
                });

            this.refreshOrderLine();
        }

        changeStatus(code) {
            var isDataValid = this.validateChangeStatusData(code);

            if (isDataValid) { 
                var orderLineHistoryUpdate: CeyenneNXT.Orders.ApiContracts.Communication.Messages.OrderLineHistoryUpdate;
                orderLineHistoryUpdate = {
                    orderLineID: this.orderLine.id,
                    statusCode: code,
                    quantityChanged: this.orderLineStatusQuantityChanged,
                    timestamp: undefined,
                    message: undefined
                };

                this.orderLineService.createStatusHistory(orderLineHistoryUpdate)
                    .then(() => {
                        this.refreshOrderLine();

                        this.orderLineStatusQuantityChanged = undefined;
                    })
            }
        };

        processOrderLineHistoryChange() {
            this.orderLine.statusHistories.sort((n1, n2) => (new Date((<any>n2.timestamp))).getTime() - (new Date((<any>n1.timestamp))).getTime());
        }

        openProduct(externalProductIdentifier: string) {
            this.$location.path('/product-details/' + externalProductIdentifier);
        }

        private validateChangeStatusData(statusCode: string) {
            var choosenStatus = this.getStatusByCode(statusCode);
            if (choosenStatus.quantityRequired && this.orderLineStatusQuantityChanged == null)
            {
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
        }

        private getStatusByCode(code: string): OrderLineStatus{
            if (!this.codeStatusRelation) {
                this.codeStatusRelation = {};
                this.allOrderLineStatuses.forEach((item) => {
                    this.codeStatusRelation[item.code] = item;
                })
            }

            return this.codeStatusRelation[code];
        }

        private isNumeric(input: any) {
            return !isNaN(input);
        }

        private refreshOrderLine() {
            this.orderLineService.getOrderLineById(this.$routeParams.orderLineId)
                .then((orderLine) => {
                    this.orderLine = orderLine;
                    this.orderLineLoaded = !!orderLine;

                    if (orderLine) {
                        this.processOrderLineHistoryChange();

                        if (!this.productDescription) {
                            this.productService.getProductByExternalProductIdentifier(this.orderLine.externalProductIdentifier)
                                .then((result) => {
                                    if (result) {
                                        (<any>this.orderLine).productDescription = this.productDescription = result.name;
                                    }
                                });
                        }
                    }
                });
        }
    }

    controller.$inject = [
        '$routeParams',
        '$location',
        'toastr',
        'app.services.OrderLineService',
        'app.services.ProductService',
    ];

    function controller($routeParams, $location, toastr, orderLineService, productService): OrderLineDetailsController {
        return new OrderLineDetailsController($routeParams, $location, toastr, orderLineService, productService);
    };

    angular.module('app.orders')
        .controller('app.orders.OrderLineDetailsController', controller);
}