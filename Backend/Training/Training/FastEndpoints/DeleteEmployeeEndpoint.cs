using FastEndpoints;
using Microsoft.AspNetCore.Mvc;
using Training.Data;

namespace Training.FastEndpoints
{
    //public record class DeleteEmployeeRequest(Guid Id);
    public class DeleteEmployeeEndpoint : EndpointWithoutRequest
    {
        private readonly IEmployeeRepository _repository;
        public DeleteEmployeeEndpoint(IEmployeeRepository repository)
        {
            this._repository = repository;
        }
        public override void Configure()
        {
            Delete("/api/fast/{id}");
            AllowAnonymous();
            Summary(s =>
            {
                s.Summary = "Töröl egy alkalmazottat ID alapján";
                s.Params["id"] = "Az alkalmazott GUID azonosítója";
            });
        }

        public override async Task HandleAsync(CancellationToken ct)
        {          
            var id = Route<Guid>("id");
            await _repository.DeleteAsync(id);
            await SendAsync($"Successfully deleted the employee at {DateTime.Now}", 200);
        }    
    }
}
