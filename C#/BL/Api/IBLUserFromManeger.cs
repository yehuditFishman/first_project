using BL.Models;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLUserFromManeger
    {
        BLUserFromManeger DetailsFromManeger(int userId);
    }
}

