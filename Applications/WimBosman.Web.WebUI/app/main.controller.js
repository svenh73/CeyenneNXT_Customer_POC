var app;
(function (app) {
    'use strict';
    var MainController = (function () {
        function MainController($location, $auth, pageService) {
            this.$location = $location;
            this.$auth = $auth;
            this.pageService = pageService;
        }
        MainController.prototype.search = function () {
            var backendId = this.searchText;
            this.searchText = '';
            this.$location.url('/orders?backendId=' + backendId);
        };
        MainController.prototype.signOut = function () {
            this.$auth.signOut();
        };
        MainController.prototype.getTitle = function () {
            return this.pageService.title;
        };
        return MainController;
    }());
    app.MainController = MainController;
    controller.$inject = [
        '$location',
        '$auth',
        'app.services.PageService'
    ];
    function controller($location, $auth, pageService) {
        return new MainController($location, $auth, pageService);
    }
    ;
    angular.module('app')
        .controller('app.MainController', controller);
})(app || (app = {}));
//# sourceMappingURL=main.controller.js.map