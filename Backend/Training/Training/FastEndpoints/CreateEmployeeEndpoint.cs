using FastEndpoints;
using Training.Data;
using Training.Entities;

namespace Training.FastEndpoints
{
    public class CreateEmployeeEndpoint : Endpoint<Employee>
    {
        private readonly IEmployeeRepository _repository;
        public CreateEmployeeEndpoint(IEmployeeRepository repository)
        {
            this._repository = repository;
        }

        public override void Configure()
        {
            Post("/api/fast");
            AllowAnonymous();
            Summary(s =>
            {
                s.Summary = "Létrehoz egy alkalmazottat a megadott paraméterek alapján";
                s.Description = "Add meg az értékeket a létrehozandó alkalmazottnak!";                
            });
            Validator<EmployeeValidator>();
        }

        public override async Task HandleAsync(Employee employee, CancellationToken ct)
        {
            await _repository.CreateAsync(employee);

            // nameless object
            var response = new
            {
                Message = $"Created the following employee {employee.Name} at {DateTime.Now}",
                Employee = employee
            };

            await SendOkAsync(response);
        }
    }
}
