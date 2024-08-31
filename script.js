async function fetchCSV(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching CSV file:', error);
        throw error;
    }
}

function parseCSV(csvData) {
    const rows = csvData.split('\n').map(row => row.split(','));
    return rows;
}

function populateTable(data) {
    const tableBody = document.querySelector('#interactiveTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    data.forEach((row, index) => {
        if (index === 0) return; // Skip the header row in CSV

        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell.trim();
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

function displayError(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block'; // Show error message
}

function sortTable(columnIndex) {
    const table = document.getElementById('interactiveTable');
    const rows = Array.from(table.rows).slice(1); // Skip the header row
    let sortedRows;

    sortedRows = rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        // If sorting by number (e.g., age), compare as numbers
        if (!isNaN(cellA) && !isNaN(cellB)) {
            return parseFloat(cellA) - parseFloat(cellB);
        }

        // Otherwise, sort as strings
        return cellA.localeCompare(cellB);
    });

    // Append the sorted rows back to the table body
    table.tBodies[0].append(...sortedRows);
}

function filterTable() {
    const input = document.getElementById('tableFilter');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('interactiveTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) { // Skip the header row
        const cells = rows[i].getElementsByTagName('td');
        let matches = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j]) {
                const cellText = cells[j].textContent || cells[j].innerText;
                if (cellText.toLowerCase().indexOf(filter) > -1) {
                    matches = true;
                    break;
                }
            }
        }

        if (matches) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Main function to load the table
async function loadTable() {
    try {
        const csvData = await fetchCSV('data.csv');
        const parsedData = parseCSV(csvData);
        populateTable(parsedData);
    } catch (error) {
        displayError('Failed to load the data. Please ensure the "data.csv" file is present in the root directory.');
    }
}

// Load the table on page load
window.onload = loadTable;
