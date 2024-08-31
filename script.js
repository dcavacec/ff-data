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
