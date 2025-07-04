using Training.Entities;

namespace Training.Data
{
    public interface IEmployeeRepository
    {
        Task CreateAsync(Employee employee);
        Task<IEnumerable<Employee>> ReadAsync();
        Task<Employee?> ReadByIdAsync(Guid id);
        Task UpdateAsync(Guid id, Employee employee);
        Task DeleteAsync(Guid id);
    }
}