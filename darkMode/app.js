const $toggleBtn = document.querySelector('.toggle-button');
$toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.matches('.dark')) {
    localStorage.setItem('(prefers-color-scheme: dark)', 'dark');
  } else {
    localStorage.setItem('(prefers-color-scheme: dark)', 'light');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('(prefers-color-scheme: dark)') === 'dark') {
    document.body.classList.add('dark');
  } else if (localStorage.getItem('(prefers-color-scheme: dark)') === 'light') {
    document.body.classList.remove('dark');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
  }
});
