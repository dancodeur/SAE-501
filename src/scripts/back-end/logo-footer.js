document.addEventListener("DOMContentLoaded", function () {
    const defaultLogo = "/images/logo-cyu-couleur.svg"; 
    const savedLogo = localStorage.getItem("footerLogo");
    const footerLogo = document.getElementById("footerLogo");
    
    if (footerLogo) {
        if (savedLogo) {
            footerLogo.src = savedLogo;
        } else {
            footerLogo.src = defaultLogo;
        }
    }

    document.getElementById("logoForm").addEventListener("submit", function (event) {
        event.preventDefault();
        
        const messageDiv = document.getElementById("form-message");
        const fileInput = document.getElementById("logoUpload");
        const file = fileInput.files[0];

        if (!file) {
            messageDiv.textContent = "Sélectionnez un fichier avant de mettre à jour.";
            messageDiv.className = "mb-4 p-2 rounded-md bg-red-100 text-red-800";
            return;
        }

        if (file) {
            const reader = new FileReader();
            
            reader.onload = function (e) {
                const logoData = e.target.result;
                localStorage.setItem("footerLogo", logoData);
                if (footerLogo) {
                    footerLogo.src = logoData;
                }
                messageDiv.textContent = "Logo modifié avec succès !";
                messageDiv.className = "mb-4 p-2 rounded-md bg-green-100 text-green-800";
            }
            reader.readAsDataURL(file);
            messageDiv.classList.remove("hidden"); // Affiche le message
        }
    });
});
