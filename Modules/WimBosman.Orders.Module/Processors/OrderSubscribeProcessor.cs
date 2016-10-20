using System;
using CeyenneNxt.Core.Constants;
using CeyenneNxt.Core.Interfaces.CoreModules;
using CeyenneNxt.Core.ServiceBus;
using CeyenneNxt.Orders.Module.Processors;
using CeyenneNxt.Orders.Shared.Dtos;
using CeyenneNxt.Orders.Shared.Interfaces;
using WimBosman.Orders.Module.Types;

namespace WimBosman.Orders.Module.Processors
{
  public class WimBosmanOrderSubscribeProcessor : OrderSubscribeProcessor, IOrderSubscribeProcessor
  {
    public ISettingModule SettingModule { get; private set; }

    public ILoggingModule LoggingModule { get; private set; }

    public IOrderModule OrderModule { get; private set; }

    public IServiceBusModule ServiceBusModule { get; private set; }

    public WimBosmanOrderSubscribeProcessor(ISettingModule settingModule, ILoggingModule loggingModule, IServiceBusModule serviceBusModule, IOrderModule orderModule) : base(settingModule,loggingModule,serviceBusModule,orderModule)
    {
      SettingModule = settingModule;
      LoggingModule = loggingModule;
      ServiceBusModule = serviceBusModule;
      OrderModule = orderModule;
    }

    protected override void HandleOrder(IMessageEnvelope<OrderDto> envelope)
    {
      base.HandleOrder(envelope);

      var orderDto = envelope.Item;

      OrderModule.AddStatus(orderDto.ID, WBOrderStatuses.RFL.ToString(), DateTime.UtcNow);
      //invoiceModuleCommunication.CreateInvoiceNumber(InvoiceEntityTypes.SalesOrder, order.ID);
    }

  }

  
}
