const $accordion = document.querySelector('.accordion');

const changeActive = (target) => {
  [...$accordion.children].forEach(($child) => {
    $child.classList.toggle('active', $child === target);
  });
};

const changeHeight = (target) => {
  [...$accordion.children].forEach(($child) => {
    $child.lastElementChild.style.height =
      $child === target ? `${$child.lastElementChild.scrollHeight}px` : '0';
  });
};

$accordion.addEventListener('click', (e) => {
  changeActive(e.target.parentNode);
  changeHeight(e.target.parentNode);
});

document.addEventListener('DOMContentLoaded', () => {
  const $active = document.querySelector('.active');
  $active.lastElementChild.style.height = `${$active.lastElementChild.scrollHeight}px`;
});

setTimeout(() => {
  document.body.style.opacity = '1';
}, 400);
