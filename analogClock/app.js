const setTime = (() => {
  const $hand = document.querySelectorAll('.hand');
  const date = new Date();
  const hourDeg =
    (date.getHours() % 12) * 30 +
    date.getMinutes() * 0.5 +
    date.getSeconds() * (0.5 / 60);
  const minuteDeg = date.getMinutes() * 6 + date.getSeconds() * 0.1;
  const secondDeg = date.getSeconds() * 6;
  const deg = [hourDeg, minuteDeg, secondDeg];
  const PER_SECOND_HANDS_DEG = [0.5 / 60, 0.1, 6];

  return () => {
    $hand.forEach((hand, i) => {
      console.log(deg[i]);
      hand.style.setProperty('--deg', (deg[i] += PER_SECOND_HANDS_DEG[i]));
      if (deg[i] > 360) {
        deg[i] = PER_SECOND_HANDS_DEG[i];
      }
    });
  };
})();

setInterval(setTime, 1000);
document.addEventListener('DOMContentLoaded', setTime);
