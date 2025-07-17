using FastEndpoints;
using FluentValidation;
using System.ComponentModel.DataAnnotations;

namespace Training.Entities
{
    public class EmployeeValidator : Validator<Employee>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Giving a name is required!");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Giving an e-mail is required!")
                .EmailAddress().WithMessage("Wrong e-mail format");

            RuleFor(x => x.Salary)
                .GreaterThan(0).WithMessage("The salary must be greater than zero (0)");
        }
    }
}
