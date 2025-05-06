using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services;

public class UserService : IUser
{

    DatabaseManager DatabaseManager;

    public UserService(DatabaseManager databaseManager)
    {
        DatabaseManager = databaseManager;
    }
    public void Create(Client user)
    {
        if (user == null)
            throw new ArgumentNullException("not defind");
        DatabaseManager.Clients.Add(user);
        DatabaseManager.SaveChanges();
    }

    public void Delete(Client item)
    {
        if (item == null)
            throw new ArgumentNullException("user is empty");
        var userToDelete = DatabaseManager.Clients.FirstOrDefault(p => p.Id == item.Id);
        if (userToDelete == null)
            throw new ArgumentNullException("user not found");

        DatabaseManager.Clients.Remove(userToDelete);
        DatabaseManager.SaveChanges();
    }

    public List<Client> Read()
    {
        return DatabaseManager.Clients.ToList();
    }

    public void Update(Client item)
    {

        if (item == null)
        {
            throw new ArgumentNullException("user not found");
        }

        var userToUpdate = DatabaseManager.Clients.FirstOrDefault(p => p.Id == item.Id);
        if (userToUpdate != null)
        {
            userToUpdate.Name = item.Name;
            userToUpdate.Email = item.Email;
            userToUpdate.Password = item.Password;
            userToUpdate.PhonNumber= item.PhonNumber;
            DatabaseManager.SaveChanges();
        }
    }
}
