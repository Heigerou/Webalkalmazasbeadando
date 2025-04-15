
function addRow() {
    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let row = table.insertRow();

    let nameInput = document.getElementById("name");
    let ageInput = document.getElementById("age");
    let cityInput = document.getElementById("city");

    let name = nameInput.value.trim();
    let age = ageInput.value.trim();
    let city = cityInput.value.trim();

    if (!name || !age || !city) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }
    if (name.length < 2 || name.length > 50) {
        alert("A névnek 2 és 50 karakter között kell lennie!");
        return;
    }
    if (city.length < 2 || city.length > 50) {
        alert("A város nevének 2 és 50 karakter között kell lennie!");
        return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
        alert("A kor 1 és 120 között lehet!");
        return;
    }

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = age;
    row.insertCell(2).innerHTML = city;
    row.insertCell(3).innerHTML = '<button onclick="editRow(this)">Módosít</button> <button onclick="deleteRow(this)">Törlés</button>';

    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";
    nameInput.focus();
}

document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll("#name, #age, #city");

    inputs.forEach(input => {
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); 
                addRow();
            }
        });
    });
});

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editRow(button) {
    let row = button.parentNode.parentNode;
    let cells = row.getElementsByTagName("td");

    let name = prompt("Új név:", cells[0].innerText);
    let age = prompt("Új kor:", cells[1].innerText);
    let city = prompt("Új város:", cells[2].innerText);

    if (!name || !age || !city) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }
    if (name.length < 2 || name.length > 50) {
        alert("A névnek 2 és 50 karakter között kell lennie!");
        return;
    }
    if (city.length < 2 || city.length > 50) {
        alert("A város nevének 2 és 50 karakter között kell lennie!");
        return;
    }
    if (isNaN(age) || age < 1 || age > 120) {
        alert("A kor 1 és 120 között lehet!");
        return;
    }

    cells[0].innerText = name;
    cells[1].innerText = age;
    cells[2].innerText = city;
}

function searchTable() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.getElementById("dataTable").getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let text = rows[i].innerText.toLowerCase();
        rows[i].style.display = text.includes(input) ? "" : "none";
    }
}

let sortDirection = {};

function sortTable(columnIndex) {
    let table = document.getElementById("dataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(tbody.getElementsByTagName("tr"));
    let headers = table.getElementsByTagName("th");

    if (!sortDirection[columnIndex]) {
        sortDirection[columnIndex] = 1;
    } else {
        sortDirection[columnIndex] *= -1;
    }

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex];
        let cellB = rowB.cells[columnIndex];

        if (!cellA || !cellB) return 0;

        let textA = cellA.innerText.trim();
        let textB = cellB.innerText.trim();

        let isNumeric = !isNaN(textA) && !isNaN(textB);
        if (isNumeric) {
            return (Number(textA) - Number(textB)) * sortDirection[columnIndex];
        } else {
            return textA.localeCompare(textB) * sortDirection[columnIndex];
        }
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));

    for (let i = 0; i < headers.length; i++) {
        let span = headers[i].querySelector("span");
        if (span) span.innerText = "";
    }

    let activeSpan = headers[columnIndex].querySelector("span");
    if (activeSpan) {
        activeSpan.innerText = sortDirection[columnIndex] === 1 ? " ⬆️" : " ⬇️";
    }
}
