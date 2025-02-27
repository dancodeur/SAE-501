// intéractivité menu déroulant de la pagination
document.addEventListener("DOMContentLoaded", function () {
    const paginationDropdown = document.querySelector("#select-page");

    if (paginationDropdown) {
        paginationDropdown.addEventListener("change", function (event) {
            const selectedPage = event.target.value; 
            const queryParams = new URLSearchParams(window.location.search); 
            queryParams.set("page", selectedPage); 

            // Redirige vers l'URL de la page 
            window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
        });
    }
});
