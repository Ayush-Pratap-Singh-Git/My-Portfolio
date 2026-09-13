const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const panels = [...document.querySelectorAll('.tab-panel')];
const navLinks = [...document.querySelectorAll('[data-tab-target]')];
const moreDishesButton = document.getElementById('more-dishes-button');
const menuGrid = document.querySelector('.menu-grid');

function showTab(tabName) {
  const panel = document.getElementById(tabName);
  if (!panel) return;
  panels.forEach((item) => {
    const isSelected = item === panel;
    item.classList.toggle('active', isSelected);
    item.hidden = !isSelected;
  });
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.tabTarget === tabName));
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.history.replaceState(null, '', `#${tabName}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => link.addEventListener('click', () => showTab(link.dataset.tabTarget)));
document.querySelectorAll('[data-tab]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showTab(link.dataset.tab);
}));
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

moreDishesButton.addEventListener('click', () => {
  const isExpanded = menuGrid.classList.toggle('show-more');
  moreDishesButton.innerHTML = isExpanded ? 'Show fewer dishes <span>↑</span>' : 'More dishes <span>↓</span>';
  moreDishesButton.setAttribute('aria-expanded', String(isExpanded));
});

const form = document.getElementById('feedback-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(form));
  const feedback = JSON.parse(localStorage.getItem('hungryHeadFeedback') || '[]');
  feedback.push({ ...formData, createdAt: new Date().toISOString() });
  localStorage.setItem('hungryHeadFeedback', JSON.stringify(feedback));
  status.textContent = `Thanks, ${formData.name}. Your feedback has been received.`;
  form.reset();
});

const initialTab = window.location.hash.replace('#', '') || 'home';
showTab(document.getElementById(initialTab) ? initialTab : 'home');
