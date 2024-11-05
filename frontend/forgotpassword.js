document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll(".input");

    function addcl() {
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }

    function remcl() {
        let parent = this.parentNode.parentNode;
        if (this.value === "") {
            parent.classList.remove("focus");
        }
    }

    inputs.forEach(input => {
        input.addEventListener("focus", addcl);
        input.addEventListener("blur", remcl);
    });

    const form = document.getElementById('forgotPasswordForm');
    const sendButton = document.getElementById('sendButton');
    const errorEmpty = document.getElementById('error-empty');
    const errorNotFound = document.getElementById('error-not-found');
    const successMessage = document.getElementById('success-message');

    sendButton.addEventListener('click', function () {
        const username = document.getElementById('username').value.trim();

        // Réinitialiser les messages d'erreur et de succès
        errorEmpty.style.display = 'none';
        errorNotFound.style.display = 'none';
        successMessage.style.display = 'none';
        form.classList.remove('shake');

        if (!username) {
            errorEmpty.style.display = 'block';
            form.classList.add('shake');
            setTimeout(() => {
                errorEmpty.style.display = 'none';
                form.classList.remove('shake');
            }, 5000); // 500 ms = 0.5 seconde
            return;
        }

        // Simuler une vérification des identifiants (à remplacer par une vraie vérification)
        if (username !== 'existant') { // Remplacez 'existant' par le nom d'utilisateur correct pour le test
            errorNotFound.style.display = 'block';
            form.classList.add('shake');
            setTimeout(() => {
                errorNotFound.style.display = 'none';
                form.classList.remove('shake');
            }, 5000); // 500 ms = 0.5 seconde
            return;
        }

        // Si l'identifiant est correct, afficher le message de succès
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000); // 500 ms = 0.5 seconde
    });
});
