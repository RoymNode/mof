using Repository.Entities.DB;

namespace Server1Api.DAL
{
    public interface IDAL
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<List<Product>> GetProductsAsync(int categoryId);
    }
}
