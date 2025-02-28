import validator from "validator";

// Fonction de validation
const validateForm = (formData, formType) => {
    const errors = {};
    const imageFile = formData.get("image"); 

    if (formType === "author") {
        if (validator.isEmpty(formData.lastname?.trim() || "")) {
            errors.lastname = "Un nom de famille est requis.";
        }
        if (validator.isEmpty(formData.firstname?.trim() || "")) {
            errors.firstname = "Un prénom est requis.";
        }
        if (!validator.isEmail(formData.email?.trim() || "")) {
            errors.email = "Veuillez mettre un email valide.";
        }
        if (!imageFile || imageFile.size === 0) {
            errors.image = "Une image est requise.";
        }
    }

    if (formType === "article") {
        if (validator.isEmpty(formData.title?.trim() || "")) {
            errors.title = "Le titre est requis.";
        }
        if (validator.isEmpty(formData.content?.trim() || "")) {
            errors.content = "Le contenu est requis.";
        }
        if (!imageFile || imageFile.size === 0) {
            errors.image = "Une image est requise.";
        }
    }

    if (formType === "sae") {
        if (validator.isEmpty(formData.title?.trim() || "")) {
            errors.title = "Le titre est requis.";
        }
        if (validator.isEmpty(formData.content?.trim() || "")) {
            errors.content = "Le contenu est requis.";
        }
        if (!imageFile || imageFile.size === 0) {
            errors.image = "Une image est requise.";
        }
    }

    return errors;
};

const handleFormValidation = (form, formType) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries()); 

        const errors = validateForm(formData, formType); 

        // Réinitialiser les erreurs affichées
        document.querySelectorAll("[data-error-message]").forEach((el) => {
            el.classList.add("hidden");
        });

        if (Object.keys(errors).length > 0) {
            // Afficher les erreurs
            for (const [field, message] of Object.entries(errors)) {
                const errorElement = document.querySelector(`[data-error-message='${field}']`);
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.classList.remove("hidden");
                }
            }
        } else {
            console.log("Formulaire valide, prêt à être soumis !");
        }
    });
};

// Sélectionner les formulaires 
document.addEventListener("DOMContentLoaded", () => {
    const authorForm = document.querySelector("form[data-form='author']");
    const articleForm = document.querySelector("form[data-form='article']");
    const saeForm = document.querySelector("form[data-form='sae']");

    if (authorForm) handleFormValidation(authorForm, "author");
    if (articleForm) handleFormValidation(articleForm, "article");
    if (saeForm) handleFormValidation(saeForm, "sae");
});
