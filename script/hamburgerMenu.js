document
  .querySelector("[data-collapse-toggle]")
  .addEventListener("click", function () {
    const target = document.getElementById(this.getAttribute("aria-controls"));
    target.classList.toggle("hidden");
  });
