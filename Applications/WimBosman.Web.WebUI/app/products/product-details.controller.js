var app;
(function (app) {
    var products;
    (function (products) {
        'use strict';
        var BarcodeItem = (function () {
            function BarcodeItem() {
            }
            return BarcodeItem;
        }());
        var ProductDetailsController = (function () {
            function ProductDetailsController($routeParams, productService, stockService, pageService) {
                var _this = this;
                this.$routeParams = $routeParams;
                this.productService = productService;
                this.stockService = stockService;
                this.pageService = pageService;
                this.barcodes = [];
                this.priceItems = [];
                this.stockItems = [];
                this.pageService.title = 'Product Details';
                this.productSKU = $routeParams.sku;
                this.productService.getProduct($routeParams.sku)
                    .then(function (product) {
                    _this.product = product;
                    _this.productLoaded = !!product;
                    if (product) {
                        var stockGetParams = {
                            sku: product.sku,
                            organizationCode: product.organization.code,
                            stockTypeCode: app.Constants.StockTypeCodeToDisplay
                        };
                        _this.stockService.getStockListByParams(stockGetParams)
                            .then(function (stockList) {
                            _this.stockItems = stockList;
                        });
                        _this.product.attributeValues.forEach(function (item) {
                            if (item.attributeCode == app.Constants.ProductNameAttributeCodeCorrespondence) {
                                _this.productName = item.value;
                            }
                        });
                        _this.barcodes = _this.getBarcodes();
                        _this.priceItems = _this.getPrices();
                    }
                });
            }
            ProductDetailsController.prototype.getBarcodes = function () {
                var result = [];
                this.product.vendorProducts.forEach(function (vp) {
                    vp.vendorProductBarcodes.forEach(function (vpb) {
                        var barcodeItem = {
                            barcode: vpb.barcode,
                            type: vpb.barcodeType.name
                        };
                        result.push(barcodeItem);
                    });
                });
                return result;
            };
            ProductDetailsController.prototype.getPrices = function () {
                var result = [];
                this.product.vendorProducts.forEach(function (vp) {
                    vp.vendorProductPrices.forEach(function (vpp) {
                        result.push(vpp);
                    });
                });
                return result;
            };
            return ProductDetailsController;
        }());
        products.ProductDetailsController = ProductDetailsController;
        controller.$inject = [
            '$routeParams',
            'app.services.ProductService',
            'app.services.StockService',
            'app.services.PageService'
        ];
        function controller($routeParams, productService, stockService, pageService) {
            return new ProductDetailsController($routeParams, productService, stockService, pageService);
        }
        ;
        angular.module('app.products')
            .controller('app.products.ProductDetailsController', controller);
    })(products = app.products || (app.products = {}));
})(app || (app = {}));
//# sourceMappingURL=product-details.controller.js.map