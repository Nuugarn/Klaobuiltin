(() => {
  const dialog = document.querySelector('.place-lightbox');
  if (!dialog) return;
  const photos = Array.from(document.querySelectorAll('[data-place-photo]'));
  const image = dialog.querySelector('.place-lightbox-image');
  const caption = dialog.querySelector('.place-lightbox-caption');
  let current = 0;
  let opener;
  let previousOverflow;

  function show(index) {
    current = (index + photos.length) % photos.length;
    const source = photos[current].querySelector('img');
    image.src = photos[current].dataset.full || source.src;
    image.alt = source.alt;
    caption.textContent = `${current + 1} / ${photos.length} · ${source.alt}`;
  }

  photos.forEach((button, index) => {
    button.addEventListener('click', () => {
      opener = button;
      show(index);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });
  dialog.querySelector('.place-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-place-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-place-next]').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
