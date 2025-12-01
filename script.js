const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  const isOpen = mobileNav.style.display === 'flex';
  mobileNav.style.display = isOpen ? 'none' : 'flex';
});