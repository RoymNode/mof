using Microsoft.AspNetCore.Mvc;
using Repository.Entities.DB;
using Server1Api.BL;

namespace Server1Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IBL _bl;
        public ProductsController(IBL bL)
        {
            _bl = bL;
        }

        [HttpGet("categories")]
        public IActionResult GetCategoriesAsync()
        {
            try
            {
                var categories = _bl.GetCategoriesAsync().Result;
                return Ok(categories);
            }
            catch (Exception ex)
            {
                Logger.Error("Error in ProductsController GetCategoriesAsync", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("products")]
        public IActionResult GetProductsAsync([FromQuery] int categoryId)
        {
            try
            {
                var products = _bl.GetProductsAsync(categoryId).Result;
                if (products?.Count > 0)
                    return Ok(products);
                else
                    return NotFound("No products found for the given categoryId");
            }
            catch (Exception ex)
            {
                Logger.Error("Error in ProductsController GetProductAsync", ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
