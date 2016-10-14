using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CeyenneNxt.Core.Interfaces;
using CeyenneNxt.Process.Product.Processors;
using CeyenneNxt.Products.Shared.Dtos;
using CeyenneNxt.Products.Shared.Interfaces;

namespace WimBosman.Process.Product.Processors
{
  public class PublishProductB2B : ProductPublishProcessor, IProductPublishProcessor
  {
    public void Execute(IProductModule productModule,ISettingModule settingModule, ILoggingModule loggingModule)
    {
      throw new NotImplementedException();
    }

    public override ProductDto MapToProductDto(object sourceproduct)
    {
      return base.MapToProductDto(sourceproduct);
    }
  }
}
