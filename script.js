/* Api */
const apiUrl = "http://localhost:5290";
const employeePostUrl = "http://localhost:5290/api/employees/json";

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

/* Create (Add / Post) */
addBtn.addEventListener("click", () => {
    let name = nameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let salary = salaryInput.value;

    const newEmployee = {
        name: name,
        email: email,
        phoneNumber: phone,
        salary: parseFloat(salary)
    };
    
    fetch(employeePostUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
    .then(response => {
        if (!response.ok) throw new Error("API error");
        return response.json();
    })    
    .then(employee => {
        console.log("Succesful POST:", employee);

        let tr = document.createElement("tr");
        tr.dataset.id = employee.id;

        let tdName = document.createElement("td");
        tdName.innerText = name;
        let tdEmail = document.createElement("td");
        tdEmail.innerText = email;
        let tdPhone = document.createElement("td");
        tdPhone.innerText = phone;
        let tdSalary = document.createElement("td");
        tdSalary.innerText = salary;

        let tdEditBtn = document.createElement("td");
        let tdDeleteBtn = document.createElement("td");

        let createEditBtn = document.createElement("button");
        let createDeleteBtn = document.createElement("button");

        createEditBtn.setAttribute("type", "button");
        createEditBtn.classList.add("btn", "btn-warning");
        createEditBtn.innerText = "Edit";
        createDeleteBtn.setAttribute("type", "button");
        createDeleteBtn.classList.add("btn", "btn-danger");
        createDeleteBtn.innerText = "Delete";

        createEditBtn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const id = row.dataset.id;

            window.location.href = `edit.html?id=${id}`;
        })

        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPhone);
        tr.appendChild(tdSalary);
        tdEditBtn.appendChild(createEditBtn);
        tdDeleteBtn.appendChild(createDeleteBtn);
        tr.appendChild(tdEditBtn);
        tr.appendChild(tdDeleteBtn);

        tbody.appendChild(tr);

        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        salaryInput.value = "";
    })
    .catch(error => {
        console.error("Error: ", error);
        alert("Couldn't save the data")
    })
});



