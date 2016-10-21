module app.customers {
    'use strict'

    interface IRouteParams extends ng.route.IRouteParamsService {
        customerId: number;
    }

    export class CustomerDetailsController {
        private customer: CeyenneNXT.Orders.ApiContracts.Models.CustomerSearchResult;
        private notes: CeyenneNXT.Orders.ApiContracts.Models.CustomerNoteSearchResult[] = [];
        private newNote: CeyenneNXT.Orders.ApiContracts.Models.CustomerNote = <any>{};
        private customerLoaded: boolean;
        private customerID: number;

        constructor(
            private $routeParams: IRouteParams,
            private $location: ng.ILocationService,
            private customerService: app.services.ICustomerService,
            private customerNoteService: app.services.ICustomerNoteService,
            private pageService: app.services.IPageService
        ) {
            this.pageService.title = 'Customer Details';
            this.customerID = $routeParams.customerId;
            this.newNote.customerID = $routeParams.customerId;
            this.customerService.getCustomerById($routeParams.customerId)
                .then((customer) => {
                    this.customer = customer;
                    this.customerLoaded = !!customer;
                });
            this.customerNoteService.search($routeParams.customerId)
                .then((notes) => {
                    this.notes = notes;
                });
        }

        displayOrderDetails(id: number): void {
            this.$location.path('/orders-details/' + id);
        }

        createNote(): void {
            this.customerNoteService.create(this.newNote)
                .then(() => {
                    this.newNote.subject = '';
                    this.newNote.details = '';
                    this.customerNoteService.search(this.customer.id)
                        .then((notes) => {
                            this.notes = notes;
                        });
                });
        }
    }

    controller.$inject = [
        '$routeParams',
        '$location',
        'app.services.CustomerService',
        'app.services.CustomerNoteService',
        'app.services.PageService'
    ];

    function controller($routeParams, $location, customerService, customerNoteService, pageService): CustomerDetailsController {
        return new CustomerDetailsController($routeParams, $location, customerService, customerNoteService, pageService);
    };

    angular.module('app.customers')
        .controller('app.customers.CustomerDetailsController', controller);
}