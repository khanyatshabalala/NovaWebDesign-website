// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.contains('is-open');
  primaryNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', !isOpen);
});

// Create starry background
function createStars() {
  const hero = document.querySelector('.hero');
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  hero.appendChild(starsContainer);

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
  }
}

createStars();

