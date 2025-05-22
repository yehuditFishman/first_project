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

// ����� ������ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173") // ����� �� �����
               .AllowAnyHeader() // ���� �� �-Headers (���� Authorization)
               .AllowAnyMethod(); // ���� �� ������� (GET, POST ���')
    });
});

// ����� �������
builder.Services.AddControllers();
builder.Services.AddSingleton<IDal, DalManeger>();
builder.Services.AddScoped<IBL, BLManeger>();
builder.Services.AddSingleton<IBLUserFromManeger, BLUserFromManegerService>();
builder.Services.AddSingleton<IBLFlight, BLFlightService>();
builder.Services.AddSingleton<IBLUser, BLUserService>();
builder.Services.AddSingleton<IBLUserPermission, BLUserPermissionService>();
builder.Services.AddSingleton<IBLBooking, BLBookingService>();


var app = builder.Build();

// ����� �-CORS
app.UseCors("AllowReactApp");

// ����� Middleware �������
app.UseRouting();
app.MapControllers();

app.Run();