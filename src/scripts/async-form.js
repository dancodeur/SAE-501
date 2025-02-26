import validator from "validator";
import axios from "axios";

const submitForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);

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
        const response = await axios.post("/messages", formValues);

        if (response.status === 201) {
            alert("Message envoyé avec succès !");
            e.target.reset(); // Réinitialiser le formulaire
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue, veuillez réessayer.");
    }
};

// Ajouter l'écouteur d'événements
document.querySelectorAll("[data-async-form]").forEach((item) => {
    item.addEventListener("submit", submitForm);
});
