var app;
(function (app) {
    var services;
    (function (services) {
        var PageService = (function () {
            function PageService() {
                this.title = 'Concentrator';
            }
            return PageService;
        }());
        factory.$inject = [];
        function factory($http) {
            return new PageService();
        }
        angular
            .module('app.services')
            .factory('app.services.PageService', factory);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=page.service.js.map