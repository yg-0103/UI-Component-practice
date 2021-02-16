const $popupBtn = document.querySelector('.btn-popup');
const $popupContainer = document.querySelector('.popup-container');

const $popupMessage = document.querySelector('.popup-message');
const $message = document.querySelector('input');

$popupBtn.addEventListener('click', () => {
  $popupContainer.classList.toggle('active');
});

$popupContainer.addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.matches('button') && e.target !== e.currentTarget) return;

  if (e.target.matches('.btn-ok')) {
    $popupMessage.textContent = `from popup: ${$message.value}`;
    $message.value = '';
  }
  $popupContainer.classList.remove('active');
});
