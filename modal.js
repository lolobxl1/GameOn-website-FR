function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbgfermer = document.querySelector(".bgroundfermer");
const modalbgclose = document.querySelector(".bground .close");
const modalbgfermerclose = document.querySelector(".bgroundfermer .close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// listener sur tous les boutons avec class .model-btn
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// listener sur .bground .close
modalbgclose.addEventListener("click", () => {
  closeModal();
});

// listener sur .bgroundfermer .close
modalbgfermerclose.addEventListener("click", () => {
  closeModalfermer();
});

// afficher formulaire
function launchModal() {
  modalbg.style.display = "block";
}

// fermer formulaire
function closeModal() {
  modalbg.style.display = "none";
}

// fermer message de confirmation
function closeModalfermer() {
  modalbgfermer.style.display = "none";
}

/* ===== VALIDATION FORMULAIRE ===== */
const form = document.forms.reserve;

// Raccourcis vers les champs
const first = form.querySelector("#first");
const last = form.querySelector("#last");
const email = form.querySelector("#email");
const birthdate = form.querySelector("#birthdate");
const quantity = form.querySelector("#quantity");
const terms = form.querySelector("#checkbox1"); // CGU (obligatoire)
const radios = form.querySelectorAll('input[name="location"]');

// validation prenom
function validateFirst() {
  const value = first.value.trim();
  if (value.length < 2) {
    setError(first, "Le prénom doit contenir au moins 2 caractères.");
    return false;
  }
  clearError(first);
  return true;
}

//validation nom
function validateLast() {
  const value = last.value.trim();
  if (value.length < 2) {
    setError(last, "Le nom doit contenir au moins 2 caractères.");
    return false;
  }
  clearError(last);
  return true;
}

//validation email
function validateEmail() {
  const value = email.value.trim();
  // Regex email : \s@ : un ou plusieurs caracteres sans whitespace ou arobase
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) {
    setError(email, "Veuillez saisir une adresse e-mail valide.");
    return false;
  }
  clearError(email);
  return true;
}

//validation date de naissance
function validateBirthdate() {
  // HTML5 gère déjà le format; on vérifie juste la présence (required dans le HTML)
  if (!birthdate.value) {
    setError(birthdate, "Veuillez indiquer votre date de naissance.");
    return false;
  }
  clearError(birthdate);
  return true;
}

//validation nombre de tournoi
function validateQuantity() {
  const value = quantity.value.trim();
  if (value === "" || isNaN(value)) {
    setError(quantity, "Veuillez saisir une valeur numérique.");
    return false;
  }
  const n = Number(value);
  if (n < 0 || n > 99) {
    setError(quantity, "La valeur doit être comprise entre 0 et 99.");
    return false;
  }
  clearError(quantity);
  return true;
}

// Validation un tournoi selectionne
function validateLocation() {
  const checked = form.querySelector('input[name="location"]:checked');
  // On met l’erreur sur le premier radio pour afficher au bon endroit
  const ref = radios[0];
  if (!checked) {
    setError(ref, "Veuillez sélectionner un tournoi.");
    return false;
  }
  clearError(ref);
  return true;
}

// Validation CGU : tick CGU obligatoire
function validateTerms() {
  if (!terms.checked) {
    setError(terms, "Vous devez accepter les conditions d'utilisation.");
    return false;
  }
  clearError(terms);
  return true;
}

// Validation globale
function validate() {
  const v1 = validateFirst();
  const v2 = validateLast();
  const v3 = validateEmail();
  const v4 = validateBirthdate();
  const v5 = validateQuantity();
  const v6 = validateLocation();
  const v7 = validateTerms();
  return v1 && v2 && v3 && v4 && v5 && v6 && v7;
}

// Afficher les erreurs sur le conteneur .formData
function setError(inputEl, message) {
  const wrapper = inputEl.closest(".formData");
  wrapper.setAttribute("data-error", message || "");
  wrapper.setAttribute("data-error-visible", "true");
}

// Cacher les erreurs sur le conteneur .formData
function clearError(inputEl) {
  const wrapper = inputEl.closest(".formData");
  wrapper.setAttribute("data-error", "");
  wrapper.setAttribute("data-error-visible", "false");
}

//when form is submitted then success message is displayed or nothing happens
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop default submit
  if (validate()) {
    modalbg.style.display = "none";
    modalbgfermer.style.display = "block";
  }
});

//fonction fermer le message de confirmation, on renvoie true pour que la fermeture se fasse
function fermer() {
  return true;
}
