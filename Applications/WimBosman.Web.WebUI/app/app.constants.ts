module app {
    export class Constants {
        static OrderApiBase: string = 'http://localhost';
        static AuthServerBase: string = 'http://localhost/CeyenneNXT.Authentication.IdentityServer';
        static ProductsApiBase: string = 'http://localhost';
        static StockApiBase: string = 'http://localhost/CeyenneNXT.Stock.WebApi';
        static ClientId: string = '8954da0689f2a744480aac172bcdffdbf1d91499262b9534144129caa170e9ab';
        static ResponseType: string = 'id_token token';
        static Scope: string = 'openid profile email api';
        static AdvanceRefresh: number = 300; // in seconds
        static SearchOrderDebauceValue: number = 500; // in miliseconds
        static DefaultPageSize: number = 10;
        static PageSizes: any = [
            { 'key': 2, 'value': '2'},
            { 'key': 10, 'value': '10' },
            { 'key': 25, 'value': '25' },
            { 'key': 50, 'value': '50' },
            { 'key': 100, 'value': '100' }
        ];
        static ProductNameAttributeCodeCorrespondence: string = 'ShrtDesc';
        static OrderLineStatusQuantityChangeMaxValue: number = 2000000000; //Currently api takes up to 2147483647 (maximum of int32)
        static StockTypeCodeToDisplay: string[] = ['CA'];
        static BuckarooPaymentMethod: string = 'Buckaroo';
    }
}