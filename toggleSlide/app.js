const $toggle = document.querySelector('.toggle');
const $nav = document.querySelector('nav');
$toggle.addEventListener('click', (e) => {
  $nav.classList.toggle('active');
});
