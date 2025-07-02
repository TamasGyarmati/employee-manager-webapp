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
        salary: salary
    }
    
    fetch(employeePostUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    })
    .then(response => {
        if (!response.ok) throw new Error("API hiba");
        return response.text();
    })    
    .then(data => {
        console.log("Sikeres POST:", data);

        let tr = document.createElement("tr");

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
            const editName = row.querySelector("td").innerText;
            console.log(name);
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
        console.error("Hiba: ", error);
        alert("Nem sikerült menteni az adatot.")
    })
});



