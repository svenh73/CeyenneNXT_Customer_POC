//using System;
//using System.Configuration;
//using System.Text.RegularExpressions;
//using CeyenneNxt.Core.Constants;
//using CeyenneNxt.Core.Enums;
//using CeyenneNxt.Core.Interfaces.CoreModules;
//using CeyenneNxt.Core.ServiceBus;
//using CeyenneNxt.Orders.Shared.Dtos;
//using CeyenneNxt.Orders.Shared.Interfaces;
//using CeyenneNxt.Process.Order.Schema;
//using CeyenneNxt.Process.PublishOrder;
//using CeyenneNxt.Products.Shared.Interfaces;
//using Microsoft.Practices.ServiceLocation;

//namespace CeyenneNxt.Orders.Module.Processors
//{
//  public class OrderPublishProcessor : IOrderPublishProcessor
//  {
//    public ISettingModule SettingModule { get; set; }

//    public ILoggingModule LoggingModule { get; set; }

//    public IProductModule ProductModule { get; set; }

//    public IServiceBusModule ServiceBusModule { get; set; }

//    public OrderPublishProcessor(ISettingModule settingModule, ILoggingModule loggingModule, IServiceBusModule serviceBusModule)
//    {
//      SettingModule = settingModule;
//      LoggingModule = loggingModule;
//      ServiceBusModule = serviceBusModule;
//    }

//    public void Execute()
//    {
//      //Log.Info("Start");
//      Regex filePatternSalesOrder = new Regex(@"^Order_\d{14}.*.xml$");
//      IFileManagingModule fileManagingModule = ServiceLocator.Current.GetInstance<IFileManagingModule>();

//      fileManagingModule.SourceDirectory = ConfigurationManager.AppSettings["SourcePath"];
//      var files = fileManagingModule.GetFiles(null, @"Order*.xml");
//      foreach (var file in files)
//      {
//        if (!filePatternSalesOrder.IsMatch(file.FileName))
//        {
//          continue;
//        }

//        try
//        {
//          var salesorder = Process.Order.Schema.salesorder.LoadFromFile(file.FilePath);

//          OrderDto orderDto = null;

//          switch (salesorder.ordertype)
//          {
//            case orderType.B2C:
//            case orderType.B2CTEST:
//              orderDto = MapToOrderDto(salesorder, "B2C");
//              break;
//            case orderType.B2P:
//            case orderType.B2PTEST:
//              orderDto = MapToOrderDto(salesorder, "B2P");
//              break;
//            default:
//              break;
//          }

//          if (orderDto != null)
//          {
//            var message = ServiceBusModule.CreatEnvelope<OrderDto>();
//            message.Item = orderDto;
//            message.MessageTypeAction = MessageTypeAction.Insert;

//            ServiceBusModule.PublishToQueue(message, QueueNames.OrderImportQueue);
//            file.MoveToSuccessFolder();

//          }
//        }
//        catch (Exception ex)
//        {
//          file.MoveToErrorFolder(ex.Message);
//        }
//      }
//    }

//    public virtual OrderDto MapToOrderDto(salesorder sourceorder,string ordertype)
//    {
//      return SalesOrderImporter.GetOrder(sourceorder, ordertype);
//    }

//  }



//}
