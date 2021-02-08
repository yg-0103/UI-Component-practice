const $increaseBtn = document.querySelector('.increase');
const $decreaseBtn = document.querySelector('.decrease');

const counter = ((target) => {
  let num = 0;

  return {
    increase() {
      target.textContent = ++num;
    },

    decrease() {
      target.textContent = num > 1 ? --num : 0;
    },
  };
})(document.querySelector('.counter'));

$increaseBtn.addEventListener('click', counter.increase);

$decreaseBtn.addEventListener('click', counter.decrease);
