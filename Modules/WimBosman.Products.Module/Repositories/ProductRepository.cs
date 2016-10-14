using System.Collections.Generic;
using CeyenneNxt.Core.Types;
using CeyenneNxt.Products.Shared.Entitites;
using CeyenneNxt.Products.Shared.Interfaces;

namespace WimBosman.Products.Module.Repositories
{
  public class ProductRepository : Repository<Product>, IProductRepository
  {
    public ProductRepository()
    {
      
    }

    public List<Product> GetProducts()
    {
      var products = new List<Product>();
      products.Add(new Product () {ID = 4,Name = "Product D"});
      products.Add(new Product() { ID = 5, Name = "Product E" });
      products.Add(new Product() { ID = 6, Name = "Product F" });
      return products;
    }
  }
}
