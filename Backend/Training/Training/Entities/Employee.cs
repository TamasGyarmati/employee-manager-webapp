using System.ComponentModel.DataAnnotations;

namespace Training.Entities
{
    public class Employee
    {
        // [Key] would only need if property wasn't named 'ID' 
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        [Required]
        public decimal Salary { get; set; }
    }
}
