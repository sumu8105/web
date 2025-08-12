function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        if (msg === "Login successful") {
            localStorage.setItem("user", username);
            window.location.href = "dashboard.html";
        }
    });
}

function register() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(alert);
}

function searchGoogle() {
    let query = document.getElementById("searchBox").value.trim();
    if (query) {
        window.location.href = "https://www.google.com/search?q=" + encodeURIComponent(query);
    }
}
