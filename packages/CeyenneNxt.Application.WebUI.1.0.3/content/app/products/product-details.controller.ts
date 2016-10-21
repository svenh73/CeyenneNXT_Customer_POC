module app.products {
    'use strict'

    import VendorProductPrice = CeyenneNXT.Products.ApiContracts.Models.VendorProductPrice;
    import Stock = CeyenneNXT.Stock.WebAPI.Models.Stock;
    import StockListGetParams = CeyenneNXT.Stock.WebAPI.Models.StockListGetParameters;

    interface IRouteParams extends ng.route.IRouteParamsService {
        sku: string;
    }

    class BarcodeItem {
        barcode: string;
        type: string;
    }

    export class ProductDetailsController {
        private product: CeyenneNXT.Products.ApiContracts.Models.Product;
        private productName: string;
        private productLoaded: boolean;
        private barcodes: BarcodeItem[] = [];
        private priceItems: VendorProductPrice[] = [];
        private stockItems: Stock[] = [];
        private productSKU: string;
        

        constructor(
            private $routeParams: IRouteParams,
            private productService: app.services.IProductService,
            private stockService: app.services.IStockService,
            private pageService: app.services.IPageService
        ) {
            this.pageService.title = 'Product Details';
            this.productSKU = $routeParams.sku;
            this.productService.getProduct($routeParams.sku)
                .then((product) => {
                    this.product = product;
                    this.productLoaded = !!product;
                    if (product) {
                        var stockGetParams: StockListGetParams = {
                            sku: product.sku,
                            organizationCode: product.organization.code,
                            stockTypeCode: app.Constants.StockTypeCodeToDisplay
                        };

                        this.stockService.getStockListByParams(stockGetParams)
                            .then((stockList) => {
                                this.stockItems = stockList;
                            });

                        this.product.attributeValues.forEach((item) => {
                            if (item.attributeCode == app.Constants.ProductNameAttributeCodeCorrespondence) {
                                this.productName = item.value;
                            }
                        })

                        this.barcodes = this.getBarcodes();
                        this.priceItems = this.getPrices();
                    }
                });
        }

        private getBarcodes(): BarcodeItem[]
        {
            var result: BarcodeItem[] = [];

            this.product.vendorProducts.forEach((vp) => {
                vp.vendorProductBarcodes.forEach((vpb) => {
                    var barcodeItem: BarcodeItem = {
                        barcode: vpb.barcode,
                        type: vpb.barcodeType.name
                    }

                    result.push(barcodeItem);
                })
            });

            return result;
        }

        private getPrices(): VendorProductPrice[] {
            var result: VendorProductPrice[] = [];

            this.product.vendorProducts.forEach((vp) => {
                vp.vendorProductPrices.forEach((vpp) => {
                    result.push(vpp);
                })
            });

            return result;
        }
    }

    controller.$inject = [
        '$routeParams',
        'app.services.ProductService',
        'app.services.StockService',
        'app.services.PageService'
    ];

    function controller($routeParams, productService, stockService, pageService): ProductDetailsController {
        return new ProductDetailsController($routeParams, productService, stockService, pageService);
    };

    angular.module('app.products')
        .controller('app.products.ProductDetailsController', controller);
}