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

    const form = document.getElementById('passwordForm');
    const sendButton = document.getElementById('sendButton');
    const errorEmpty = document.getElementById('error-empty');
    const errorCriteria = document.getElementById('error-criteria');
    const errorMismatch = document.getElementById('error-mismatch');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    function validatePassword(password) {
        const criteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return criteria.test(password);
    }

    function showPassword(input, icon) {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }

    function hidePassword(input, icon) {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }

    if (toggleNewPassword) {
        toggleNewPassword.addEventListener('mousedown', () => {
            showPassword(newPassword, toggleNewPassword);
        });

        toggleNewPassword.addEventListener('mouseup', () => {
            hidePassword(newPassword, toggleNewPassword);
        });

        toggleNewPassword.addEventListener('mouseout', () => {
            hidePassword(newPassword, toggleNewPassword);
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('mousedown', () => {
            showPassword(confirmPassword, toggleConfirmPassword);
        });

        toggleConfirmPassword.addEventListener('mouseup', () => {
            hidePassword(confirmPassword, toggleConfirmPassword);
        });

        toggleConfirmPassword.addEventListener('mouseout', () => {
            hidePassword(confirmPassword, toggleConfirmPassword);
        });
    }

    sendButton.addEventListener('click', function () {
        const newPasswordValue = newPassword.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();

        // Réinitialiser les messages d'erreur
        errorEmpty.style.display = 'none';
        errorCriteria.style.display = 'none';
        errorMismatch.style.display = 'none';
        form.classList.remove('shake');

        if (!newPasswordValue || !confirmPasswordValue) {
            errorEmpty.style.display = 'block';
            form.classList.add('shake');
            setTimeout(() => {
                errorEmpty.style.display = 'none';
                form.classList.remove('shake');
            }, 5000); // 5000 ms = 5 secondes
            return;
        }

        if (!validatePassword(newPasswordValue)) {
            errorCriteria.style.display = 'block';
            form.classList.add('shake');
            setTimeout(() => {
                errorCriteria.style.display = 'none';
                form.classList.remove('shake');
            }, 5000); // 5000 ms = 5 secondes
            return;
        }

        if (newPasswordValue !== confirmPasswordValue) {
            errorMismatch.style.display = 'block';
            form.classList.add('shake');
            setTimeout(() => {
                errorMismatch.style.display = 'none';
                form.classList.remove('shake');
            }, 5000); // 5000 ms = 5 secondes
            return;
        }

        // Rediriger vers la page de succès si tout est valide
        location.href = 'succespassword.html';
    });
});
