const button = document.getElementById("toggle-theme");
const body = document.body;

button.addEventListener("click", () => {
    body.classList.toggle("dark-theme")
});