const templates = {
  "/": `
    <h2>Home</h2>
    <p>Welcome to the single page of our application.</p>
  `,
}

const updateContent = () => {
  const path = window.location.pathname;
  const app = document.querySelector("#app");

  app.innerHTML = templates[path] || "<h2>404 Not Found</h2>"
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  updateContent();
};

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-link]")) {
    event.preventDefault();
    navigateTo(event.target.herf);
  }
});

window.addEventListener("popstate", updateContent);

updateContent();