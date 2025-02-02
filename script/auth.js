document.addEventListener("DOMContentLoaded", function () {
    checkAuth();
});

// Fonction pour inscrire un utilisateur
function signUp() {
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    // Vérifie si tous les champs sont remplis
    if (!username || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Vérifie si le nom d'utilisateur est déjà pris
    if (users[username]) {
        alert("Ce nom d'utilisateur existe déjà.");
        return;
    }

    // Enregistre le nouvel utilisateur avec son mot de passe
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie !");
}

// Fonction pour connecter un utilisateur
function logIn() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    if (users[username] && users[username] === password) {
        // Stocke l'utilisateur actuellement connecté
        localStorage.setItem("currentUser", username);
        alert("Connexion réussie !");
        checkAuth();
    } else {
        alert("Identifiants incorrects.");
    }
}

// Fonction pour déconnecter un utilisateur
function logOut() {
    localStorage.removeItem("currentUser");
    checkAuth();
}

// Fonction pour vérifier si un utilisateur est connecté
function checkAuth() {
    let user = localStorage.getItem("currentUser");

    if (user) {
        // Masque la section d'authentification et affiche la section des tâches
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("task-section").classList.remove("hidden");
    } else {
        // Affiche la section d'authentification et masque la section des tâches
        document.getElementById("auth-section").classList.remove("hidden");
        document.getElementById("task-section").classList.add("hidden");
    }

    updateUI();
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
function updateUI() {
    let user = localStorage.getItem("currentUser");
    let header = document.getElementById("header");
    let mainTitle = document.getElementById("main-title");
    let userNameSpan = document.getElementById("user-name");

    if (user) {
        header.classList.remove("hidden");
        mainTitle.textContent = "Tasks Manager";
         // Affiche le nom de l'utilisateur connecté
        userNameSpan.textContent = user;
    } else {
        header.classList.add("hidden");
        // Change le titre principal en mode connexion
        mainTitle.textContent = "Authentification";
        userNameSpan.textContent = "Account";
    }
}
