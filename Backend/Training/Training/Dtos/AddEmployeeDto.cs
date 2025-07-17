using System.ComponentModel.DataAnnotations;

namespace Training.Dtos
{
    public class AddEmployeeDto
    {
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
