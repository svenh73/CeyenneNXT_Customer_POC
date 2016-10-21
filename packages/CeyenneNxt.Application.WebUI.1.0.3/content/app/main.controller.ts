module app {
    'use strict'

    export class MainController {
        private searchText: string;

        constructor(
            private $location: ng.ILocationService,
            private $auth: any,
            private pageService: app.services.IPageService
        ) {
        }

        search(): void {
            var backendId = this.searchText;
            this.searchText = '';
            this.$location.url('/orders?backendId=' + backendId);
        }

        signOut() {
            this.$auth.signOut();
        }

        getTitle(): string {
            return this.pageService.title;
        }
    }

    controller.$inject = [
        '$location',
        '$auth',
        'app.services.PageService'
    ];

    function controller($location, $auth, pageService): MainController {
        return new MainController($location, $auth, pageService);
    };

    angular.module('app')
        .controller('app.MainController', controller);
}