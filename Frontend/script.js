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

/* Regex */
const regexPhone = /^\+?\d+$/;
const regexName = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű\s]+$/;

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
  let aToMail = document.createElement("a");
  aToMail.setAttribute("href", "mailto:" + employee.email);
  aToMail.innerText = employee.email;
  aToMail.classList.add("tableLinks");
  tdEmail.appendChild(aToMail);

  let tdPhone = document.createElement("td");
  tdPhone.innerText = employee.phoneNumber;

  let tdSalary = document.createElement("td");
  const salaryAmount = employee.salary;
  const formattedSalaryAmount = salaryAmount.toLocaleString("hu-HU") + " Ft";
  tdSalary.innerText = formattedSalaryAmount;

  let tdEditBtn = document.createElement("td");
  let createEditBtn = document.createElement("button");
  createEditBtn.setAttribute("type", "button");
  createEditBtn.classList.add("btn", "btn-warning");
  createEditBtn.innerText = "Edit";
  createEditBtn.addEventListener("click", handleEdit);
  createEditBtn.addEventListener("click", () => {
    localStorage.setItem("scrollPosition", window.scrollY);
    window.location.href = `EditHandling/edit.html?id=${id}`;
  });

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

/* Get All Employee API call */
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

document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".scroll-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        } else {
          entry.target.classList.remove("revealed");
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
});

/* After editing go back to the same place */
window.addEventListener("load", () => {
  const y = localStorage.getItem("scrollPosition");
  if (y !== null) {
    window.scrollTo(0, parseInt(y));
    localStorage.removeItem("scrollPosition");
  }
});

/* Create (Add / Post) */
addBtn.addEventListener("click", (e) => {
  e.preventDefault(); /* form submit doesn't re-load */

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

  const rawPhone = phoneInput.value;
  const cleanedPhone = rawPhone.replace(/\s+/g, "");

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

      document
        .getElementById("database")
        .scrollIntoView({ behavior: "smooth" });
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
});
