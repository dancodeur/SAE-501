document.addEventListener("DOMContentLoaded", function () {
    let formModified = false;
    const form = document.querySelector("form[data-form]");

    if (!form) return;

    // Détecte les changements dans les champs du formulaire
    form.addEventListener("input", function () {
        formModified = true;
    });

    // Désactive l'alerte si le formulaire est soumis
    form.addEventListener("submit", function () {
        formModified = false;
    });

    // Alerte l'utilisateur s'il essaie de quitter la page sans sauvegarder
    window.addEventListener("beforeunload", function (event) {
        if (formModified) {
            event.preventDefault();
            event.returnValue = "Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter ?";
        }
    });
});
