const form = document.getElementById("form");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const typeBillet = document.getElementById("type_billet");
const nombreBillets = document.getElementById("nombre_billets");
const telephone = document.getElementById("telephone");
const adresse = document.getElementById("adresse");
const codePostal = document.getElementById("code_postal");
const parking = document.getElementById("parking");

const validateForm = () => {
    let noError = true;

    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const typeBilletValue = typeBillet.value;
    const nombreBilletsValue = nombreBillets.value.trim();
    const telephoneValue = telephone.value.trim();
    const adresseValue = adresse.value.trim();
    const codePostalValue = codePostal.value.trim();
    const parkingValue = parking.value.trim();

    if (nomValue === "") {
        setError(nom, "Nom est requis");
        noError = false;
    } else if (nomValue.length > 40) {
        setError(nom, "Le nom ne peut pas dépasser 40 caractères");
        noError = false;
    } else if (/\d/.test(nomValue)) {
        setError(nom, "Pas de chiffres autorisés");
        noError = false;
    } else if (nomValue.length < 2){
        setError(nom, "Le nom doit contenir au moins 2 caractères");
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

    if (telephoneValue === "") {
        setError(telephone, "Telephone est requis");
        noError = false;
    } else if (!/^\d{10}$/.test(telephoneValue)) {
        setError(telephone, "Le téléphone doit être composé de 10 chiffres");
        noError = false;
    } else {
        setSuccess(telephone);
    }

    if (adresseValue === "") {
        setError(adresse, "Adresse est requise");
        noError = false;
    } else if (adresseValue.length > 100){
        setError(adresse, "L'adresse ne peut pas être plus de 100 caractères");
        noError = false;
    } else {
        setSuccess(adresse);
    }

    if (codePostalValue === "") {
        setError(codePostal, "Code postal est requis");
        noError = false;
    } else if (!/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(codePostalValue)) {
        setError(codePostal, "Code postal invalide (format : A1A 1A1)");
        noError = false;
    } else {
        setSuccess(codePostal);
    }

    if (parkingValue === "aucun") {
        setSuccess(parking);
    } else if (parkingValue === "") {
        setError(parking, "Option de parking est requise");
        noError = false;
    } else {
        setSuccess(parking);
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