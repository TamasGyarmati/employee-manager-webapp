using Microsoft.AspNetCore.Http.HttpResults;
using Training.Data;
using Training.Dtos;
using Training.Entities;

namespace Training.Endpoints
{
    public static class EmployeesEndpointsFix
    {
        public static void MapEmployeeEndpointsFix(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/employees");

            // HttpGet
            group.MapGet("/", async (IEmployeeRepository _repository) =>
            {
                var employees = await _repository.ReadAsync();

                if (!employees.Any())
                    return Results.NotFound();

                return Results.Ok(employees);
            });

            // HttpGet by ID
            group.MapGet("/{id}", async (IEmployeeRepository _repository, Guid id) =>
            {
                var employee = await _repository.ReadByIdAsync(id);

                if (employee is null)
                    return Results.NotFound();

                return Results.Ok(employee);
            });

            // HttpPost by JSON
            group.MapPost("/json", async (IEmployeeRepository _repository, Employee employee) =>
            {
                if (employee is null)
                    return Results.NotFound();

                if (employee.Id == Guid.Empty)
                    employee.Id = Guid.NewGuid();

                await _repository.CreateAsync(employee);

                return Results.Ok(employee);
            });

            // HttpPost by DTO
            group.MapPost("/dto", async (IEmployeeRepository _repository, AddEmployeeDto employee) =>
            {
                if (employee is null)
                    return Results.NotFound();

                var employeeEntity = new Employee()
                {
                    Name = employee.Name,
                    Email = employee.Email,
                    PhoneNumber = employee.PhoneNumber,
                    Salary = employee.Salary
                };

                await _repository.CreateAsync(employeeEntity);

                return Results.Ok($"Created the employee: {employeeEntity.Name} at {DateTime.Now}");
            });

            // HttpPut by JSON
            group.MapPut("/json", async (IEmployeeRepository _repository, Employee employee, Guid id) =>
            {
                if (employee is null)
                    return Results.NotFound();

                await _repository.UpdateAsync(id, employee);

                return Results.Ok($"Updated employee: {employee.Name}");
            });

            // HttpPut by DTO
            group.MapPut("/dto", async (IEmployeeRepository _repository, UpdateEmployeeDto employee, Guid id) =>
            {
                if (employee is null)
                    return Results.NotFound();

                var employeeEntity = new Employee()
                {
                    Name = employee.Name,
                    Email = employee.Email,
                    PhoneNumber = employee.PhoneNumber,
                    Salary = employee.Salary
                };

                await _repository.UpdateAsync(id, employeeEntity);

                return Results.Ok($"Updated employee: {employeeEntity.Name}");
            });

            // HttpDelete
            group.MapDelete("/", async (IEmployeeRepository _repository, Guid id) =>
            {
                var employee = await _repository.ReadByIdAsync(id);

                if (employee is null)
                    return Results.NotFound();

                await _repository.DeleteAsync(id);

                return Results.Ok("Successful delete");
            });
        }
    }
}
