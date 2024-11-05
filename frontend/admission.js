document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const addMemberButton = document.getElementById('add-member-button');
    const closeButton = document.querySelector('.close-button');
    const addMemberForm = document.getElementById('add-member-form');
    const dataTableBody = document.querySelector('#data-table tbody');
    const objectiveNumberInput = document.getElementById('objective-number');
    const numberInscribedInput = document.getElementById('number-inscribed');
    const remainingInput = document.getElementById('remaining');
    const exportButton = document.getElementById('export-document');
    const tableTitleInput = document.getElementById('table-title');
    const entryDateInput = document.getElementById('entry-date');
    let editRow = null;

    addMemberButton.addEventListener('click', () => {
        modal.style.display = 'block';
        addMemberForm.reset();
        editRow = null;
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    addMemberForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addMemberForm);

        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td></td>
            <td>${formData.get('nom')}</td>
            <td>${formData.get('prenom')}</td>
            <td>${formData.get('email')}</td>
            <td>${formData.get('telephone')}</td>
            <td>${formData.get('inscrit')}</td>
            <td>${formData.get('cre')}</td>
            <td>${formData.get('groupe')}</td>
            <td>${formData.get('date-admission')}</td>
            <td>${formData.get('commentaires')}</td>
            <td>${formData.get('etat-dossier-teams')}</td>
            <td>${formData.get('cvec')}</td>
            <td>${formData.get('bac-obtenu')}</td>
            <td class="actions">
                <i class="fas fa-edit edit-icon"></i>
                <i class="fas fa-trash delete-icon"></i>
            </td>
        `;

        newRow.querySelector('.delete-icon').addEventListener('click', () => {
            newRow.remove();
            updateRowNumbers();
        });

        newRow.querySelector('.edit-icon').addEventListener('click', () => {
            editRow = newRow;
            document.getElementById('nom').value = newRow.cells[1].textContent;
            document.getElementById('prenom').value = newRow.cells[2].textContent;
            document.getElementById('email').value = newRow.cells[3].textContent;
            document.getElementById('telephone').value = newRow.cells[4].textContent;
            document.getElementById('inscrit').value = newRow.cells[5].textContent;
            document.getElementById('cre').value = newRow.cells[6].textContent;
            document.getElementById('groupe').value = newRow.cells[7].textContent;
            document.getElementById('date-admission').value = newRow.cells[8].textContent;
            document.getElementById('commentaires').value = newRow.cells[9].textContent;
            document.getElementById('etat-dossier-teams').value = newRow.cells[10].textContent;
            document.getElementById('cvec').value = newRow.cells[11].textContent;
            document.getElementById('bac-obtenu').value = newRow.cells[12].textContent;
            modal.style.display = 'block';
        });

        dataTableBody.insertBefore(newRow, dataTableBody.firstChild);

        updateRowNumbers();
        addMemberForm.reset();
        modal.style.display = 'none';
        editRow = null;
    });

    function updateRowNumbers() {
        const rows = dataTableBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }

    // Initialize the table with empty rows
    for (let i = 0; i < 60; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 14; j++) {
            const cell = document.createElement('td');
            if (j === 0) {
                cell.textContent = i + 1; // Set row number for empty rows
            }
            row.appendChild(cell);
        }
        dataTableBody.appendChild(row);
    }

    // Event listeners for auto-calculating fields
    objectiveNumberInput.addEventListener('input', calculateValues);
    numberInscribedInput.addEventListener('input', calculateValues);
    remainingInput.addEventListener('input', calculateValues);

    function calculateValues() {
        const objective = parseInt(objectiveNumberInput.value) || 0;
        const inscribed = parseInt(numberInscribedInput.value) || 0;
        const remaining = parseInt(remainingInput.value) || 0;

        if (this === objectiveNumberInput && objective > 0) {
            if (numberInscribedInput.value) {
                remainingInput.value = objective - inscribed;
            } else if (remainingInput.value) {
                numberInscribedInput.value = objective - remaining;
            }
        } else if (this === numberInscribedInput && inscribed >= 0) {
            if (objectiveNumberInput.value) {
                remainingInput.value = objective - inscribed;
            } else if (remainingInput.value) {
                objectiveNumberInput.value = inscribed + remaining;
            }
        } else if (this === remainingInput && remaining >= 0) {
            if (objectiveNumberInput.value) {
                numberInscribedInput.value = objective - remaining;
            } else if (numberInscribedInput.value) {
                objectiveNumberInput.value = inscribed + remaining;
            }
        }
    }

    // Export to Excel functionality
    exportButton.addEventListener('click', () => {
        const wb = XLSX.utils.book_new();
        

        // Extract header bar values
        const headerValues = [
            [
                'Titre', tableTitleInput.value || '',
                'Date de rentrée', entryDateInput.value || '',
                'Objectif à atteindre', objectiveNumberInput.value || '',
                'Nombre d\'inscrits', numberInscribedInput.value || '',
                'Reste à placer', remainingInput.value || ''
            ]
        ];
        

        // Create worksheet and add header values
        const ws = XLSX.utils.aoa_to_sheet(headerValues);
        XLSX.utils.sheet_add_aoa(ws, [['']], { origin: 'A6' }); // Add empty row for spacing

        // Add table headers to sheet
        const tableHeaders = [];
        document.querySelectorAll('#data-table thead th').forEach((th, index) => {
            if (index !== 13) { // Skip number and actions columns
                tableHeaders.push(th.innerText);
            }
        });
        XLSX.utils.sheet_add_aoa(ws, [tableHeaders], { origin: 'A7' });

        // Add table data to sheet
        const tableData = [];
        dataTableBody.querySelectorAll('tr').forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach((td, index) => {
                if (index !== 13) { // Skip number and actions columns
                    rowData.push(td.innerText);
                }
            });
            tableData.push(rowData);
        });
        XLSX.utils.sheet_add_aoa(ws, tableData, { origin: 'A8' });

        XLSX.utils.book_append_sheet(wb, ws, 'Tableau');

        let fileName = tableTitleInput.value.trim();
        if (!fileName) {
            fileName = 'tableau';
        }
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    });
});