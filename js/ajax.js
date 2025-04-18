
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "HI20V9abcd";

function fetchData() {
    let table = document.querySelector("#ajaxtable");
    let tableBody = table.querySelector("tbody");

    if (!tableBody) {
        tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
    }

    tableBody.innerHTML = "<tr><td colspan='5'>🔄 Betöltés...</td></tr>";

    let formData = new FormData();
    formData.append("op", "read");
    formData.append("code", CODE);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("🔹 API válasz:", data);

        tableBody.innerHTML = "";

        if (!data || !data.list || data.list.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>⚠️ Nincsenek adatok!</td></tr>";
            return;
        }

        data.list.forEach(record => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.height}</td>
                <td>${record.weight}</td>
                <td>
                    <button onclick="deleteData(${record.id})" class="delete-button">🗑️</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        let heights = data.list.map(record => parseFloat(record.height)).filter(h => !isNaN(h));
        let sum = heights.reduce((a, b) => a + b, 0);
        let avg = (sum / heights.length).toFixed(2);
        let max = Math.max(...heights);

        let statsRow = document.createElement("tr");
        statsRow.innerHTML = `<td colspan="5">
            <strong>📏 Magasságok:</strong> Összeg: ${sum} cm | Átlag: ${avg} cm | Max: ${max} cm
        </td>`;
        tableBody.appendChild(statsRow);
    })
    .catch(error => {
        console.error("🚨 Hiba az adatok betöltésekor:", error);
        alert("❌ Hiba történt az adatok betöltésekor! Nézd meg a konzolt.");
    });
}
