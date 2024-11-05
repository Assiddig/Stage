document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const addMemberButton = document.getElementById('add-member-button');
    const closeButton = document.querySelector('.close-button');
    const addMemberForm = document.getElementById('add-member-form');
    const dataTableBody = document.querySelector('#data-table tbody');
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
            <td>${formData.get('grc-ok')}</td>
            <td>${formData.get('entreprise')}</td>
            <td>${formData.get('nom')}</td>
            <td>${formData.get('prenom')}</td>
            <td>${formData.get('formation')}</td>
            <td>${formData.get('groupe')}</td>
            <td>${formData.get('origine')}</td>
            <td>${formData.get('fdl-envoyee')}</td>
            <td>${formData.get('type')}</td>
            <td>${formData.get('date-placement')}</td>
            <td>${formData.get('dernier-etablissement')}</td>
            <td>${formData.get('ca-opco')}</td>
            <td>${formData.get('rac')}</td>
            <td>${formData.get('fdl-ok')}</td>
            <td>${formData.get('rac-negocie')}</td>
            <td>${formData.get('ca-total')}</td>
            <td>${formData.get('declaration-prime-ca')}</td>
            <td>${formData.get('declaration-prime-rac')}</td>
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
            document.getElementById('grc-ok').value = newRow.cells[1].textContent;
            document.getElementById('entreprise').value = newRow.cells[2].textContent;
            document.getElementById('nom').value = newRow.cells[3].textContent;
            document.getElementById('prenom').value = newRow.cells[4].textContent;
            document.getElementById('formation').value = newRow.cells[5].textContent;
            document.getElementById('groupe').value = newRow.cells[6].textContent;
            document.getElementById('origine').value = newRow.cells[7].textContent;
            document.getElementById('fdl-envoyee').value = newRow.cells[8].textContent;
            document.getElementById('type').value = newRow.cells[9].textContent;
            document.getElementById('date-placement').value = newRow.cells[10].textContent;
            document.getElementById('dernier-etablissement').value = newRow.cells[11].textContent;
            document.getElementById('ca-opco').value = newRow.cells[12].textContent;
            document.getElementById('rac').value = newRow.cells[13].textContent;
            document.getElementById('fdl-ok').value = newRow.cells[14].textContent;
            document.getElementById('rac-negocie').value = newRow.cells[15].textContent;
            document.getElementById('ca-total').value = newRow.cells[16].textContent;
            document.getElementById('declaration-prime-ca').value = newRow.cells[17].textContent;
            document.getElementById('declaration-prime-rac').value = newRow.cells[18].textContent;
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
        for (let j = 0; j < 19; j++) {
            const cell = document.createElement('td');
            if (j === 0) {
                cell.textContent = i + 1; // Set row number for empty rows
            }
            row.appendChild(cell);
        }
        dataTableBody.appendChild(row);
    }

    // Export to Excel functionality
    exportButton.addEventListener('click', () => {
        const wb = XLSX.utils.book_new();

        // Create worksheet and add header values
        const ws = XLSX.utils.aoa_to_sheet([]);

        // Add table headers to sheet
        const tableHeaders = [];
        document.querySelectorAll('#data-table thead th').forEach((th, index) => {
            tableHeaders.push(th.innerText);
        });
        XLSX.utils.sheet_add_aoa(ws, [tableHeaders], { origin: 'B1' });

        // Add the second header row with "Objectifs : 40 contrats" and "Avancée sur objectifs"
        XLSX.utils.sheet_add_aoa(ws, [['', '', '', '', '', '', '', '', '', '', '', 'Objectifs : 40 contrats', 'Avancée sur objectifs']], { origin: 'B2' });

        // Add table data to sheet
        const tableData = [];
        dataTableBody.querySelectorAll('tr').forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach((td, index) => {
                rowData.push(td.innerText);
            });
            tableData.push(rowData);
        });
        XLSX.utils.sheet_add_aoa(ws, tableData, { origin: 'B3' });

        // Format rows and cells
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let R = 0; R <= range.e.r; ++R) {
            for (let C = 0; C <= range.e.c; ++C) {
                const cell_address = { c: C, r: R };
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if (!ws[cell_ref]) continue;
                if (R === 0 || R === 1) {
                    ws[cell_ref].s = {
                        font: {
                            bold: true,
                            color: { rgb: 'FFFFFF' }
                        },
                        fill: {
                            fgColor: { rgb: '4CAF50' }
                        }
                    };
                } else if (R === 2) {
                    ws[cell_ref].s = {
                        font: {
                            bold: true,
                            color: { rgb: '000000' }
                        },
                        fill: {
                            fgColor: { rgb: 'FFFF00' }
                        }
                    };
                }
                if (C === 0) {
                    ws[cell_ref].s = { alignment: { horizontal: 'right' } };
                }
            }
        }

        XLSX.utils.book_append_sheet(wb, ws, 'Tableau');

        let fileName = tableTitleInput.value.trim();
        if (!fileName) {
            fileName = 'tableau';
        }
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    });
});
