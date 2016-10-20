using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using CeyenneNxt.Core.Helpers;
using CeyenneNxt.Orders.Shared.Dtos;
using WimBosman.Process.Order.Schema;

namespace WimBosman.Orders.Module.Processors
{
  public class SalesOrderImporter
  {


    public static OrderDto GetOrder(salesorder websiteOrder, string orderType)
    {
      var order = new OrderDto
      {
        BackendID = websiteOrder.order_id,
        ChannelIdentifier = orderType,
        OrderType = "SalesOrder",
        AttributeValues = GetOrderAttributes(websiteOrder),
        OrderLines = GetOrderLines(websiteOrder),
        Addresses = new List<AddressDto>()
      };

      if (websiteOrder.shipping != null)
      {
        order.Addresses.Add(GetShippingAddress(websiteOrder.shipping));
        order.Customer = GetShippingCustomer(websiteOrder.shipping);
      }

      if (websiteOrder.billing != null)
      {
        order.Addresses.Add(GetBillingAddress(websiteOrder.billing));
      }

      return order;
    }

    private static AddressDto GetBillingAddress(Billing billing)
    {
      var address = new AddressDto
      {
        Type = new AddressTypeDto { Name = "Billing", Code = "billing" },
        Street = billing.street,
        ZIPCode = billing.postcode,
        City = billing.city,
        Country = new CountryDto { Name = billing.countryid.ToString(), Code = billing.countryid.ToString() },
        Company = billing.company,
        BackendID = HashAddress(billing.street, billing.city, billing.postcode, billing.countryid.ToString())
      };

      return address;
    }
    private static AddressDto GetShippingAddress(Shipping shipping)
    {
      var address = new AddressDto
      {
        Type = new AddressTypeDto { Name = "Shipping", Code = "shipping" },
        Street = shipping.street,
        ZIPCode = shipping.postcode,
        City = shipping.city,
        Country = new CountryDto { Name = shipping.countryid.ToString(), Code = shipping.countryid.ToString() },
        Company = shipping.company,
        BackendID = HashAddress(shipping.street, shipping.city, shipping.postcode, shipping.countryid.ToString())
      };

      return address;
    }
    private static CustomerDto GetShippingCustomer(Shipping shipping)
    {
      var customer = new CustomerDto
      {
        BackendId = HashCustomer(shipping.firstname.Trim(), shipping.lastname.Trim()),
        FullName = string.Format("{0} {1}", shipping.firstname.Trim(), shipping.lastname.Trim()).Trim(),
        FirstName = shipping.firstname.Trim(),
        LastName = shipping.lastname.Trim()
      };

      return customer;
    }


    private static List<OrderLineDto> GetOrderLines(salesorder websiteOrder)
    {
      return websiteOrder.items.Select(ol => new OrderLineDto
      {
        ExternalProductIdentifier = ol.sku,
        ExternalOrderLineID = ol.position.ToString(CultureInfo.InvariantCulture),
        Quantity = ol.qtyordered,
        OrderLineQuantityUnit = new OrderLineQuantityUnitDto { Name = "Pieces", Code = "PCS" },
        AttributeValues = GetOrderLineAttributes(ol),
        UnitPrice = ol.price,
        TotalPrice = ol.price
      }).ToList();
    }


