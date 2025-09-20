using Repository.Entities.DB;
using Server1Api.DAL;

namespace Server1Api.BL
{
    public class BL : IBL
    {
        IDAL _dal;
        public BL(IDAL dal)
        {
            _dal = dal;
        }
        public async Task<List<Category>> GetCategoriesAsync()
        {
            List<Category> categories = [];
            try
            {
                categories = await _dal.GetCategoriesAsync();
            }
            catch (Exception ex)
            {
                Logger.Error("Error in BL GetCategoriesAsync", ex);
            }
            return categories;
        }

        public async Task<List<Product>> GetProductsAsync(int categoryId)
        {
            List<Product> products = [];
            try
            {
                products = await _dal.GetProductsAsync(categoryId);
            }
            catch (Exception ex)
            {
                Logger.Error("Error in BL GetProductAsync", ex);
            }
            return products;
        }
    }
}
