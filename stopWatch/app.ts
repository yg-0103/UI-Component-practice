const $startBtn = document.querySelector('#startBtn') as HTMLButtonElement;
const $resetBtn = document.querySelector('#resetBtn') as HTMLButtonElement;
const $display = document.querySelector('.display') as HTMLElement;
const $laps = document.querySelector('.laps') as HTMLElement;

interface StopWatch {
  start(): void;
  reset(): void;
  lapRender(): void;
}

const stopWatch = ((): StopWatch => {
  let lap: string[] = [];
  let timerId: ReturnType<typeof setTimeout> | null;
  let mm: number = 0;
  let ss: number = 0;
  let ms: number = 0;

  return {
    start(): void {
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

    reset(): void {
      $resetBtn.disabled = true;
      $display.textContent = '00:00:00';
      $laps.innerHTML = '';
      lap = [];
      mm = 0;
      ss = 0;
      ms = 0;
    },

    lapRender(): void {
      lap.push($display.textContent as string);
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
