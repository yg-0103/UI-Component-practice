const $calenderContainer = document.querySelector('.main-container');
const $btnNext = document.querySelector('.btn-next');
const $btnPrev = document.querySelector('.btn-prev');
const $dateInput = document.querySelector('.date-input');

const state = {
  currentMonthDays: [],
  prevMonthDays: [],
  nextMonthDays: [],
  year: null,
  month: null,
  today: null,
  active: false,
};

const setDays = (() => {
  const date = new Date();
  state.year = date.getFullYear();
  state.month = date.getMonth();
  state.today = `${state.year}-${state.month + 1}-${date.getDate()}`;

  return () => {
    const prevMonthLastDay = new Date(state.year, state.month, 0);
    const currentMonthLastDay = new Date(state.year, state.month + 1, 0);
    const currentMonthFirstDay = new Date(state.year, state.month, 1);

    const getPrevMonthDays = (day) => {
      return Array.from({ length: day.getDay() }, (_, i) => {
        return prevMonthLastDay.getDate() - prevMonthLastDay.getDay() + i;
      });
    };

    const getNextMonthDays = (day) => {
      return Array.from({ length: 6 - day.getDay() }, (_, i) => {
        return i + 1;
      });
    };

    const getCurrentMonthDays = (day) => {
      return Array.from({ length: day.getDate() }, (_, i) => {
        return i + 1;
      });
    };

    state.currentMonthDays = getCurrentMonthDays(currentMonthLastDay);
    state.prevMonthDays = getPrevMonthDays(currentMonthFirstDay);
    state.nextMonthDays = getNextMonthDays(currentMonthLastDay);
  };
})();

const setMonthAndYear = (() => {
  const $titleMonth = document.querySelector('.header-month');
  const $titleYear = document.querySelector('.header-year');

  const getMonth = () => {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return month[state.month];
  };
  return () => {
    $titleMonth.textContent = getMonth();
    $titleYear.textContent = state.year;
  };
})();

const findSundays = () => {
  const days = [
    ...state.prevMonthDays,
    ...state.currentMonthDays,
    ...state.nextMonthDays,
  ];

  const sundays = days.filter((_, i) => {
    return !(i % 7);
  });

  return sundays[0] === 1 ? sundays : sundays.slice(1);
};

const render = () => {
  setDays();
  setMonthAndYear();

  const sundays = findSundays();

  $calenderContainer.innerHTML =
    state.prevMonthDays
      .map((day) => `<span id="${day}" style="color: #aaa;">${day}</span>`)
      .join('') +
    state.currentMonthDays
      .map(
        (day) =>
          `<span id="${day}" style="color: ${
            sundays.includes(day) ? 'red' : ''
          }" class="${
            `${state.year}-${state.month + 1}-${day}` === state.today
              ? 'active'
              : ''
          }">${day}</span>`
      )
      .join('') +
    state.nextMonthDays
      .map((day) => `<span id="${day}" style="color: #aaa;">${day}</span>`)
      .join('');
};

const active = (() => {
  const $calendar = document.querySelector('.calendar');

  return {
    toggleActive() {
      state.active = !state.active;
      $calendar.style.opacity = state.active ? `1` : '0';
      $calendar.style.zIndex = state.active ? '1000' : '-1000';
    },

    resetActive() {
      state.active = false;
      $calendar.style.opacity = state.active ? `1` : '0';
      $calendar.style.zIndex = state.active ? '1000' : '-1000';
    },
  };
})();

document.addEventListener('DOMContentLoaded', render);

document.body.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) return;
  active.resetActive();
});
$btnNext.addEventListener('click', () => {
  state.month += 1;

  if (state.month >= 12) {
    state.month = 0;
    state.year += 1;
  }

  render();
});

$btnPrev.addEventListener('click', () => {
  state.month -= 1;

  if (state.month < 0) {
    state.month = 11;
    state.year -= 1;
  }

  render();
});

$dateInput.addEventListener('click', active.toggleActive);

$calenderContainer.addEventListener('click', (e) => {
  if (!e.target.matches('span')) return;
  state.today = `${state.year}-${state.month + 1}-${e.target.id}`;

  $dateInput.value = `${state.year}-${
    state.month + 1 < 10 ? '0' + (state.month + 1) : state.month + 1
  }-${e.target.id < 10 ? '0' + e.target.id : e.target.id}`;
  console.log(state.today);

  render();
  active.toggleActive();
});
