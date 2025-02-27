import validator from "validator";
import axios from "axios";

const submitForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
    const messageDiv = document.getElementById("form-message");


    // Réinitialiser les erreurs avant validation
    document.querySelectorAll("[data-error-message]").forEach((el) => {
        el.classList.add("hidden");
    });

    let hasError = false;

    // Vérification des champs
    if (validator.isEmpty(formValues.lastName.trim())) {
        document.querySelector("[data-error-message='lastName']").classList.remove("hidden");
        hasError = true;
    }
    if (validator.isEmpty(formValues.firstName.trim())) {
        document.querySelector("[data-error-message='firstName']").classList.remove("hidden");
        hasError = true;
    }
    if (!validator.isEmail(formValues.email.trim())) {
        document.querySelector("[data-error-message='email']").classList.remove("hidden");
        hasError = true;
    }
    if (validator.isEmpty(formValues.content.trim())) {
        document.querySelector("[data-error-message='content']").classList.remove("hidden");
        hasError = true;
    }
    if (!formValues.identity) {
        document.querySelector("[data-error-message='identity']").classList.remove("hidden");
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // Envoi des données au serveur
    try {
        const response = await axios.post("api/messages", formValues);

        if (response.status === 201) {
            messageDiv.textContent = "Message envoyé avec succès !";
            messageDiv.className = "mb-4 p-2 rounded-md bg-green-100 text-green-800";
            e.target.reset(); 
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        messageDiv.textContent = "Une erreur est survenue, veuillez réessayer.";
        messageDiv.className = "mb-4 p-2 rounded-md bg-red-100 text-red-800";
    }
    messageDiv.classList.remove("hidden"); // Affiche le message
};



// Ajouter l'écouteur d'événements
document.querySelectorAll("[data-async-form]").forEach((item) => {
    item.addEventListener("submit", submitForm);
});
