/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />
(function () {
    'use strict';
    angular
        .module('app')
        .directive('appEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.appEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
        .config(config)
        .run(run);
    config.$inject = ['$httpProvider', '$routeProvider', '$authProvider'];
    function config($httpProvider, $routeProvider, $authProvider) {
        //$httpProvider.interceptors.push('app.services.AuthInterceptorService');
        $authProvider.configure({
            basePath: app.Constants.AuthServerBase,
            clientId: app.Constants.ClientId,
            responseType: app.Constants.ResponseType,
            scope: app.Constants.Scope,
            advanceRefresh: 1000 * app.Constants.AdvanceRefresh
        });
        $routeProvider
            .when("/", {
            controller: 'app.dashboard.DashboardController',
            controllerAs: 'vm',
            templateUrl: "app/dashboard/dashboard.tpl.html"
        })
            .when("/orders", {
            controller: "app.orders.OrdersController",
            controllerAs: 'vm',
            templateUrl: "app/orders/orders.tpl.html"
        })
            .when("/customers", {
            controller: "app.customers.CustomersController",
            controllerAs: 'vm',
            templateUrl: "app/customers/customers.tpl.html"
        })
            .when("/orders-details/:orderId", {
            controller: "app.orders.OrderDetailsController",
            controllerAs: 'vm',
            templateUrl: "app/orders/order-details.tpl.html"
        })
            .when("/customer-details/:customerId", {
            controller: "app.customers.CustomerDetailsController",
            controllerAs: 'vm',
            templateUrl: "app/customers/customer-details.tpl.html"
        })
            .when("/products/", {
            controller: "app.products.ProductsController",
            controllerAs: "vm",
            templateUrl: "app/products/products.tpl.html"
        })
            .when("/product-details/:sku", {
            controller: "app.products.ProductDetailsController",
            controllerAs: "vm",
            templateUrl: "app/products/product-details.tpl.html"
        })
            .when("/order-line-details/:orderLineId", {
            controller: "app.orders.OrderLineDetailsController",
            controllerAs: "vm",
            templateUrl: "app/orders/order-line-details.tpl.html"
        })
            .when("/refunds", {
            controller: "app.refunds.RefundsController",
            controllerAs: "vm",
            templateUrl: "app/refunds/refunds.tpl.html"
        })
            .otherwise({ redirectTo: '/orders' });
    }
    run.$inject = ['$location', '$rootScope', '$auth'];
    function run($location, $rootScope, $auth) {
        $rootScope.$on('oidcauth:signInCalled', function () {
            $auth.signIn($location.path());
        });
    }
})();
//# sourceMappingURL=app.config.js.map