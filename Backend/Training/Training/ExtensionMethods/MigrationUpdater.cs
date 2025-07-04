using Microsoft.EntityFrameworkCore;
using Training.Data;

namespace Training.ExtensionMethods
{
    public static class MigrationUpdater
    {
        public static async Task MigrationUpdateAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await dbContext.Database.MigrateAsync();
        }
    }
}
