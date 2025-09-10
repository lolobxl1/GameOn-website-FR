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
}

// launch modal form
function closeModal() {
  modalbg.style.display = "none";
}
