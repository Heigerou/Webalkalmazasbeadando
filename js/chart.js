document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById("myChart").getContext("2d");

    let myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["One", "Two", "Three", "Four", "Five"],
            datasets: [{
                label: "Selected Data",
                data: [],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: "#007bff",
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "#333",
                        font: { size: 14 }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 14
                        },
                        maxRotation: 0,
                        minRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });

    function loadStoredData() {
        let storedData = localStorage.getItem("chartTable");
        if (storedData) {
            let parsedData = JSON.parse(storedData);
            let rows = document.querySelectorAll("#chartTable tbody tr");

            rows.forEach((row, rowIndex) => {
                let cells = row.querySelectorAll("td:not(:first-child)");
                if (parsedData[rowIndex]) {
                    cells.forEach((cell, cellIndex) => {
                        cell.textContent = parsedData[rowIndex][cellIndex];
                    });
                }
            });
        }
    }

    function saveData() {
        let rows = document.querySelectorAll("#chartTable tbody tr");
        let tableData = [];

        rows.forEach(row => {
            let rowData = [];
            let cells = row.querySelectorAll("td:not(:first-child)");
            cells.forEach(cell => {
                rowData.push(cell.textContent);
            });
            tableData.push(rowData);
        });

        localStorage.setItem("chartTable", JSON.stringify(tableData));
    }

    window.updateChart = function (row) {
        let rowData = Array.from(row.children).slice(1).map(td => parseInt(td.textContent) || 0);

        document.querySelectorAll("#chartTable tbody tr").forEach(tr => tr.classList.remove("selected"));

        row.classList.add("selected");

        let maxValue = Math.max(...rowData) + 5;
        myChart.options.scales.y.max = maxValue;

        myChart.data.datasets[0].data = rowData;
        myChart.update();
    };

    document.querySelectorAll("#chartTable tbody td:not(:first-child)").forEach(cell => {
        cell.setAttribute("contenteditable", "true");

        cell.addEventListener("input", function () {
            let row = this.parentElement;
            updateChart(row);
            saveData();
        });

        cell.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                this.blur();
                saveData();
            }
        });
    });

    loadStoredData();
    updateChart(document.querySelector("tbody tr"));
});
