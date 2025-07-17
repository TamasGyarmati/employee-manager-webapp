using FastEndpoints;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Training.Data;
using Training.Entities;

namespace Training.FastEndpoints
{   
    public class GetEmployeeEndpoint : EndpointWithoutRequest
    {
        private readonly IEmployeeRepository _repository;

        public GetEmployeeEndpoint(IEmployeeRepository repository)
        {
            this._repository = repository;
        }

        public override void Configure()
        {
            Get("/api/fast/{id}");
            AllowAnonymous();
            Summary(s =>
            {
                s.Summary = "Lekéri az adott alkalmazottat ID alapján";
            });
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var id = Route<Guid>("id");

            var employee = await _repository.ReadByIdAsync(id);

            if (employee is null)
                await SendNotFoundAsync();

            var response = new
            {
                Message = $"Successfully read the following employee {employee.Name} at {DateTime.Now}",
                Employee = employee
            };

            await SendAsync(response, 200);
        }
    }
}
