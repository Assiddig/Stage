document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll(".input");
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

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

    if (togglePassword) {
        togglePassword.addEventListener('mousedown', () => {
            passwordInput.type = 'text';
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        });

        togglePassword.addEventListener('mouseup', () => {
            passwordInput.type = 'password';
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        });

        togglePassword.addEventListener('mouseout', () => {
            passwordInput.type = 'password';
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        });
    }

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();
        const errorEmpty = document.getElementById('error-empty');
        const errorIncorrect = document.getElementById('error-incorrect');

        // Réinitialiser les messages d'erreur
        errorEmpty.style.display = 'none';
        errorIncorrect.style.display = 'none';

        if (!username || !password) {
            errorEmpty.style.display = 'block';
            // Petit séisme
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500); // 500 ms = 0.5 seconde
            return;
        }

        // Simuler une vérification des identifiants (à remplacer par une vraie vérification)
        if (username !== 'admin' || password !== 'admin') {
            errorIncorrect.style.display = 'block';
            // Petit séisme
            form.classList.add('shake');
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500); // 500 ms = 0.5 seconde
            setTimeout(() => { errorIncorrect.style.display = 'none'; }, 5000);
            return;
        }

        // Si les identifiants sont corrects, soumettre le formulaire (ou rediriger)
        alert('Connexion réussie !');
        // event.target.submit(); // Décommentez cette ligne pour soumettre le formulaire
    });
});
