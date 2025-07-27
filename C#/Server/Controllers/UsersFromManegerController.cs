using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using DAL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersFromManegerController : ControllerBase
    {
        IBLUserFromManeger BLuser;


        public UsersFromManegerController(IBLUserFromManeger bluser)
        {
            BLuser = bluser;
        }

        [HttpGet]

        public ActionResult<BLUserFromManeger> getUser(int id)
        {
            return BLuser.DetailsFromManeger(id);
        }

    }
}
    