    private static List<AttributeValueDto> GetOrderAttributes(salesorder websiteOrder)
    {
      var attributes = new List<AttributeValueDto>
      {
        GetAttributeValue("languagecode", websiteOrder.languagecode),
        GetAttributeValue("customertaxvat", websiteOrder.customertaxvat),
        GetAttributeValue("logisticdebitor", websiteOrder.logisticdebitor),
        GetAttributeValue("createdat", websiteOrder.createdat.ToString("yyyy-MM-dd HH:mm:ss")),
        GetAttributeValue("totalqtyorderred", websiteOrder.totalqtyordered.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("customizedArticles", websiteOrder.customizedArticles.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("ordercurrencycode", websiteOrder.ordercurrencycode.ToString()),
        GetAttributeValue("basecurrencycode", websiteOrder.basecurrencycode.ToString()),
        GetAttributeValue("ismultipayment", websiteOrder.ismultipayment.ToString()),
        GetAttributeValue("subtotal", websiteOrder.subtotal.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basesubtotal", websiteOrder.basesubtotal.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("shippingamount", websiteOrder.shippingamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("baseshippingamount", websiteOrder.baseshippingamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("shippingtaxpercent", websiteOrder.shippingtaxpercent.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("shippingtaxamount", websiteOrder.shippingtaxamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("baseshippingtaxamount", websiteOrder.baseshippingtaxamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("codfee", websiteOrder.codfee.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basecodfee", websiteOrder.basecodfee.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("codtaxpercent", websiteOrder.codtaxpercent.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("codtax", websiteOrder.codtax.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basecodtax", websiteOrder.basecodtax.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("discountdescription", websiteOrder.discountdescription),
        GetAttributeValue("discountamount", websiteOrder.discountamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basediscountamount", websiteOrder.basediscountamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("employeediscount", websiteOrder.employeediscount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("baseemployeediscount", websiteOrder.baseemployeediscount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("shopcreditamount", websiteOrder.shopcreditamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("baseshopcreditamount", websiteOrder.baseshopcreditamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("taxamount", websiteOrder.taxamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basetaxamount", websiteOrder.basetaxamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("grandtotal", websiteOrder.grandtotal.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basegrandtotal", websiteOrder.basegrandtotal.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("email", websiteOrder.billing.email),
        GetAttributeValue("telephone", websiteOrder.billing.telephone),
        GetAttributeValue("baseorderType", websiteOrder.ordertype.ToString())

      };


      if (websiteOrder.payment != null)
      {
        attributes.Add(GetAttributeValue("payment", websiteOrder.payment.method));
      }

      return attributes;
    }
    private static List<AttributeValueDto> GetOrderLineAttributes(Item orderLine)
    {
      var attributes = new List<AttributeValueDto>
      {
        GetAttributeValue("name", orderLine.name),
        GetAttributeValue("price", orderLine.price.ToString(CultureInfo.InvariantCulture)),

        GetAttributeValue("baseprice", orderLine.baseprice.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("discountpercent", orderLine.discountpercent.ToString(CultureInfo.InvariantCulture)),

        GetAttributeValue("discountamount", orderLine.discountamount.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("basediscountamount", orderLine.basediscountamount.ToString(CultureInfo.InvariantCulture)),

        GetAttributeValue("taxpercent", orderLine.taxpercent.ToString(CultureInfo.InvariantCulture)),
        GetAttributeValue("taxamount", orderLine.taxamount.ToString(CultureInfo.InvariantCulture)),

        GetAttributeValue("basetaxamount", orderLine.basetaxamount.ToString(CultureInfo.InvariantCulture)),
      };

      #region Product options
      //save as individual attributes
      if (orderLine.productoptions != null && orderLine.productoptions.Any())
      {
        int counter = 1;
        foreach (var productionOption in orderLine.productoptions)
        {
          attributes.Add(new AttributeValueDto()
          {
            Code = $"FreeLabelProductOption{counter}",
            Name = $"FreeLabelProductOption{counter}",
            Value = productionOption.label
          });

          attributes.Add(new AttributeValueDto()
          {
            Code = $"FreeValueProductOption{counter}",
            Name = $"FreeValueProductOption{counter}",
            Value = productionOption.value
          });

          counter++;
        }
      }
      #endregion

      #region Options
      if (orderLine.options != null && orderLine.options.Any())
      {
        int counter = 1;
        foreach (var productionOption in orderLine.options)
        {

          attributes.Add(new AttributeValueDto()
          {
            Code = $"FreeLabelOption{counter}",
            Name = $"FreeLabelOption{counter}",
            Value = productionOption.label
          });

          attributes.Add(new AttributeValueDto()
          {
            Code = $"FreeValueOption{counter}",
            Name = $"FreeValueOption{counter}",
            Value = productionOption.value
          });

          attributes.Add(new AttributeValueDto()
          {
            Code = $"FreePrintValueOption{counter}",
            Name = $"FreePrintValueOption{counter}",
            Value = productionOption.printvalue
          });

          counter++;
        }
        #endregion
      }

      return attributes;
    }

    private static AttributeValueDto GetAttributeValue(string attributeCode, string attributeValue)
    {
      return new AttributeValueDto { Name = attributeCode, Code = attributeCode, Value = attributeValue };
    }

    private static string HashAddress(string street, string city, string postcode, string country)
    {
      var addressForHashing = string.Format($"{street} {city} {postcode} {country}");
      return Hash(addressForHashing);
    }
    private static string HashCustomer(string firstName, string lastName)
    {
      var customerForHashing = string.Format($"{firstName} {lastName}");
      return Hash(customerForHashing);
    }
    private static string Hash(string input)
    {
      return Hashing.ComputeHash(Encoding.UTF8.GetBytes(input));
    }
  }
}
