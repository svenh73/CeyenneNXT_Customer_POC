var app;
(function (app) {
    var customers;
    (function (customers) {
        'use strict';
        var CustomerDetailsController = (function () {
            function CustomerDetailsController($routeParams, $location, customerService, customerNoteService, pageService) {
                var _this = this;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.customerService = customerService;
                this.customerNoteService = customerNoteService;
                this.pageService = pageService;
                this.notes = [];
                this.newNote = {};
                this.pageService.title = 'Customer Details';
                this.customerID = $routeParams.customerId;
                this.newNote.customerID = $routeParams.customerId;
                this.customerService.getCustomerById($routeParams.customerId)
                    .then(function (customer) {
                    _this.customer = customer;
                    _this.customerLoaded = !!customer;
                });
                this.customerNoteService.search($routeParams.customerId)
                    .then(function (notes) {
                    _this.notes = notes;
                });
            }
            CustomerDetailsController.prototype.displayOrderDetails = function (id) {
                this.$location.path('/orders-details/' + id);
            };
            CustomerDetailsController.prototype.createNote = function () {
                var _this = this;
                this.customerNoteService.create(this.newNote)
                    .then(function () {
                    _this.newNote.subject = '';
                    _this.newNote.details = '';
                    _this.customerNoteService.search(_this.customer.id)
                        .then(function (notes) {
                        _this.notes = notes;
                    });
                });
            };
            return CustomerDetailsController;
        }());
        customers.CustomerDetailsController = CustomerDetailsController;
        controller.$inject = [
            '$routeParams',
            '$location',
            'app.services.CustomerService',
            'app.services.CustomerNoteService',
            'app.services.PageService'
        ];
        function controller($routeParams, $location, customerService, customerNoteService, pageService) {
            return new CustomerDetailsController($routeParams, $location, customerService, customerNoteService, pageService);
        }
        ;
        angular.module('app.customers')
            .controller('app.customers.CustomerDetailsController', controller);
    })(customers = app.customers || (app.customers = {}));
})(app || (app = {}));
//# sourceMappingURL=customer-details.controller.js.map