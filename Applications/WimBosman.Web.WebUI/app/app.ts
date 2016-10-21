
((): void => {
    'use strict';
    angular.module('app',
    [
        'blockUI',
        'ngRoute',
        'oidc-angular',
        'app.services',
        'app.orders',
        'app.dashboard',
        'app.customers',
        'app.products',
        'app.refunds',
        'ui.bootstrap',
        'ngAnimate',
        'toastr'
    ]);
})();