var app;
(function (app) {
    var services;
    (function (services) {
        var AuthInterceptorService = (function () {
            function AuthInterceptorService($location, $q, $injector, tokenService, $auth) {
                var _this = this;
                this.$location = $location;
                this.$q = $q;
                this.$injector = $injector;
                this.tokenService = tokenService;
                this.$auth = $auth;
                this.request = function (config) {
                    config.headers = config.headers || {};
                    if (_this.$auth.isAuthenticated()) {
                        config.headers.Authorization = 'Bearer ' + _this.tokenService.getAccessToken();
                    }
                    return config;
                };
                this.responseError = function (rejection) {
                    if (rejection.status === 401) {
                        _this.$auth.signIn();
                    }
                    return _this.$q.reject(rejection);
                };
            }
            return AuthInterceptorService;
        }());
        factory.$inject = ['$location', '$q', '$injector', 'tokenService', '$auth'];
        function factory($location, $q, $injector, tokenService, $auth) {
            return new AuthInterceptorService($location, $q, $injector, tokenService, $auth);
        }
        angular
            .module('app.services')
            .factory('app.services.AuthInterceptorService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=auth-interceptor.service.js.map