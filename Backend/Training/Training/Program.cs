using FastEndpoints;
using FastEndpoints.Swagger;
using Microsoft.EntityFrameworkCore;
using Training.Data;
using Training.Endpoints;
using Training.ExtensionMethods;

namespace Training
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Swagger + Endpoint registration
            builder.Services.AddControllers();                    
            builder.Services.AddEndpointsApiExplorer()
                            .AddSwaggerGen()
                            .AddFastEndpoints()                            
                            .SwaggerDocument();

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });            

            // Connection String + Database + Dependency Injection
            var connString = builder.Configuration.GetConnectionString("Default");

            builder.Services.AddDbContext<AppDbContext>(options => 
                     options.UseSqlServer(connString));

            // IoC Container
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();                       

            var app = builder.Build();

            app.UseCors("AllowAll");

            app.MapControllers();
            app.UseFastEndpoints()
               .UseSwaggerGen();
               
            app.MapEmployeeEndpoints();

            // Swagger
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();                
            }            

            await app.MigrationUpdateAsync(); // runs migration updates asyncronally

            app.Run();
        }
    }
}
