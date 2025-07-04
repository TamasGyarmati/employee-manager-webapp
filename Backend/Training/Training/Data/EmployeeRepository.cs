using Training.Entities;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace Training.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<Employee>> ReadAsync()
        {
            var employee = await _context.Employees.ToListAsync();

            return employee;
        }

        public async Task<Employee?> ReadByIdAsync(Guid id)
        {
            var employee = await _context.Employees.FindAsync(id);

            return employee;
        }

        public async Task CreateAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, Employee employee)
        {
            var existingEmployee = await ReadByIdAsync(id);

            existingEmployee.Name = employee.Name;
            existingEmployee.Email = employee.Email;
            existingEmployee.PhoneNumber = employee.PhoneNumber;
            existingEmployee.Salary = employee.Salary;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var neededToDelete = await ReadByIdAsync(id);

            _context.Employees.Remove(neededToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
