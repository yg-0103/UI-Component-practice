const $startBtn = document.querySelector('#startBtn');
const $resetBtn = document.querySelector('#resetBtn');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

const stopWatch = (() => {
  let lap = [];
  let timerId;
  let mm = 0;
  let ss = 0;
  let ms = 0;

  return {
    start() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        return;
      }
      timerId = setInterval(() => {
        ++ms;
        if (ss > 59) {
          ++mm;
          ss = 0;
        } else if (ms > 99) {
          ++ss;
          ms = 0;
        }
        $display.textContent = `${mm < 10 ? '0' + mm : mm}:${
          ss < 10 ? '0' + ss : ss
        }:${ms < 10 ? '0' + ms : ms}`;
      }, 10);
    },

    reset() {
      $resetBtn.disabled = true;
      $display.textContent = '00:00:00';
      $laps.innerHTML = '';
      lap = [];
      mm = 0;
      ss = 0;
      ms = 0;
    },

    lapRender() {
      lap.push($display.textContent);
      $laps.innerHTML = `<div class="lap-title">Laps</div>
      <div class="lap-title">Time</div>
      ${lap.map((lap, i) => `<div>${i + 1}</div> <div>${lap}</div>`).join('')}
      `;
    },
  };
})();

$startBtn.addEventListener('click', () => {
  $startBtn.textContent = $startBtn.textContent === 'Start' ? 'Stop' : 'Start';
  $resetBtn.textContent = $startBtn.textContent === 'Start' ? 'Reset' : 'Lap';
  $resetBtn.disabled = false;
  stopWatch.start();
});

$resetBtn.addEventListener('click', () => {
  $resetBtn.textContent === 'Lap' ? stopWatch.lapRender() : stopWatch.reset();
});
