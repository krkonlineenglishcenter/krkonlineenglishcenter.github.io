// Dit au CSS que JavaScript fonctionne (utile pour les petites animations)
document.documentElement.classList.add("js");

// Année automatique dans le pied de page (présent sur toutes les pages)
document.getElementById("year").textContent = new Date().getFullYear();

// Apparition douce des blocs quand on arrive dessus en faisant défiler la page
const reveals = document.querySelectorAll(".reveal");
reveals.forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 120 + "ms";   // petit décalage entre blocs voisins
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("in"));  // anciens navigateurs : tout afficher
}

// Formulaire : seulement sur la page d'inscription
const form = document.getElementById("signup");
const message = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();               // empêche le rechargement de la page
    message.textContent = "Envoi en cours...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        message.textContent = "Merci ! Votre inscription est bien reçue. Nous vous répondons vite par email.";
        form.reset();
      } else {
        message.textContent = "Erreur. Réessayez, ou écrivez-nous par email depuis la page Contact.";
      }
    } catch (error) {
      message.textContent = "Pas de connexion. Réessayez, ou écrivez-nous par email depuis la page Contact.";
    }
  });
}
