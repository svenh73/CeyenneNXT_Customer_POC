using System.Web.Http;
using System.Web.Http.Dispatcher;
using CeyenneNxt.Core.Configuration;
using CeyenneNxt.Core.Factories;
using CeyenneNxt.Core.Ioc;
using SimpleInjector;
using SimpleInjector.Integration.WebApi;

namespace CeyenneNxt.Web.WebApi
{
  public class WebApiApplication : System.Web.HttpApplication
  {
    protected void Application_Start()
    {
      GlobalConfiguration.Configure(WebApiConfig.Register);

      var container = SimpleInjectorHelper.CreateKernel(new WebApiRequestLifestyle());

      var path = Server.MapPath("bin");

      SimpleInjectorHelper.LoadFromDirectory(container, path, "CeyenneNxt.*dll", Lifestyle.Scoped);
      SimpleInjectorHelper.LoadFromDirectory(container, path, CNXTEnvironments.Current.CustomerName + ".*dll", Lifestyle.Scoped);

      container.RegisterWebApiControllers(GlobalConfiguration.Configuration);

      var assemblyResolver = new CustomAssembliesResolver();
      assemblyResolver.CustomerName = CNXTEnvironments.Current.CustomerName;
      GlobalConfiguration.Configuration.Services.Replace(typeof(IAssembliesResolver), assemblyResolver);

      GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerSelector), new NamespaceHttpControllerSelector(GlobalConfiguration.Configuration));

      GlobalConfiguration.Configuration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
    }
  }
}
