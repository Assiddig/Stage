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
    const saveButton = document.getElementById('save-button');
    let suivieEntrepriseData = [];
    saveButton.addEventListener('click', () => {
        if (suivieEntrepriseData.length > 0) {
            console.log(suivieEntrepriseData);
            fetch('http://localhost:8000/api/suivie-entreprise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(suivieEntrepriseData)
                
            })
            .then(response => response.json())
            .then(data => {
                console.table(data);
                suivieEntrepriseData = [];
            })

            .catch(error => {
                console.error(error);
            
            });

        }
    });
            

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
            <td>${formData.get('nom-contact')}</td>
            <td>${formData.get('nom-entreprise')}</td>
            <td>${formData.get('telephone')}</td>
            <td>${formData.get('adresse-mail')}</td>
            <td>${formData.get('sources')}</td>
            <td>${formData.get('formation-concernee')}</td>
            <td>${formData.get('commentaire')}</td>
            <td>${formData.get('date-contact-1')}</td>
            <td>${formData.get('positionnement-1')}</td>
            <td>${formData.get('reponses-etudiants-1')}</td>
            <td>${formData.get('relance-1')}</td>
            <td>${formData.get('date-contact-2')}</td>
            <td>${formData.get('positionnement-2')}</td>
            <td>${formData.get('reponses-etudiants-2')}</td>
            <td>${formData.get('relance-2')}</td>
            <td>${formData.get('date-contact-3')}</td>
            <td>${formData.get('positionnement-3')}</td>
            <td>${formData.get('reponses-etudiants-3')}</td>
            <td>${formData.get('relance-3')}</td>
            <td>${formData.get('date-contact-4')}</td>
            <td>${formData.get('positionnement-4')}</td>
            <td>${formData.get('reponses-etudiants-4')}</td>
            <td>${formData.get('relance-4')}</td>
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
            document.getElementById('nom-contact').value = newRow.cells[1].textContent;
            document.getElementById('nom-entreprise').value = newRow.cells[2].textContent;
            document.getElementById('telephone').value = newRow.cells[3].textContent;
            document.getElementById('adresse-mail').value = newRow.cells[4].textContent;
            document.getElementById('sources').value = newRow.cells[5].textContent;
            document.getElementById('formation-concernee').value = newRow.cells[6].textContent;
            document.getElementById('commentaire').value = newRow.cells[7].textContent;
            document.getElementById('date-contact-1').value = newRow.cells[8].textContent;
            document.getElementById('positionnement-1').value = newRow.cells[9].textContent;
            document.getElementById('reponses-etudiants-1').value = newRow.cells[10].textContent;
            document.getElementById('relance-1').value = newRow.cells[11].textContent;
            document.getElementById('date-contact-2').value = newRow.cells[12].textContent;
            document.getElementById('positionnement-2').value = newRow.cells[13].textContent;
            document.getElementById('reponses-etudiants-2').value = newRow.cells[14].textContent;
            document.getElementById('relance-2').value = newRow.cells[15].textContent;
            document.getElementById('date-contact-3').value = newRow.cells[16].textContent;
            document.getElementById('positionnement-3').value = newRow.cells[17].textContent;
            document.getElementById('reponses-etudiants-3').value = newRow.cells[18].textContent;
            document.getElementById('relance-3').value = newRow.cells[19].textContent;
            document.getElementById('date-contact-4').value = newRow.cells[20].textContent;
            document.getElementById('positionnement-4').value = newRow.cells[21].textContent;
            document.getElementById('reponses-etudiants-4').value = newRow.cells[22].textContent;
            document.getElementById('relance-4').value = newRow.cells[23].textContent;
            modal.style.display = 'block';
        });

        const suivieEntrepriseTosave = {
            nomContact: formData.get('nom-contact'),
            nomEntreprise: formData.get('nom-entreprise'),
            telephone: formData.get('telephone'),
            adresseMail: formData.get('adresse-mail'),
            sources: formData.get('sources'),
            formationConcernee: formData.get('formation-concernee'),
            commentaire: formData.get('commentaire'),
            dateContact1: formData.get('date-contact-1'),
            positionnement1: formData.get('positionnement-1'),
            reponsesEtudiants1: formData.get('reponses-etudiants-1'),
            relance1: formData.get('relance-1'),
            dateContact2: formData.get('date-contact-2'),
            positionnement2: formData.get('positionnement-2'),
            reponsesEtudiants2: formData.get('reponses-etudiants-2'),
            relance2: formData.get('relance-2'),
            dateContact3: formData.get('date-contact-3'),
            positionnement3: formData.get('positionnement-3'),
            reponsesEtudiants3: formData.get('reponses-etudiants-3'),
            relance3: formData.get('relance-3'),
            dateContact4: formData.get('date-contact-4'),
            positionnement4: formData.get('positionnement-4'),
            reponsesEtudiants4: formData.get('reponses-etudiants-4'),
            relance4: formData.get('relance-4')
        };
        suivieEntrepriseData.push(suivieEntrepriseTosave);
        
        

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
        for (let j = 0; j < 25; j++) {
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

        // Extract header bar values
        const headerValues = [
            ['Titre', tableTitleInput.value || '', 'Date', entryDateInput.value || '']
        ];

        // Create worksheet and add header values
        const ws = XLSX.utils.aoa_to_sheet(headerValues);
        XLSX.utils.sheet_add_aoa(ws, [['']], { origin: 'A3' }); // Add empty row for spacing

        // Add table headers to sheet
        const tableHeaders = [];
        document.querySelectorAll('#data-table thead th').forEach((th, index) => {
            if (index !== 24) { // Skip actions column
                tableHeaders.push(th.innerText);
            }
        });
        XLSX.utils.sheet_add_aoa(ws, [tableHeaders], { origin: 'A4' });

        // fusionner les cellules afin de nommer les differentes relances 
        ws['!merges'] = [
            { s: { r: 2, c: 8 }, e: { r: 2, c: 11 } }, // I3:L3
            { s: { r: 2, c: 12 }, e: { r: 2, c: 15 } }, // M3:P3
            { s: { r: 2, c: 16 }, e: { r: 2, c: 19 } }, // Q3:T3
            { s: { r: 2, c: 20 }, e: { r: 2, c: 23 } }, // U3:X3
        ];
        XLSX.utils.sheet_add_aoa(ws, [
            ['Relance 1', '', '', '', 'Relance 2', '', '', '', 'Relance 3', '', '', '', 'Relance 4']
        ], { origin: 'I3' });

        // Add table data to sheet
        const tableData = [];
        dataTableBody.querySelectorAll('tr').forEach(row => {
            const rowData = [];
            row.querySelectorAll('td').forEach((td, index) => {
                if (index !== 24) { // Skip actions column
                    rowData.push(td.innerText);
                }
            });
            tableData.push(rowData);
        });
        XLSX.utils.sheet_add_aoa(ws, tableData, { origin: 'A5' });

        XLSX.utils.book_append_sheet(wb, ws, 'Tableau');

        let fileName = tableTitleInput.value.trim();
        if (!fileName) {
            fileName = 'tableau';
        }
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    });
});
