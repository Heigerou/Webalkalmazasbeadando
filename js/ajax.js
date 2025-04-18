document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

const API_URL = "http://w3bbeadando.nhely.hu/ajax.php";
const CODE = "HI20V9abcd";

function fetchData() {
    const table = document.querySelector("#ajaxtable");
    let tableBody = table.querySelector("tbody");

    if (!tableBody) {
        tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
    }

    tableBody.innerHTML = "<tr><td colspan='5'>🔄 Betöltés...</td></tr>";

    const formData = new FormData();
    formData.append("op", "read");
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        tableBody.innerHTML = "";

        if (!data || !data.list || data.list.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>⚠️ Nincsenek adatok!</td></tr>";
            return;
        }

        data.list.forEach(record => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.height}</td>
                <td>${record.weight}</td>
                <td>
                    <button onclick="deleteData(${record.id})">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("🚨 Hiba az adatok betöltésekor:", error);
    });
}

function create() {
    const name = document.getElementById("createName").value;
    const height = document.getElementById("createHeight").value;
    const weight = document.getElementById("createWeight").value;

    const formData = new FormData();
    formData.append("op", "create");
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Sikeres hozzáadás");
        fetchData();
    })
    .catch(error => {
        console.error("🚨 Hiba történt a létrehozáskor:", error);
    });
}

function update() {
    const id = document.getElementById("updateId").value;
    const name = document.getElementById("updateName").value;
    const height = document.getElementById("updateHeight").value;
    const weight = document.getElementById("updateWeight").value;

    const formData = new FormData();
    formData.append("op", "update");
    formData.append("id", id);
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Sikeres módosítás");
        fetchData();
    })
    .catch(error => {
        console.error("🚨 Hiba történt a frissítéskor:", error);
    });
}

function deleteData(id) {
    const formData = new FormData();
    formData.append("op", "delete");
    formData.append("id", id);
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Sikeres törlés");
        fetchData();
    })
    .catch(error => {
        console.error("🚨 Hiba történt a törléskor:", error);
    });
}

function getDataForId() {
    const id = document.getElementById("updateId").value;

    const formData = new FormData();
    formData.append("op", "read");
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.list) {
            const record = data.list.find(r => r.id == id);
            if (record) {
                document.getElementById("updateName").value = record.name;
                document.getElementById("updateHeight").value = record.height;
                document.getElementById("updateWeight").value = record.weight;
            } else {
                alert("❌ Nem található ilyen ID!");
            }
        }
    })
    .catch(error => {
        console.error("🚨 Hiba történt a lekérdezéskor:", error);
    });
}
