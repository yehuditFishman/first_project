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
    public class BLUserService : IBLUser
    {
        IUser user;
        public BLUserService(IDal dal) 
        { 
            user = dal.User;
        }
        public List<BLUser> ReadUsers()
        {
            List<BLUser> bluser = new List<BLUser>();

            user.Read().ForEach(
                e => bluser.Add(
                    new BLUser()
                    {
                        Name = e.Name,
                        PhonNumber = e.PhonNumber,
                        Email = e?.Email,
                        Password = e.Password
                    }));
            return bluser;
        
    }

        public void UpdateUser(Client user)
        {
            this.user.Update(user);
        }
    }
}
