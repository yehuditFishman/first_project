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
        public List<BLUserFromManeger> DetailsFromManeger()
        {
            List<BLUserFromManeger> bluserFromManeger = new List<BLUserFromManeger>();

            users.Read().ForEach(
                e => bluserFromManeger.Add(
                    new BLUserFromManeger()
                    {
                        Name = e.Name,
                        PhonNumber = e.PhonNumber,
                       Email = e?.Email
                    }));
            return bluserFromManeger;
        }
    }
}
