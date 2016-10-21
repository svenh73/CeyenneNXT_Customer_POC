module app.services {


    export interface IPageService {
        title: string;
    }

    class PageService implements IPageService {
        public title: string = 'Concentrator';

        constructor() { }


    }

    factory.$inject = [];

    function factory($http): PageService {
        return new PageService();
    }

    angular
        .module('app.services')
        .factory('app.services.PageService',
        factory);
}