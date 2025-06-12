using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessPermissionsController : ControllerBase
    {
        IBLUserPermission users;

        public AccessPermissionsController(IBL bl)
        {
            this.users = bl.userPermission;
        }

        [HttpGet("{id}")]
        public ActionResult<string> getAccessPermissions(int id)
        {
            var user = users.ReadUsers().FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return "User not found";
            }

            return user.AccessPermission;
        }
    }
}



