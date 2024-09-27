using Microsoft.EntityFrameworkCore;
using UCompensarAPI.Config;
using UCompensarAPI.DataAccess.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Conexion BD
var cadena = builder.Configuration.GetConnectionString("CadenaConexion");
builder.Services.AddDbContext<TupatinetaContext>(options => options.UseSqlServer(cadena));
//Se define clase contenedora IoC para la inyección de dependencias
builder.Services.AddConfig(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Se define Middleware estandar para el control de errores
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
