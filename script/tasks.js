function addTask() {
    let title = document.getElementById("task-title").value;
    let desc = document.getElementById("task-desc").value;
    let deadline = document.getElementById("task-deadline").value;
    let user = localStorage.getItem("currentUser");

    // Vérifie si tous les champs sont remplis
    if (!title || !desc || !deadline) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Récupère les tâches stockées dans localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    
    if (!tasks[user]) tasks[user] = [];

    // Ajouter la nouvelle tâche dans le tableau de l'utilisateur
    tasks[user].push({
        title,
        desc,
        deadline,
        status: "pending"
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// Fonction pour charger et afficher les tâches de l'utilisateur connecté
function loadTasks() {
    let user = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let userTasks = tasks[user] || [];

    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    // Parcourt toutes les tâches de l'utilisateur et les affiche
    userTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "border p-2 rounded flex justify-between";

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong> - ${task.desc} (${task.deadline})
                <br>
                Status: ${task.status === "done" ? "✅ Terminé" : "🕓 En cours"}
            </div>
            <div>
                ${task.status !== "done" ? `<button onclick="completeTask(${index})" class="bg-green-500 text-white px-2 rounded">✔</button>` : ""}
                ${task.status !== "done" ? `<button onclick="deleteTask(${index})" class="bg-red-500 text-white px-2 rounded">X</button>` : ""}
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Fonction pour marquer une tâche comme terminée
function completeTask(index) {
    let user = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

    tasks[user][index].status = "done";
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// Fonction pour supprimer une tâche (si elle n'est pas terminée)
function deleteTask(index) {
    let user = localStorage.getItem("currentUser");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

    tasks[user].splice(index, 1); 
    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// Fonction pour rechercher une tâche dans la liste
function searchTask() {
    let query = document.getElementById("search-task").value.toLowerCase();
    let tasks = document.querySelectorAll("#task-list li");

    // Parcourt toutes les tâches et affiche uniquement celles correspondant à la recherche
    tasks.forEach(task => {
        task.style.display = task.innerText.toLowerCase().includes(query) ? "block" : "none";
    });
}
