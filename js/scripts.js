// Mobile menu toggle (defensive: only bind if elements exist)
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.contains('is-open');
    primaryNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}

// Create starry background with battery awareness
async function createStars() {
  // Check if we should skip stars due to battery constraints
  const shouldSkipStars = await checkBatteryConstraints();
  if (shouldSkipStars) return;

  // Look for hero section first, then fallback to body
  let container = document.querySelector('.hero');
  if (!container) {
    container = document.body;
  }

  // Create stars container
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  
  // If adding to body, make it fixed positioned
  if (container === document.body) {
    starsContainer.style.position = 'fixed';
    starsContainer.style.zIndex = '-1';
  }
  
  container.appendChild(starsContainer);

  // Create individual stars
  const starCount = container === document.body ? 50 : 100; // Fewer stars for body
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
  }
}

// Check battery constraints
async function checkBatteryConstraints() {
  try {
    // Check if Battery API is supported
    if (!('getBattery' in navigator)) {
      return false; // If no battery API, assume it's okay to show stars
    }

    const battery = await navigator.getBattery();
    
    // Skip stars if:
    // - Battery is low (less than 20%)
    // - Device is not charging and battery is below 50%
    // - Battery saver mode might be on (very low battery)
    if (battery.level < 0.2) {
      return true; // Skip stars
    }
    
    if (!battery.charging && battery.level < 0.3) {
      return true; // Skip stars
    }

    return false; // Show stars
  } catch (error) {
    // If battery API fails, assume it's okay to show stars
    console.log('Battery API not available or failed:', error);
    return false;
  }
}

// Initialize stars
createStars();

// Hero text animation with battery awareness
async function initHeroAnimation() {
  const heroTitle = document.getElementById('hero-title');
  if (!heroTitle) return;

  // Check if we should skip animations
  const shouldSkipAnimations = await checkAnimationConstraints();
  if (shouldSkipAnimations) {
    // Show all text immediately without animations
    document.body.classList.add('no-animations');
    showAllText();
    return;
  }

  // Start the animation sequence
  startTypingAnimation();
}

// Check animation constraints (battery + reduced motion)
async function checkAnimationConstraints() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  try {
    // Check battery constraints
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      
      // Skip animations if battery is less than 30%
      if (battery.level < 0.3) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    // If battery API fails, allow animations
    return false;
  }
}

// Show all text immediately (fallback)
function showAllText() {
  const typingText = document.querySelector('.typing-text');
  const growText = document.querySelector('.grow-text');
  const slideText = document.querySelector('.slide-text');
  
  if (typingText) typingText.textContent = typingText.dataset.text;
  if (growText) growText.textContent = growText.dataset.text;
  if (slideText) slideText.textContent = slideText.dataset.text;
}

// Start the typing animation sequence
function startTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  const growText = document.querySelector('.grow-text');
  const slideText = document.querySelector('.slide-text');
  
  if (!typingText || !growText || !slideText) return;

  // Phase 1: Type the first part
  typeText(typingText, typingText.dataset.text, 80, () => {
    // Remove cursor after typing is complete
    typingText.classList.add('typing-complete');
    
    // Phase 2: Grow the "Grow" text (delay 300ms)
    setTimeout(() => {
      growText.textContent = growText.dataset.text;
      growText.classList.add('animate');
      
      // Phase 3: Slide in "Your Business" (delay 1800ms after grow starts)
      setTimeout(() => {
        slideText.textContent = slideText.dataset.text;
        slideText.classList.add('animate');
      }, 1800);
    }, 300);
  });
}

// Typing effect function
function typeText(element, text, speed, callback) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  
  type();
}

// Initialize hero animation when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroAnimation);
} else {
  initHeroAnimation();
}

// Nova logo rotation animation with battery awareness
async function initLogoAnimation() {
  const logos = document.querySelectorAll('.logo');
  if (logos.length === 0) return;

  // Check if we should skip animations
  const shouldSkipAnimations = await checkAnimationConstraints();
  if (shouldSkipAnimations) {
    return; // Skip logo animation
  }

  // Start logo rotation for all logo instances
  logos.forEach(logo => {
    logo.classList.add('rotating');
  });
}

// Initialize logo animation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLogoAnimation);
} else {
  initLogoAnimation();
}

