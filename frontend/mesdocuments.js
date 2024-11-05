

const getSuivieEntreprise = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/suivie-entreprise');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suivie entreprise:', error);
        return [];
    }
};
window.onload = async () => {
    const data = await getSuivieEntreprise();
    console.table(data);
}
document.addEventListener('DOMContentLoaded', () => {
    const documentList = document.getElementById('document-list');

    const documents = JSON.parse(localStorage.getItem('documents')) || [];
    const activeDocuments = documents.filter(doc => !doc.isDeleted);

    if (activeDocuments.length === 0) {
        documentList.innerHTML = '<p>Aucun document n\'a été enregistré</p>';
    } else {
        activeDocuments.sort((a, b) => new Date(b.date) - new Date(a.date));
        activeDocuments.forEach(doc => {
            const docElement = document.createElement('div');
            docElement.className = 'document-item';
            docElement.innerHTML = `
                <p>${doc.name} (${doc.type}) - ${new Date(doc.date).toLocaleDateString()}</p>
            `;
            docElement.addEventListener('dblclick', () => {
                // Ouvrir le document dans le tableau où il a été créé
                window.location.href = `${doc.type}.html?document=${doc.id}`;
            });
            documentList.appendChild(docElement);
        });
    }
});
