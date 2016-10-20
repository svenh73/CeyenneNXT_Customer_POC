using CeyenneNxt.Core.Enums;
using CeyenneNxt.Core.Interfaces;
using CeyenneNxt.Orders.Shared.Interfaces;
using CeyenneNxt.Products.Module.Modules;
using CeyenneNxt.Products.Shared.Interfaces;
using SimpleInjector;
using WimBosman.Orders.Module.Processors;

namespace WimBosman.Orders.Module
{
  public class Bindings : BindingContainer
  {

    public override void AddBindings(Container container, ApplicationType applicationType)
    {
      var lifeStyle = ApplicationTypeToLifeStyle(applicationType);

      switch (applicationType)
      {
        case ApplicationType.Process:
          {
            container.Register<IOrderPublishProcessor, WimBosmanOrderPublishProcessor>(lifeStyle);
            container.Register<IOrderSubscribeProcessor, WimBosmanOrderSubscribeProcessor>(lifeStyle);
            break;
          }
        case ApplicationType.WebApi:
          {
            break;
          }
        case ApplicationType.WebUI:
          {
            break;
          }
      }

    }
  }
}
