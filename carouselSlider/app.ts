const render = (target: HTMLElement, images: string[]) => {
  target.innerHTML = `<div class="carousel-slides">${images
    .map((image) => `<img src="${image}">`)
    .join('')}</div>
    <button class="carousel-control prev">«</button>
    <button class="carousel-control next">»</button>`;
};

const carousel = ($container: HTMLElement, images: string[]) => {
  render($container, images);

  let currentSlide: number = 1;
  let duration: number = 300;
  let intervalTimerId: ReturnType<typeof setInterval> | null;
  let timeoutTimerId: ReturnType<typeof setTimeout> | null;

  const $carouselSlides = document.querySelector(
    '.carousel-slides'
  ) as HTMLElement;
  const $btnNext = document.querySelector('.next') as HTMLButtonElement;
  const $btnPrev = document.querySelector('.prev') as HTMLButtonElement;
  const $fistImgClone = (document.querySelector(
    'img'
  ) as HTMLElement).cloneNode();
  const $lastImgClone = ($carouselSlides.lastElementChild as HTMLElement).cloneNode();

  const setSlide = (): void => {
    $carouselSlides.style.setProperty('--duration', `${duration}`);
    $carouselSlides.style.setProperty('--currentSlide', `${currentSlide}`);
  };

  const initialSlide = (length: number, index: number) => {
    if (currentSlide === length) {
      setTimeout(() => {
        duration = 0;
        currentSlide = index;
        setSlide();
      }, duration);
    }
  };

  const resetTimer = (): void => {
    clearInterval(intervalTimerId as ReturnType<typeof setInterval>);
    clearTimeout(timeoutTimerId as ReturnType<typeof setInterval>);
    timeoutTimerId = null;
    intervalTimerId = null;
  };

  const autoSlide = (): void => {
    intervalTimerId = setInterval(() => {
      currentSlide += 1;
      duration = 300;

      setSlide();
      initialSlide(images.length + 1, 1);
    }, 1000);
  };

  const nextSlide = (): void => {
    resetTimer();

    currentSlide += 1;
    duration = 300;

    setSlide();
    initialSlide(images.length + 1, 1);

    timeoutTimerId = setTimeout(autoSlide, 1000);
  };

  const prevSlide = (): void => {
    resetTimer();

    duration = 300;
    currentSlide -= 1;

    setSlide();
    initialSlide(0, images.length);

    timeoutTimerId = setTimeout(autoSlide, 1000);
  };

  $carouselSlides.prepend($lastImgClone);
  $carouselSlides.append($fistImgClone);

  $btnNext.addEventListener('click', _.throttle(nextSlide, duration));

  $btnPrev.addEventListener('click', _.throttle(prevSlide, duration));

  window.onload = () => {
    $container.style.width = `${
      $container.scrollWidth / (images.length + 2)
    }px`;
    $container.style.opacity = '1';
    $carouselSlides.style.setProperty('--currentSlide', `${currentSlide}`);
    autoSlide();
  };
};

carousel(document.querySelector('.carousel') as HTMLElement, [
  'https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABcZQXIucIN_xRu1gyK_fb9U4zOPM7N_0uUh0zT9caSez5blf---4foEcBqrOGp5fjpLSjyfJRQc76BT1tewf1-5Go0HJWwVb5qguK2xgvel2F3rMunc132yG337r.jpg?r=449',
  'https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUWABujkk_IMCnztl0EhuJjaQz7O1kpAxSVvFqpst0hCNTXygWVdyw-xFBy7xwzO7LR-TmuordV7NlZDg2jKGC9YnuKsXAEL9j28FEUS5ZtdKa_R9vOvYAIeIUA5.jpg?r=dd1',
  'https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABWex9f-iWrovQQkWnoA74IkLGjtkFIzpswvO0cIep2p78WCHSVKgWsh3B6yvnbhpCdifBBfI9NqF8geBUhffxNxXEwpHp7jvCoNB3ubqgVtANvhGjINSjLrzxO3v.jpg?r=c9f',
  'https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABWnpIDCyg-rliVC_FlI3eGe1oxm5Av006G6HBy8110kB1WKslaT5Hw9oGgDUknjbH4LHJNZuv3lL7boVd7lSDKJBo48.webp?r=f76',
  'https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQWmVqG2mSMPhkWTbi0wjk99HpptvpXHpSk5Q5vZWYanLtZreY2gN_09N_8w9K-pDZ8mSsjIWKWTUP4kcadmUJug71QsW8WV1SASyuhforonZcWsQMnIZjSyx-RU.jpg?r=742',
  'https://occ-0-1007-3996.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABfRunIgRuibk6xdSBIdlJVg3r3rA3gPYCJA70qUFLC4db7nAJPL3r_15txbOjQnALfQ_WM02ejbym72r3KIoWUYTcUY.webp?r=8d0',
]);
