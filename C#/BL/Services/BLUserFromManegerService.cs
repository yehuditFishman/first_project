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
    public class BLUserFromManegerService : IBLUserFromManeger
    {
        IUser users;

        public BLUserFromManegerService(IDal dal)
        {
            users = dal.User;
        }

        public BLUserFromManeger DetailsFromManeger(int userID)
        {

            var user =
            users.Read().FirstOrDefault(u => u.Id == userID);
            return new BLUserFromManeger
            {
                Name = user.Name,

                PhonNumber = user.PhonNumber,

                Email = user.Email
            };
        }

    }
}
