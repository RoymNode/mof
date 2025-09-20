
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Repository.Entities.DB;
using Repository.Entities.DB.Context;

namespace Server1Api.DAL
{
    public class DAL : IDAL
    {
        private readonly AppDbContext _context;
        public DAL(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            List<Category> categories = [];
            try
            {
                categories = await _context.Categories.ToListAsync();
            }
            catch (Exception ex)
            {
                Logger.Error("Error in DAL GetCategoriesAsync", ex);
            }
            return categories;
        }

        public async Task<List<Product>> GetProductsAsync(int categoryId)
        {
            List<Product> products = [];
            try
            {
                products = await _context.Products.Where(p => p.CategoryId == categoryId).ToListAsync();
            }
            catch (Exception ex)
            {
                Logger.Error("Error in DAL GetProductsAsync", ex);
            }
            return products;
        }
    }
}
