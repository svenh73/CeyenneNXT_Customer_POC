module app.services {
    export interface IAuthInterceptorService {
    }

    class AuthInterceptorService implements IAuthInterceptorService {

        constructor(
            private $location: ng.ILocationService,
            private $q: ng.IQService,
            private $injector: any,
            private tokenService: any,
            private $auth: any
        ) {
        }

        public request = (config) => {

            config.headers = config.headers || {};

            if (this.$auth.isAuthenticated()) {
                config.headers.Authorization = 'Bearer ' + this.tokenService.getAccessToken();
            }

            return config;
        }

        public responseError = (rejection) => {
            if (rejection.status === 401) {
                this.$auth.signIn();
            }
            return this.$q.reject(rejection);
        }
    }

    factory.$inject = ['$location', '$q', '$injector', 'tokenService', '$auth'];

    function factory($location, $q, $injector, tokenService, $auth): IAuthInterceptorService {
        return new AuthInterceptorService($location, $q, $injector, tokenService, $auth);
    }

    angular
        .module('app.services')
        .factory('app.services.AuthInterceptorService',
            factory);
}