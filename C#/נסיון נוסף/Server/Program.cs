using BL;
using BL.Api;
using BL.Models;
using BL.Services;
using DAL;
using DAL.Api;
using DAL.Models;
using DAL.Services;

//var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddControllers();
////builder.Services.AddSingleton<DatabaseManager>();
////builder.Services.AddSingleton<IUser, UserService>();
//builder.Services.AddSingleton<IDal , DalManeger>();
//builder.Services.AddSingleton<IBLUser, BLUserService>();
//var app = builder.Build();

//app.MapControllers();

//app.Run();



var builder = WebApplication.CreateBuilder(args);

// הוספת שירותי CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173") // כתובת צד הלקוח
               .AllowAnyHeader() // התרת כל ה-Headers (למשל Authorization)
               .AllowAnyMethod(); // התרת כל המתודות (GET, POST וכו')
    });
});

// הוספת שירותים
builder.Services.AddControllers();
builder.Services.AddSingleton<IDal, DalManeger>();
builder.Services.AddScoped<IBL, BLManeger>();
builder.Services.AddSingleton<IBLUserFromManeger, BLUserFromManegerService>();
builder.Services.AddSingleton<IBLFlight, BLFlightService>();
builder.Services.AddSingleton<IBLUser, BLUserService>();
builder.Services.AddSingleton<IBLUserPermission, BLUserPermissionService>();
builder.Services.AddSingleton<IBLBooking, BLBookingService>();


var app = builder.Build();

// שימוש ב-CORS
app.UseCors("AllowReactApp");

// הוספת Middleware לנתיבים
app.UseRouting();
app.MapControllers();

app.Run();