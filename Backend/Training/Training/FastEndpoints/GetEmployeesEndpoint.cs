using FastEndpoints;
using Microsoft.AspNetCore.Mvc;
using Training.Data;
using Training.Entities;

namespace Training.FastEndpoints
{
    public class GetEmployeesEndpoint : EndpointWithoutRequest
    {
        private readonly IEmployeeRepository _repository;

        public GetEmployeesEndpoint(IEmployeeRepository repository)
        {
            this._repository = repository;
        }

        public override void Configure()
        {
            Get("/api/fast");
            AllowAnonymous();
            Summary(s =>
            {
                s.Summary = "Lekéri az összes alkalmazottat";
            });            
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var employees = await _repository.ReadAsync();

            if (employees is null)
                await SendNotFoundAsync();

            var response = new
            {
                Message = $"Successful read at {DateTime.Now}",
                Employees = employees
            };

            await SendAsync(response, 200);
        }
    }
}
