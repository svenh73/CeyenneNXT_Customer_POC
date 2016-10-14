using System.Collections.Generic;
using CeyenneNxt.Products.Shared.Dtos;
using CeyenneNxt.Products.Shared.Interfaces;

namespace WimBosman.Products.Module.Modules
{
    public class ProductModule: IProductModule
    {
      private IProductRepository _productRepository;

      public ProductModule(IProductRepository productRepository)
      {
        _productRepository = productRepository;
      }

      public virtual List<ProductDto> GetProducts()
      {
        var products = _productRepository.GetProducts();
        var productDtos = new List<ProductDto>();
        products.ForEach(p => productDtos.Add(new ProductDto()
        {
          ID = p.ID,
          Name = p.Name
        }));
        return productDtos;
      }
    }
}
