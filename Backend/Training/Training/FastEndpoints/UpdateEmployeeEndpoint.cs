using Training.Data;
using FastEndpoints;
using Training.Entities;

namespace Training.FastEndpoints
{
    public class UpdateEmployeeEndpoint : Endpoint<Employee>
    {
        private readonly IEmployeeRepository _repository;
        public UpdateEmployeeEndpoint(IEmployeeRepository repository)
        {
            this._repository = repository;
        }

        public override void Configure()
        {
            Put("api/fast/{id}");
            AllowAnonymous();
            Summary(s =>
            {
                s.Summary = "Frissít egy alkalmazottat ID alapján";
                s.Description = "Add meg az új értékeket az frissítendő alkalmazottnak!";
                s.Params["id"] = "Az alkalmazott GUID azonosítója";
            });
            Validator<EmployeeValidator>();
        }

        public override async Task HandleAsync(Employee employee, CancellationToken ct)
        {
            var id = Route<Guid>("id");

            if (employee is null || id == Guid.Empty)
            {
                await SendNotFoundAsync();
                return;
            }

            await _repository.UpdateAsync(id, employee);

            var response = new
            {
                Message = $"Successfully updated the following employee {employee.Name} at {DateTime.Now}",
                Employee = employee
            };

            await SendAsync(response, 200);
        }
    }
}
