using CeyenneNxt.Core.Enums;
using CeyenneNxt.Core.Interfaces;
using CeyenneNxt.Products.Shared.Interfaces;
using SimpleInjector;
using SimpleInjector.Advanced;
using WimBosman.Products.Module.Modules;
using WimBosman.Products.Module.Repositories;

namespace WimBosman.Products.Module
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
            break;
          }
        case ApplicationType.WebApi:
          {
            container.Register<IProductApiController, CeyenneNxt.Products.Module.ApiControllers.ProductController>(lifeStyle);
            break;
          }
        case ApplicationType.WebUI:
          {
            container.Register<IProductController, CeyenneNxt.Products.Module.Controllers.ProductController>(lifeStyle);
            break;
          }
      }

      container.Register<IProductModule, ProductModule>(lifeStyle);
    }
  }
}
