module app.refunds {
    'use strict'
    import SearchResult = CeyenneNXT.Orders.ApiContracts.Models.SearchResult;
    import RefundStatus = CeyenneNXT.Orders.ApiContracts.Models.RefundStatus;
    import RefundStatusHistory = CeyenneNXT.Orders.ApiContracts.Models.RefundStatusHistory;

    export class RefundsController {
        private filter: CeyenneNXT.Orders.ApiContracts.Models.RefundPagingFilter = <any>{};
        private result: SearchResult<CeyenneNXT.Orders.ApiContracts.Models.RefundSearchResult>;
        private refundStatuses: RefundStatus[]  = [];
        private searchDebounce: number;

        private pageSizes = app.Constants.PageSizes;
        private pages: number[] = [];

        private refundStatusHistory: RefundStatusHistory[];
        private currentRefundStatus: number;

        constructor(
            private $location: ng.ILocationService,
            private $scope: ng.IScope,
            private refundService: app.services.IRefundService,
            private refundStatusesService: app.services.IRefundStatusesService,
            private pageService: app.services.IPageService
        ) {
            this.pageService.title = 'Refunds';
            this.filter.pageNumber = 1;
            this.filter.pageSize = app.Constants.DefaultPageSize;

            this.searchDebounce = app.Constants.SearchOrderDebauceValue;
            this.newSearch();

            this.refundService.getRefundStatuses()
                .then((refundStatuses) => {
                    this.refundStatuses = refundStatuses;
                });
        }

        search() {
            this.refundService.search(this.filter)
                .then((result) => {
                    this.result = result;
                    this.calculatePages();
                });
        }

        showHistory(refundID: number) {
            this.refundStatusesService.getByRefundID(refundID)
                .then((refundStatusHistory) => {
                    this.refundStatusHistory = refundStatusHistory;
                    if (this.refundStatusHistory && this.refundStatusHistory.length > 0) {
                        this.currentRefundStatus = this.refundStatusHistory[this.refundStatusHistory.length - 1].refundStatusID;
                    }
                });
        }

        changeRefundStatus() {
            var refundStatusHistory: RefundStatusHistory = <any>{};
            refundStatusHistory.refundStatusID = this.currentRefundStatus;
            refundStatusHistory.refundID = this.currentRefundStatus = this.refundStatusHistory[this.refundStatusHistory.length - 1].refundID;
            this.refundStatusesService.create(refundStatusHistory)
                .then(() => {
                    this.showHistory(refundStatusHistory.refundID);
                });
        }

        changePage(page: number) {
            if (page === this.result.pageNumber) {
                return;
            }
            this.filter.pageNumber = page;
            this.search();
        }

        newSearch() {
            this.filter.pageNumber = 1;
            this.search();
        }


        private calculatePages() {
            this.pages = [];
            var counter: number = 1;
            var restRows: number = this.result.totalRows;
            do {
                this.pages.push(counter);
                counter++;
                restRows -= this.result.pageSize;
            } while (restRows > 0);
        }
    }

    controller.$inject = [
        '$location',
        '$scope',
        'app.services.RefundService',
        'app.services.RefundStatusesService',
        'app.services.PageService'
    ];

    function controller($location, $scope, refundService, refundStatusesService, pageService): RefundsController {
        return new RefundsController($location, $scope, refundService, refundStatusesService, pageService);
    };

    angular.module('app.refunds')
        .controller('app.refunds.RefundsController', controller);
}