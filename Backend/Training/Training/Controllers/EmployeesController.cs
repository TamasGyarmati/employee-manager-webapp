using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Training.Data;
using Training.Dtos;
using Training.Entities;

namespace Training.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        IEmployeeRepository _repository;
        public EmployeesController(IEmployeeRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _repository.ReadAsync();

            if (!employees.Any())
                return NotFound();

            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(Guid id)
        {
            var employee = await _repository.ReadByIdAsync(id);

            if (employee is null)
                return NotFound();

            return Ok(employee);
        }

        [HttpPost("json")] // Accepts everything from the params (FromBody)
        public async Task<IActionResult> CreateEmployee([FromBody] Employee employee)
        {
            if (employee is null)
            {
                return NotFound();
            }

            if (employee.Id == Guid.Empty)
            {
                employee.Id = Guid.NewGuid();
            }

            await _repository.CreateAsync(employee);

            return Ok(employee);
        }

        [HttpPost("dto")] // Only accepts the needed params
        public async Task<IActionResult> CreateEmployee(AddEmployeeDto addEmployeeDto)
        {
            if (addEmployeeDto is null) return NotFound();

            var employeeEntity = new Employee()
            {
                Name = addEmployeeDto.Name,
                Email = addEmployeeDto.Email,
                PhoneNumber = addEmployeeDto.PhoneNumber,
                Salary = addEmployeeDto.Salary
            };

            await _repository.CreateAsync(employeeEntity);

            return Ok($"Created the employee: {employeeEntity.Name} at {DateTime.Now}");
        }

        [HttpPut("json")]
        public async Task<IActionResult> UpdateEmployee(Guid id, [FromBody] Employee employee)
        {
            if (employee is null)
                return NotFound();

            await _repository.UpdateAsync(id, employee);

            return Ok($"Updated employee: {employee.Name}");
        }
        
        [HttpPut("dto")]
        public async Task<IActionResult> UpdateEmployee(Guid id, UpdateEmployeeDto updateEmployeeDto)
        {
            if (updateEmployeeDto is null)
                return NotFound();

            var newEmployee = new Employee()
            {
                Name = updateEmployeeDto.Name,
                Email = updateEmployeeDto.Email,
                PhoneNumber = updateEmployeeDto.PhoneNumber,
                Salary= updateEmployeeDto.Salary
            };

            await _repository.UpdateAsync(id, newEmployee);

            return Ok($"Updated employee: {newEmployee.Name}");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await _repository.ReadByIdAsync(id);

            if (employee is null)
            {
                return NotFound();
            }
            
            await _repository.DeleteAsync(id);

            return Ok("Successful delete");
        }
    }
}
