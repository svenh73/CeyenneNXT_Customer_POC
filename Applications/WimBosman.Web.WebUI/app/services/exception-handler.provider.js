/// <reference path="../../scripts/typings/angular-toastr/angular-toastr.d.ts" />
(function () {
    'use strict';
    extendExceptionHandler.$inject = ['$delegate', '$injector'];
    function extendExceptionHandler($delegate, $injector) {
        return function (exception, cause, source) {
            $delegate(exception, cause);
            var toastr = $injector.get('toastr');
            toastr.error(exception.message);
        };
    }
    angular
        .module('app.services')
        .config(config);
    config.$inject = ['$provide'];
    function config($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
})();
//# sourceMappingURL=exception-handler.provider.js.map