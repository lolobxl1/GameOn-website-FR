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
const modalbgclose = document.querySelector(".bground .close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalbgclose.addEventListener("click", () => {
  closeModal();
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  form.style.display = "block";
}

// launch modal form
function closeModal() {
  modalbg.style.display = "none";
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

// Règles
function validateFirst() {
  const value = first.value.trim();
  if (value.length < 2) {
    setError(first, "Le prénom doit contenir au moins 2 caractères.");
    return false;
  }
  clearError(first);
  return true;
}

function validateLast() {
  const value = last.value.trim();
  if (value.length < 2) {
    setError(last, "Le nom doit contenir au moins 2 caractères.");
    return false;
  }
  clearError(last);
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  // Regex email simple et robuste pour une vérification de base
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) {
    setError(email, "Veuillez saisir une adresse e-mail valide.");
    return false;
  }
  clearError(email);
  return true;
}

function validateBirthdate() {
  // HTML5 gère déjà le format; on vérifie juste la présence (required dans le HTML)
  if (!birthdate.value) {
    setError(birthdate, "Veuillez indiquer votre date de naissance.");
    return false;
  }
  clearError(birthdate);
  return true;
}

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
    form.style.display = "none";
    const successdiv = document.createElement("div");
    successdiv.innerHTML = "Merci ! Votre réservation a été reçue.";
    form.parentNode.appendChild(successdiv);
    modalbg.style.display = "block";
  }
});
