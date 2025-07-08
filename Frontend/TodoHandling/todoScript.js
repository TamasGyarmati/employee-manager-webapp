const activityBtn = document.querySelector("#activity");
const goBackBtn = document.querySelector("#goBack");
const table = document.querySelector(".table");
const tbody = document.querySelector("tbody");
const secondTitle = document.querySelector(".secondTitle");
const LS_KEY = "todoActivities";
let count = 0;

window.addEventListener("load", () => {
  renderTable();

  const elements = document.querySelectorAll(".scroll-reveal");
  elements.forEach(el => el.classList.add("revealed"));
});

activityBtn.addEventListener("click", () => {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  // Ha nincs cím vagy leírás, nem csinálunk semmit (opcionális)
  if (!title.value.trim() || !description.value.trim()) return;

  count += 1;
  table.style.display = "table";
  secondTitle.style.display = "none";

  addRow(title.value, description.value);

  // LocalStorage frissítése hozzáadáskor
  const data = loadFromLocalStorage();
  data.push({ title: title.value, description: description.value });
  saveToLocalStorage(data);

  // Mezők ürítése
  title.value = "";
  description.value = "";
});

function saveToLocalStorage(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem(LS_KEY);
    return data ? JSON.parse(data) : [];
}

function renderTable() {
    const data = loadFromLocalStorage();
    tbody.innerHTML = "";
    count = data.length;

    if (count === 0) {
        table.style.display = "none";
        secondTitle.style.display = "block";
    } else {
        table.style.display = "table";
        secondTitle.style.display = "none";
    }

    data.forEach(({ title, description }) => {
        addRow(title, description);
    });
}

function addRow(titleValue, descriptionValue) {
  let tr = document.createElement("tr");

  let titleTd = document.createElement("td");
  titleTd.innerText = titleValue;

  let descTd = document.createElement("td");
  descTd.innerText = descriptionValue;
  descTd.classList.add("noOverFlow");

  let statusTd = document.createElement("td");
  let doneBtn = document.createElement("button");
  doneBtn.classList.add("status-circle");
  statusTd.appendChild(doneBtn);

  doneBtn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const index = Array.from(tbody.children).indexOf(row);

    row.remove();
    count -= 1;

    // LocalStorage frissítése törléskor
    const data = loadFromLocalStorage();
    data.splice(index, 1);
    saveToLocalStorage(data);

    if (count === 0) {
      table.style.display = "none";
      secondTitle.style.display = "block";
    }
  });

  tr.appendChild(titleTd);
  tr.appendChild(descTd);
  tr.appendChild(statusTd);

  tbody.appendChild(tr);
}

goBackBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
});