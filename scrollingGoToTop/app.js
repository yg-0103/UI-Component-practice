const TOP_POS_TO_START_SHOWING = 100;
const $scrollBtn = document.querySelector('.scroll-icon');

window.addEventListener(
  'scroll',
  _.throttle(() => {
    $scrollBtn.style.display =
      window.pageYOffset > TOP_POS_TO_START_SHOWING ? 'block' : 'none';
  }, 200)
);

$scrollBtn.addEventListener('click', (e) => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
});
