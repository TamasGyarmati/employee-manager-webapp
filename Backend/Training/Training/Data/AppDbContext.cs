
using Microsoft.EntityFrameworkCore;
using Training.Entities;

namespace Training.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Employee>().HasData(
        //        new Employee { Id = Guid.Parse("3f2504e0-4f89-11d3-9a0c-0305e82c3301"), Name = "Gyarmati Tamás", Email = "tamasgyarmati@gmail.com", PhoneNumber = "+36501215346", Salary = 100000 },
        //        new Employee { Id = Guid.Parse("6fa459ea-ee8a-3ca4-894e-db77e160355e"), Name = "Kontra Dániel", Email = "danielkontra@gmail.com", PhoneNumber = "+36505269235", Salary = 95000 },
        //        new Employee { Id = Guid.Parse("7d444840-9dc0-11d1-b245-5ffdce74fad2"), Name = "Salétli Csongor", Email = "csongorsaletli@gmail.com", PhoneNumber = "+36201325642", Salary = 115000 }
        //    );
        //}
    }
}
