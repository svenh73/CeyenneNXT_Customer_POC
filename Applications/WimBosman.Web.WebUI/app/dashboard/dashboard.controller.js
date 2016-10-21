var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        'use strict';
        var DashboardController = (function () {
            function DashboardController($filter, orderService, pageService) {
                var _this = this;
                this.$filter = $filter;
                this.orderService = orderService;
                this.pageService = pageService;
                this.pageService.title = 'Dashboard';
                var opts = {
                    dataFormatX: function (x) { return new Date(x); },
                    tickFormatX: function (x) { return $filter('date')(new Date(x), 'dd-MMM'); },
                    tickHintX: 30
                };
                var chartData = {
                    "xScale": "time",
                    "yScale": "linear",
                    "type": "line",
                    "main": [
                        {
                            className: ".orders-chart",
                            data: []
                        }
                    ]
                };
                this.orderService.getDashboardData()
                    .then(function (result) {
                    _this.dashboardData = result;
                    var dayCounts = _this.dashboardData.dayCounts;
                    var dayBefore30Days = new Date().setDate(new Date().getDate() - 30);
                    var missingDaybefore30Days = true;
                    for (var i = 0; i < dayCounts.length; i++) {
                        chartData.main[0].data.push({
                            x: dayCounts[i].date,
                            y: dayCounts[i].count
                        });
                        if (new Date(dayCounts[i].date).getTime() == dayBefore30Days) {
                            missingDaybefore30Days = false;
                        }
                    }
                    if (missingDaybefore30Days) {
                        chartData.main[0].data.push({
                            x: new Date(dayBefore30Days),
                            y: 0
                        });
                    }
                    _this.myChart = new xChart('line', chartData, '#orders-chart', opts);
                });
            }
            return DashboardController;
        }());
        dashboard.DashboardController = DashboardController;
        controller.$inject = [
            '$filter',
            'app.services.OrderService',
            'app.services.PageService'
        ];
        function controller($filter, orderService, pageService) {
            return new DashboardController($filter, orderService, pageService);
        }
        ;
        angular.module('app.dashboard')
            .controller('app.dashboard.DashboardController', controller);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=dashboard.controller.js.map