using FastEndpoints;
using Microsoft.AspNetCore.Mvc;
using Training.Data;

namespace Training.FastEndpoints
{
    public record class DeleteEmployeeRequest(Guid Id);
    public class DeleteEmployeeEndpoint : Endpoint<DeleteEmployeeRequest>
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

        public override async Task HandleAsync(DeleteEmployeeRequest req, CancellationToken ct)
        {          
            await _repository.DeleteAsync(req.Id);
            await SendAsync($"Successfully deleted the employee at {DateTime.Now}", 200);
        }    
    }
}
