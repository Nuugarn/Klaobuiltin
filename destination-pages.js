/* Progressive enhancement: every category stays visible when JavaScript is unavailable. */
(function () {
  const filters = document.querySelector('.work-filters');
  if (!filters) return;
  const groups = document.querySelectorAll('[data-work-group]');
  const buttons = filters.querySelectorAll('[data-work-filter]');
  filters.hidden = false;
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selected = button.dataset.workFilter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      groups.forEach(group => {
        group.hidden = selected !== 'all' && group.dataset.workGroup !== selected;
      });
    });
  });
})();

/* Native scrolling also supports touch and remains available without JavaScript. */
(function () {
  const carousel = document.querySelector('.portfolio-slider');
  if (!carousel) return;
  const track = carousel.querySelector('.spotlight-track');
  const slides = [...track.querySelectorAll('.spotlight-slide')];
  const controls = carousel.querySelector('.spotlight-controls');
  const picker = controls.querySelector('select');
  const count = controls.querySelector('.spotlight-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let frame = 0;

  function update(index) {
    current = index;
    picker.value = String(index);
    count.textContent = `${index + 1} / ${slides.length}`;
  }
  function move(index) {
    index = (index + slides.length) % slides.length;
    const adjacent = Math.abs(index - current) === 1;
    const offset = slides[index].getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + offset, behavior: reducedMotion.matches || !adjacent ? 'instant' : 'smooth' });
    update(index);
  }
  controls.hidden = false;
  controls.querySelectorAll('[data-slide-direction]').forEach(button => {
    button.addEventListener('click', () => move(current + Number(button.dataset.slideDirection)));
  });
  picker.addEventListener('change', () => move(Number(picker.value)));
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    const actions = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in actions)) return;
    event.preventDefault();
    move(actions[event.key]);
  });
  track.addEventListener('scroll', () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const left = track.getBoundingClientRect().left;
      const distances = slides.map(slide => Math.abs(slide.getBoundingClientRect().left - left));
      update(distances.indexOf(Math.min(...distances)));
      frame = 0;
    });
  }, { passive: true });
})();
