const apiUrl = "http://localhost:5290";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const salaryInput = document.getElementById("salaryInput");

const regexPhone = /^\+?\d+$/;
const regexName = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\s]+$/;

fetch(`${apiUrl}/api/employees/${id}`)
  .then((response) => {
    if (!response.ok) throw new Error("Employee not found");
    return response.json();
  })
  .then((employee) => {
    nameInput.value = employee.name;
    emailInput.value = employee.email;
    phoneInput.value = employee.phoneNumber;
    salaryInput.value = employee.salary;
  })
  .catch((err) => {
    alert("Error loading employee: " + err.message);
  });

document.querySelector("#editForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (salaryInput.value < 0) {
    alert("Salary can't be negative!");
    return;
  }

  if (!regexPhone.test(phoneInput.value)) {
    alert("Use only '+' and numbers in the phone number input.");
    return;
  }

  if (!regexName.test(nameInput.value)) {
    alert("Don't use any symbols or numbers!");
    return;
  }

  const updatedEmployee = {
    name: nameInput.value,
    email: emailInput.value,
    phoneNumber: phoneInput.value,
    salary: parseFloat(salaryInput.value),
  };

  fetch(`${apiUrl}/api/employees/json?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update employee");
      alert("Employee updated succesfully");
      window.location.href = "../index.html";
    })
    .catch((err) => {
      alert("Error updating employee: " + err.message);
    });
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  window.location.href = "../index.html";
});
