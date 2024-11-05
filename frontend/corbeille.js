document.addEventListener('DOMContentLoaded', () => {
    const documentList = document.getElementById('document-list');

    const documents = JSON.parse(localStorage.getItem('documents')) || [];
    const deletedDocuments = documents.filter(doc => doc.isDeleted);

    if (deletedDocuments.length === 0) {
        documentList.innerHTML = '<p>Aucun document n\'a été supprimé récemment</p>';
    } else {
        deletedDocuments.sort((a, b) => new Date(b.date) - new Date(a.date));
        deletedDocuments.forEach(doc => {
            const docElement = document.createElement('div');
            docElement.className = 'document-item';
            docElement.innerHTML = `
                <p>${doc.name} (${doc.type}) - ${new Date(doc.date).toLocaleDateString()}</p>
                <button class="restore-btn">Restaurer</button>
                <button class="delete-btn">Supprimer définitivement</button>
            `;
            docElement.querySelector('.restore-btn').addEventListener('click', () => {
                doc.isDeleted = false;
                localStorage.setItem('documents', JSON.stringify(documents));
                location.reload();
            });
            docElement.querySelector('.delete-btn').addEventListener('click', () => {
                const index = documents.findIndex(d => d.id === doc.id);
                documents.splice(index, 1);
                localStorage.setItem('documents', JSON.stringify(documents));
                location.reload();
            });
            documentList.appendChild(docElement);
        });
    }
});
