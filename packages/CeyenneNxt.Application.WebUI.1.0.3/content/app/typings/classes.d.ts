
declare module CeyenneNXT.Core.Entities {
	interface AuditEntity {
		createdAt: Date;
		createdBy: number;
		lastModifiedAt: Date;
		lastModifiedBy: number;
	}
}
declare module CeyenneNXT.Core.Shared.ApiCommunication {
	interface PagingFilter {
		pageNumber: number;
		pageSize: number;
	}
}
declare module CeyenneNXT.Orders.ApiContracts.Communication.Messages {
	interface OrderHistoryUpdate {
		orderID: number;
		statusCode: string;
		timestamp: Date;
	}
	interface OrderHoldUpdate {
		hold: boolean;
		orderID: number;
	}
	interface OrderLineHistoryUpdate {
		message: string;
		orderLineID: number;
		quantityChanged: number;
		statusCode: string;
		timestamp: Date;
	}
	interface SetOrderDispatched {
		dispatchedAt: Date;
		orderID: number;
	}
}
declare module CeyenneNXT.Orders.ApiContracts.Models {
	interface Address {
		att: string;
		backendID: string;
		city: string;
		company: string;
		country: CeyenneNXT.Orders.ApiContracts.Models.Country;
		houseNumber: string;
		houseNumberExt: string;
		street: string;
		type: CeyenneNXT.Orders.ApiContracts.Models.AddressType;
		zIPCode: string;
	}
	interface AddressType {
		code: string;
		name: string;
	}
	interface AttributeValue {
		code: string;
		name: string;
		value: string;
	}
	interface Country {
		code: string;
		name: string;
	}
	interface Customer {
		backendId: string;
		company: string;
		firstName: string;
		fullName: string;
		id: number;
		lastName: string;
	}
	interface CustomerAddressSelect {
		backendID: string;
		city: string;
		country: string;
		houseNumber: string;
		street: string;
	}
	interface CustomerNote extends CeyenneNXT.Core.Entities.AuditEntity {
		customerID: number;
		details: string;
		id: number;
		subject: string;
		userID: number;
	}
	interface CustomerNoteSearchResult {
		createdAt: Date;
		details: string;
		subject: string;
		userName: string;
	}
	interface CustomerPagingFilter extends CeyenneNXT.Core.Shared.ApiCommunication.PagingFilter {
		company: string;
		email: string;
		name: string;
		phone: string;
	}
	interface CustomerSearchResult {
		addresses: CeyenneNXT.Orders.ApiContracts.Models.CustomerAddressSelect[];
		backendID: string;
		company: string;
		email: string;
		fullName: string;
		id: number;
		orders: CeyenneNXT.Orders.ApiContracts.Models.OrderSearchResult[];
		phone: string;
	}
	interface DashboardData {
		dayCounts: CeyenneNXT.Orders.ApiContracts.Models.DayCount[];
		inProcessOrdersCount: number;
		newOrdersCount: number;
	}
	interface DayCount {
		count: number;
		date: Date;
	}
	interface Order {
		addresses: CeyenneNXT.Orders.ApiContracts.Models.Address[];
		attributeValues: CeyenneNXT.Orders.ApiContracts.Models.AttributeValue[];
		backendID: string;
		channelIdentifier: string;
		createdAt: Date;
		customer: CeyenneNXT.Orders.ApiContracts.Models.Customer;
		history: CeyenneNXT.Orders.ApiContracts.Models.OrderStatusHistory[];
		holdOrder: boolean;
		id: number;
		orderLines: CeyenneNXT.Orders.ApiContracts.Models.OrderLine[];
		orderType: string;
		shippingCosts: number;
		shippingCostsTaxAmount: number;
		subtotal: number;
		taxAmount: number;
		total: number;
	}
	interface OrderLine {
		attributeValues: CeyenneNXT.Orders.ApiContracts.Models.AttributeValue[];
		externalOrderLineID: string;
		externalProductIdentifier: string;
		id: number;
		orderLineQuantityUnit: CeyenneNXT.Orders.ApiContracts.Models.OrderLineQuantityUnit;
		priceTaxAmount: number;
		quantity: number;
		quantityShipped: number;
		statusHistories: CeyenneNXT.Orders.ApiContracts.Models.OrderLineStatusHistory[];
		totalPrice: number;
		unitPrice: number;
	}
	interface OrderLineQuantityUnit {
		code: string;
		name: string;
	}
	interface OrderLineStatus {
		code: string;
		id: number;
		name: string;
		quantityRequired: boolean;
	}
	interface OrderLineStatusHistory {
		message: string;
		quantityChanged: number;
		status: CeyenneNXT.Orders.ApiContracts.Models.OrderLineStatus;
		timestamp: Date;
	}
	interface OrderNote extends CeyenneNXT.Core.Entities.AuditEntity {
		details: string;
		id: number;
		orderID: number;
		subject: string;
		userID: number;
	}
	interface OrderNoteSearchResult {
		createdAt: Date;
		details: string;
		subject: string;
		userName: string;
	}
	interface OrderPagingFilter extends CeyenneNXT.Core.Shared.ApiCommunication.PagingFilter {
		backendId: string;
		channel: string;
		customerBackendIDOrName: string;
		customerId: number;
		orderStatus: string;
		typeID: number;
	}
	interface OrderSearchResult {
		backendID: string;
		channelIdentifier: string;
		createdAt: Date;
		holdOrder: boolean;
		id: number;
		orderStatus: string;
		orderType: string;
	}
	interface OrderStatus {
		code: string;
		name: string;
	}
	interface OrderStatusHistory {
		status: CeyenneNXT.Orders.ApiContracts.Models.OrderStatus;
		timestamp: Date;
	}
	interface OrderType {
		id: number;
		name: string;
	}
	interface OrderUpdateMessage {
		id: number;
		orderID: number;
		orderStatusHistory: CeyenneNXT.Orders.ApiContracts.Models.OrderStatusHistory;
		orderStatusHistoryID: number;
		orderUpdateMessageLines: CeyenneNXT.Orders.ApiContracts.Models.OrderUpdateMessageLine[];
		processed: boolean;
		timestamp: Date;
	}
	interface OrderUpdateMessageLine {
		orderLine: CeyenneNXT.Orders.ApiContracts.Models.OrderLine;
		statusHistory: CeyenneNXT.Orders.ApiContracts.Models.OrderLineStatusHistory;
	}
	interface PaymentMethod {
		code: string;
		id: number;
		name: string;
	}
	interface Refund {
		amount: number;
		createdAt: Date;
		currencyID: number;
		description: string;
		id: number;
		invoice: string;
		orderID: number;
		paymentMethodID: number;
		returnCodeID: number;
		timestamp: Date;
	}
	interface RefundPagingFilter extends CeyenneNXT.Core.Shared.ApiCommunication.PagingFilter {
		refundStatusID: number;
		searchText: string;
	}
	interface RefundSearchResult {
		amount: number;
		currencyCode: string;
		customerID: number;
		customerName: string;
		description: string;
		id: number;
		invoice: string;
		orderBackendID: string;
		orderID: number;
		paymentMethod: string;
		returnCode: string;
	}
	interface RefundStatus {
		code: string;
		id: number;
		name: string;
	}
	interface RefundStatusHistory {
		id: number;
		refundID: number;
		refundStatus: CeyenneNXT.Orders.ApiContracts.Models.RefundStatus;
		refundStatusID: number;
		timestamp: Date;
	}
	interface ReturnCode {
		id: number;
		name: string;
	}
	interface SearchResult<T> {
		pageNumber: number;
		pageSize: number;
		rows: T[];
		totalRows: number;
	}
}
declare module CeyenneNXT.Orders.ApiContracts.Models.CreateModels {
	interface OrderAttribute {
		attributeCode: string;
		attributeName: string;
		attributeValue: string;
		orderID: number;
	}
	interface OrderLineAttribute {
		attributeCode: string;
		attributeName: string;
		attributeValue: string;
		orderLineID: number;
	}
	interface OrderUpdateMessage {
		orderID: number;
		orderLineStatusHistoryIDs: number[];
		orderStatusHistoryID: number;
		timestamp: Date;
	}
}
declare module CeyenneNXT.Orders.ApiContracts.Models.UpdateModels {
	interface OrderUpdateMessage {
		orderUpdateMessageID: number;
		processed: boolean;
	}
}
declare module CeyenneNXT.Products.ApiContracts.Models {
	interface BarcodeType {
		code: string;
		name: string;
		organizationCode: string;
	}
	interface Brand {
		code: string;
		name: string;
		organizationCode: string;
	}
	interface Currency {
		code: string;
		name: string;
		organizationCode: string;
	}
	interface Organization {
		code: string;
		name: string;
	}
	interface PriceType {
		code: string;
		name: string;
		organizationCode: string;
	}
	interface Product {
		attributeValues: CeyenneNXT.Products.ApiContracts.Models.ProductAttributeValue[];
		brand: CeyenneNXT.Products.ApiContracts.Models.Brand;
		organization: CeyenneNXT.Products.ApiContracts.Models.Organization;
		parentProduct: CeyenneNXT.Products.ApiContracts.Models.Product;
		productType: CeyenneNXT.Products.ApiContracts.Models.ProductType;
		sku: string;
		vendorProducts: CeyenneNXT.Products.ApiContracts.Models.VendorProduct[];
	}
	interface ProductAttributeOption {
		attributeID: number;
		code: string;
		productID: number;
	}
	interface ProductAttributeValue {
		attributeCode: string;
		iSOLanguageCode: string;
		value: string;
	}
	interface ProductPagingFilter extends CeyenneNXT.Core.Shared.ApiCommunication.PagingFilter {
		nameOrSKU: string;
		organizationCode: string;
	}
	interface ProductSearchResult {
		category: string;
		companyCode: string;
		description: string;
		id: number;
		licensee: string;
		name: string;
		sku: string;
	}
	interface ProductType {
		code: string;
		name: string;
		organizationCode: string;
	}
	interface RelatedProduct {
		productID: number;
		productRelationTypeID: number;
		relatedProductID: number;
	}
	interface SearchResult<T> {
		pageNumber: number;
		pageSize: number;
		rows: T[];
		totalRows: number;
	}
	interface VAT {
		code: string;
		name: string;
		organizationCode: string;
		percentage: number;
	}
	interface Vendor {
		code: string;
		name: string;
		organizationCode: string;
	}
	interface VendorProduct {
		identifier: string;
		organization: CeyenneNXT.Products.ApiContracts.Models.Organization;
		sku: string;
		vendor: CeyenneNXT.Products.ApiContracts.Models.Vendor;
		vendorProductBarcodes: CeyenneNXT.Products.ApiContracts.Models.VendorProductBarcode[];
		vendorProductPrices: CeyenneNXT.Products.ApiContracts.Models.VendorProductPrice[];
	}
	interface VendorProductBarcode {
		barcode: string;
		barcodeType: CeyenneNXT.Products.ApiContracts.Models.BarcodeType;
		isDefault: boolean;
		sku: string;
		vendor: CeyenneNXT.Products.ApiContracts.Models.Vendor;
	}
	interface VendorProductPrice {
		currency: CeyenneNXT.Products.ApiContracts.Models.Currency;
		includingVAT: boolean;
		organization: CeyenneNXT.Products.ApiContracts.Models.Organization;
		price: number;
		priceType: CeyenneNXT.Products.ApiContracts.Models.PriceType;
		sku: string;
		startdate: Date;
		vat: CeyenneNXT.Products.ApiContracts.Models.VAT;
		vendor: CeyenneNXT.Products.ApiContracts.Models.Vendor;
	}
}
declare module CeyenneNXT.Stock.WebAPI.Models {
	interface Stock {
		availableOn: Date;
		organizationCode: string;
		quantity: number;
		sku: string;
		stockTypeCode: string;
		vendorCode: string;
	}
	interface StockListGetParameters {
		organizationCode: string;
		sku: string;
		stockTypeCode: string[];
	}
	interface StockListRequest {
		organizationCode: string;
		stockTypeCode: string;
	}
}
