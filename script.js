const langButtons = document.querySelectorAll("[data-lang]");
const filterButtons = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll("[data-category]");

const setLanguage = (lang) => {
  document.documentElement.lang = lang === "ja" ? "ja" : "en";
  document.body.dataset.lang = lang;
  localStorage.setItem("portfolioLang", lang);
  langButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
  });
};

const setFilter = (filter) => {
  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.filter === filter ? "true" : "false");
  });

  cards.forEach((card) => {
    const matches = filter === "all" || card.dataset.category.split(" ").includes(filter);
    card.hidden = !matches;
  });
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

setLanguage(localStorage.getItem("portfolioLang") || "en");
setFilter("all");
