const form = document.getElementById("form");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const typeBillet = document.getElementById("type_billet");
const nombreBillets = document.getElementById("nombre_billets");

const validateForm = () => {
    let noError = true;

    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const typeBilletValue = typeBillet.value;
    const nombreBilletsValue = nombreBillets.value.trim();

    if (nomValue === "") {
        setError(nom, "Nom est requis");
        noError = false;
    } else if (nomValue.length > 20) {
        setError(nom, "Le nom ne peut pas dépasser 20 caractères");
        noError = false;
    } else if (/\d/.test(nomValue)) {
        setError(nom, "Pas de chiffres autorisés");
        noError = false;
    } else {
        setSuccess(nom);
    }

    if (emailValue === "") {
        setError(email, "Email est requis");
        noError = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Mettre un Email Valide");
        noError = false;
    } else {
        setSuccess(email);
    }

    if (typeBilletValue === "") {
        setError(typeBillet, "Type de billet est requis");
        noError = false;
    } else {
        setSuccess(typeBillet);
    }

    if (nombreBilletsValue === "" || isNaN(nombreBilletsValue) || nombreBilletsValue < 1) {
        setError(nombreBillets, "Nombre de billets est requis et doit être supérieur à 0");
        noError = false;
    } else {
        setSuccess(nombreBillets);
    }

    return noError;
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const setError = (input, message) => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector(".form__errorMessage");

    errorDisplay.innerText = message;
    inputControl.classList.add("form__errorMessageBox");
    inputControl.classList.remove("success");
};

const setSuccess = (input) => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector(".form__errorMessage");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("form__errorMessageBox");
};