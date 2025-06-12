using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLUserPermissionService : IBLUserPermission
    {
        IUser user;
        public BLUserPermissionService(IDal dal)
        {
            user = dal.User;
        }
        public List<BLUserPermission> ReadUsers()
        {
            List<BLUserPermission> bluser = new List<BLUserPermission>();

            user.Read().ForEach(
                e => bluser.Add(
                    new BLUserPermission()
                    {
                        Id = e.Id,
                        AccessPermission = e.AccessPermission,
                        Password = e.Password
                    }));
            return bluser;
        }
    }
}
