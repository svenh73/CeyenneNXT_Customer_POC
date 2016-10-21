var app;
(function (app) {
    var refunds;
    (function (refunds) {
        'use strict';
        var RefundsController = (function () {
            function RefundsController($location, $scope, refundService, refundStatusesService, pageService) {
                var _this = this;
                this.$location = $location;
                this.$scope = $scope;
                this.refundService = refundService;
                this.refundStatusesService = refundStatusesService;
                this.pageService = pageService;
                this.filter = {};
                this.refundStatuses = [];
                this.pageSizes = app.Constants.PageSizes;
                this.pages = [];
                this.pageService.title = 'Refunds';
                this.filter.pageNumber = 1;
                this.filter.pageSize = app.Constants.DefaultPageSize;
                this.searchDebounce = app.Constants.SearchOrderDebauceValue;
                this.newSearch();
                this.refundService.getRefundStatuses()
                    .then(function (refundStatuses) {
                    _this.refundStatuses = refundStatuses;
                });
            }
            RefundsController.prototype.search = function () {
                var _this = this;
                this.refundService.search(this.filter)
                    .then(function (result) {
                    _this.result = result;
                    _this.calculatePages();
                });
            };
            RefundsController.prototype.showHistory = function (refundID) {
                var _this = this;
                this.refundStatusesService.getByRefundID(refundID)
                    .then(function (refundStatusHistory) {
                    _this.refundStatusHistory = refundStatusHistory;
                    if (_this.refundStatusHistory && _this.refundStatusHistory.length > 0) {
                        _this.currentRefundStatus = _this.refundStatusHistory[_this.refundStatusHistory.length - 1].refundStatusID;
                    }
                });
            };
            RefundsController.prototype.changeRefundStatus = function () {
                var _this = this;
                var refundStatusHistory = {};
                refundStatusHistory.refundStatusID = this.currentRefundStatus;
                refundStatusHistory.refundID = this.currentRefundStatus = this.refundStatusHistory[this.refundStatusHistory.length - 1].refundID;
                this.refundStatusesService.create(refundStatusHistory)
                    .then(function () {
                    _this.showHistory(refundStatusHistory.refundID);
                });
            };
            RefundsController.prototype.changePage = function (page) {
                if (page === this.result.pageNumber) {
                    return;
                }
                this.filter.pageNumber = page;
                this.search();
            };
            RefundsController.prototype.newSearch = function () {
                this.filter.pageNumber = 1;
                this.search();
            };
            RefundsController.prototype.calculatePages = function () {
                this.pages = [];
                var counter = 1;
                var restRows = this.result.totalRows;
                do {
                    this.pages.push(counter);
                    counter++;
                    restRows -= this.result.pageSize;
                } while (restRows > 0);
            };
            return RefundsController;
        }());
        refunds.RefundsController = RefundsController;
        controller.$inject = [
            '$location',
            '$scope',
            'app.services.RefundService',
            'app.services.RefundStatusesService',
            'app.services.PageService'
        ];
        function controller($location, $scope, refundService, refundStatusesService, pageService) {
            return new RefundsController($location, $scope, refundService, refundStatusesService, pageService);
        }
        ;
        angular.module('app.refunds')
            .controller('app.refunds.RefundsController', controller);
    })(refunds = app.refunds || (app.refunds = {}));
})(app || (app = {}));
//# sourceMappingURL=refunds.controller.js.map