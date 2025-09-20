using Repository.Entities.DB;

namespace Server1Api.BL
{
    public interface IBL
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<List<Product>> GetProductsAsync(int categoryId);
    }
}
