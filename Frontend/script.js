/* Api */
const apiUrl = "http://localhost:5290";
const employeePostUrl = `${apiUrl}/api/employees/json`;
const employeesGetUrl = `${apiUrl}/api/employees`;

/* Buttons */
const addBtn = document.getElementById("addButton");

/* Inputs */
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const salaryInput = document.querySelector("#salaryInput");

/* Table */
const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");

/* Others */
const defaultCountryCode = "+36";

/* Functions */
function handleDelete(e) {
  const row = e.target.closest("tr");
  const id = row.dataset.id;

  if (!id) {
    alert("Error: there's no ID paired to this row");
    return;
  }

  const confirmed = confirm("Do you wish to delete the employee?");
  if (!confirmed) {
    return;
  }

  fetch(`${apiUrl}/api/employees?id=${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Couldn't delete employee.");
      }

      console.log(response.text());

      row.remove(); // kitörli a táblázatból
    })
    .catch((error) => {
      console.error("Deleting error: ", error);
      alert("There has been an error while deleting.");
    });
}

function handleEdit(e) {
  const row = e.target.closest("tr");
  const id = row.dataset.id;

  window.location.href = `EditHandling/edit.html?id=${id}`;
}

function createEmployeeRow(employee) {
  let tr = document.createElement("tr");
  tr.dataset.id = employee.id;

  let tdName = document.createElement("td");
  tdName.innerText = employee.name;

  let tdEmail = document.createElement("td");
  tdEmail.innerText = employee.email;

  let tdPhone = document.createElement("td");
  tdPhone.innerText = employee.phoneNumber;

  let tdSalary = document.createElement("td");
  const salaryAmount = employee.salary;
  const formattedSalaryAmount = salaryAmount.toLocaleString('hu-HU') + ' Ft';
  tdSalary.innerText = formattedSalaryAmount;

  let tdEditBtn = document.createElement("td");
  let createEditBtn = document.createElement("button");
  createEditBtn.setAttribute("type", "button");
  createEditBtn.classList.add("btn", "btn-warning");
  createEditBtn.innerText = "Edit";
  createEditBtn.addEventListener("click", handleEdit);

  let tdDeleteBtn = document.createElement("td");
  let createDeleteBtn = document.createElement("button");
  createDeleteBtn.setAttribute("type", "button");
  createDeleteBtn.classList.add("btn", "btn-danger");
  createDeleteBtn.innerText = "Delete";
  createDeleteBtn.addEventListener("click", handleDelete);

  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(tdPhone);
  tr.appendChild(tdSalary);
  tdEditBtn.appendChild(createEditBtn);
  tdDeleteBtn.appendChild(createDeleteBtn);
  tr.appendChild(tdEditBtn);
  tr.appendChild(tdDeleteBtn);

  tbody.appendChild(tr);
}

function loadEmployees() {
  fetch(employeesGetUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Get request failed.");
      return response.json();
    })
    .then((employees) => {
      tbody.innerHTML = "";
      employees.forEach((employee) => {
        createEmployeeRow(employee);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

window.addEventListener("DOMContentLoaded", loadEmployees);

/* Create (Add / Post) */
addBtn.addEventListener("click", () => {
  const rawPhone = phoneInput.value;
  const cleanedPhone = rawPhone.replace(/\s+/g, '');
  
  const newEmployee = {
    name: nameInput.value,
    email: emailInput.value,
    phoneNumber: cleanedPhone,
    salary: parseFloat(salaryInput.value),
  };

  fetch(employeePostUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEmployee),
  })
    .then((response) => {
      if (!response.ok) throw new Error("API error");
      return response.json();
    })
    .then((employee) => {
      console.log("Succesful POST:", employee);

      createEmployeeRow(employee);

      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      salaryInput.value = "";
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
});
