using BL.Api;
using BL.Models;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IBLUser user;
        public UsersController(IBL bl)
        {
            user = bl.user;
        }

        [HttpGet("Users")]
        public ActionResult<List<BLUser>> getUsers()
        {
            return user.ReadUsers();
        }

        [HttpPut("updateUser")]

        public ActionResult<string> UpdateUser([FromBody] Client client)
        {
            user.UpdateUser(client);
            return "the update was succsess";
        }

        [HttpPost("createUser")]
        public ActionResult<string> CreateNewUser([FromBody] Client client)
        {
            user.CreatUser(client);
            return "the add was sucssesfully";
        }

        [HttpGet("{id}")]
        public ActionResult<bool> UserIsExist(int id)
        {
            return user.IsExist(id);
        }
    }
}
