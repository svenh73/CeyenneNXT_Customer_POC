module app.dashboard {
    'use strict'
    import DashboardData = CeyenneNXT.Orders.ApiContracts.Models.DashboardData;

    export class DashboardController {
        private myChart;
        private dashboardData: DashboardData;

        constructor(
            private $filter: any,
            private orderService: app.services.IOrderService,
            private pageService: app.services.IPageService
        ) {
            this.pageService.title = 'Dashboard';
            var opts = {
                dataFormatX: (x) => { return new Date(x); },
                tickFormatX: (x) => { return $filter('date')(new Date(x), 'dd-MMM'); },
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
                .then((result) => {
                    this.dashboardData = result;
                    var dayCounts: CeyenneNXT.Orders.ApiContracts.Models.DayCount[] = this.dashboardData.dayCounts;
                    var dayBefore30Days = new Date().setDate(new Date().getDate() - 30);
                    var missingDaybefore30Days = true;
                    for (var i = 0; i < dayCounts.length; i++) {
                        chartData.main[0].data.push(<any>{
                            x: dayCounts[i].date,
                            y: dayCounts[i].count
                        });
                        if (new Date(<any>dayCounts[i].date).getTime() == dayBefore30Days) {
                            missingDaybefore30Days = false;
                        }
                    }
                    if (missingDaybefore30Days) {
                        chartData.main[0].data.push(<any>{
                            x: new Date(dayBefore30Days),
                            y: 0
                        });
                    }

                    this.myChart = new xChart('line', chartData, '#orders-chart', opts);
                });


        }

    }

    controller.$inject = [
        '$filter',
        'app.services.OrderService',
        'app.services.PageService'
    ];

    function controller($filter, orderService, pageService): DashboardController {
        return new DashboardController($filter, orderService, pageService);
    };

    angular.module('app.dashboard')
        .controller('app.dashboard.DashboardController', controller);
}