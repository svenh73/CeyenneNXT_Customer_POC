/// <reference path="../../scripts/typings/angular-toastr/angular-toastr.d.ts" />
((): void => {
    'use strict';


    extendExceptionHandler.$inject = ['$delegate','$injector'];
    function extendExceptionHandler(
        $delegate: any,
        $injector: ng.auto.IInjectorService
    ) {        
        return (exception: Error, cause?: string, source?: string) => {
            $delegate(exception, cause);
            var toastr: angular.toastr.IToastrService = <any>$injector.get('toastr');
            toastr.error(exception.message);
        }
    }


    angular
        .module('app.services')
        .config(config);

    config.$inject = ['$provide'];

    function config($provide: ng.auto.IProvideService): void {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }
})();