using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text.RegularExpressions;
using CeyenneNxt.Core.Constants;
using CeyenneNxt.Core.Enums;
using CeyenneNxt.Core.Interfaces;
using CeyenneNxt.Core.Interfaces.CoreModules;
using CeyenneNxt.Core.ServiceBus;
using CeyenneNxt.Orders.Module.Processors;
using CeyenneNxt.Orders.Shared.Dtos;
using CeyenneNxt.Orders.Shared.Interfaces;
using CeyenneNxt.Products.Shared.Interfaces;
using Microsoft.Practices.ServiceLocation;
using WimBosman.Process.Order.Schema;

namespace WimBosman.Orders.Module.Processors
{
  public class WimBosmanOrderPublishProcessor : OrderPublishProcessor, IOrderPublishProcessor
  {

    public WimBosmanOrderPublishProcessor(ISettingModule settingModule, ILoggingModule loggingModule, IServiceBusModule serviceBusModule, IFileManagingModule fileManagingModule) 
      : base(settingModule, loggingModule, serviceBusModule, fileManagingModule)
    {
    }

    public override OrderDto LoadAndMapToOrderDto(string filepath)
    {
      var salesorder = WimBosman.Process.Order.Schema.salesorder.LoadFromFile(filepath);

      OrderDto orderDto = null;

      switch (salesorder.ordertype)
      {
        case orderType.B2C:
        case orderType.B2CTEST:
          orderDto = SalesOrderImporter.GetOrder(salesorder, "B2C");
          break;
        case orderType.B2P:
        case orderType.B2PTEST:
          orderDto = SalesOrderImporter.GetOrder(salesorder, "B2P");
          break;
        default:
          break;
      }
      return orderDto;
    }

    public override bool ValidateOrder(OrderDto order)
    {
      return base.ValidateOrder(order);
    }

    public override List<IFileHandler> LoadFiles()
    {
      //Log.Info("Start");
      Regex filePatternSalesOrder = new Regex(@"^Order_\d{14}.*.xml$");
      IFileManagingModule fileManagingModule = ServiceLocator.Current.GetInstance<IFileManagingModule>();

      fileManagingModule.SourceDirectory = ConfigurationManager.AppSettings["SourcePath"];
      var files = fileManagingModule.GetFiles(null, @"Order*.xml");

      for (int i = files.Count - 1; i >= 0; i--)
      {
        if (!filePatternSalesOrder.IsMatch(files[i].FileName))
        {
          files.Remove(files[i]);
        }
      }
      return files;
    }

  }



}
