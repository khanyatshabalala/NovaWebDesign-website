const cards = document.querySelectorAll(".project-card");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-close");
const projects = document.querySelectorAll(".modal-project");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.project;

    projects.forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
