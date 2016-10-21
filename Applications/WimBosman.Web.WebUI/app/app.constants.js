var app;
(function (app) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.OrderApiBase = 'http://localhost';
        Constants.AuthServerBase = 'http://localhost/CeyenneNXT.Authentication.IdentityServer';
        Constants.ProductsApiBase = 'http://localhost';
        Constants.StockApiBase = 'http://localhost/CeyenneNXT.Stock.WebApi';
        Constants.ClientId = '8954da0689f2a744480aac172bcdffdbf1d91499262b9534144129caa170e9ab';
        Constants.ResponseType = 'id_token token';
        Constants.Scope = 'openid profile email api';
        Constants.AdvanceRefresh = 300; // in seconds
        Constants.SearchOrderDebauceValue = 500; // in miliseconds
        Constants.DefaultPageSize = 10;
        Constants.PageSizes = [
            { 'key': 2, 'value': '2' },
            { 'key': 10, 'value': '10' },
            { 'key': 25, 'value': '25' },
            { 'key': 50, 'value': '50' },
            { 'key': 100, 'value': '100' }
        ];
        Constants.ProductNameAttributeCodeCorrespondence = 'ShrtDesc';
        Constants.OrderLineStatusQuantityChangeMaxValue = 2000000000; //Currently api takes up to 2147483647 (maximum of int32)
        Constants.StockTypeCodeToDisplay = ['CA'];
        Constants.BuckarooPaymentMethod = 'Buckaroo';
        return Constants;
    }());
    app.Constants = Constants;
})(app || (app = {}));
//# sourceMappingURL=app.constants.js.map