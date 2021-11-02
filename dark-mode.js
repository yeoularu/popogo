if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  document.getElementById("logotype").toggleAttribute(fill, "white");
});
