document.addEventListener('DOMContentLoaded', () => {
    const exportButton = document.getElementById('export-document');
    const tableTitleInput = document.getElementById('table-title');
    const entryDateInput = document.getElementById('entry-date');

    const makeCellEditable = (cell) => {
        cell.contentEditable = true;
        cell.classList.add('editable');

        cell.addEventListener('focus', (event) => {
            if (event.target.innerText === '0') {
                event.target.innerText = '';
            }
        });

        cell.addEventListener('blur', (event) => {
            if (event.target.innerText.trim() === '') {
                event.target.innerText = '0';
            }
            calculatePercentagesAndTotals();
        });

        cell.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                navigateCell(event);
            }
        });
    };

    const navigateCell = (event) => {
        const cell = event.target;
        const row = cell.parentElement;
        const table = row.parentElement.parentElement;
        let targetCell;

        switch (event.key) {
            case 'ArrowUp':
                if (row.previousElementSibling) {
                    targetCell = row.previousElementSibling.children[cell.cellIndex];
                }
                break;
            case 'ArrowDown':
                if (row.nextElementSibling) {
                    targetCell = row.nextElementSibling.children[cell.cellIndex];
                }
                break;
            case 'ArrowLeft':
                if (cell.previousElementSibling) {
                    targetCell = cell.previousElementSibling;
                }
                break;
            case 'ArrowRight':
                if (cell.nextElementSibling) {
                    targetCell = cell.nextElementSibling;
                }
                break;
        }

        if (targetCell) {
            targetCell.focus();
            event.preventDefault();
        }
    };

    document.querySelectorAll('td').forEach(makeCellEditable);

    const calculatePercentagesAndTotals = () => {
        const calculateForTable = (tableId, columns) => {
            const table = document.getElementById(tableId);
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach((row, rowIndex) => {
                if (rowIndex === rows.length - 1) {
                    // Calculate totals
                    columns.forEach((col) => {
                        let totalObjectif = 0;
                        let totalRealise = 0;
                        for (let i = 0; i < rows.length - 1; i++) {
                            totalObjectif += parseFloat(rows[i].cells[col.objectif].innerText) || 0;
                            totalRealise += parseFloat(rows[i].cells[col.realise].innerText) || 0;
                        }
                        row.cells[col.objectif].innerText = totalObjectif;
                        row.cells[col.realise].innerText = totalRealise;
                        row.cells[col.atteinte].innerText = totalObjectif !== 0 ? ((totalRealise / totalObjectif) * 100).toFixed(2) + '%' : '0%';
                    });
                } else {
                    // Calculate percentages
                    columns.forEach((col) => {
                        const objectif = parseFloat(row.cells[col.objectif].innerText) || 0;
                        const realise = parseFloat(row.cells[col.realise].innerText) || 0;
                        row.cells[col.atteinte].innerText = objectif !== 0 ? ((realise / objectif) * 100).toFixed(2) + '%' : '';
                    });
                }
            });
        };

        const table1Columns = [
            { objectif: 1, realise: 2, atteinte: 3 },
            { objectif: 4, realise: 5, atteinte: 6 },
            { objectif: 8, realise: 9, atteinte: 10 },
            { objectif: 11, realise: 12, atteinte: 13 }
        ];

        const table2Columns = [
            { objectif: 0, realise: 1, atteinte: 2 },
            { objectif: 3, realise: 4, atteinte: 5 },
            { objectif: 6, realise: 7, atteinte: 8 },
            { objectif: 10, realise: 11, atteinte: 12 }
        ];

        calculateForTable('table1', table1Columns);
        calculateForTable('table2', table2Columns);
    };

    exportButton.addEventListener('click', () => {
        calculatePercentagesAndTotals();

        const wb = XLSX.utils.book_new();

        const addSheetFromTable = (tableId, sheetName) => {
            const table = document.getElementById(tableId);
            const ws = XLSX.utils.table_to_sheet(table, {raw: true});

            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        };

        addSheetFromTable('table1', 'Tableau 1');
        addSheetFromTable('table2', 'Tableau 2');

        let fileName = tableTitleInput.value.trim();
        if (!fileName) {
            fileName = 'tableau';
        }
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    });

    // Initial call to calculate percentages and totals
    calculatePercentagesAndTotals();
});
