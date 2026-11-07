(function () {
  const phone = document.querySelector('.consult-phone');
  const copy = document.querySelector('.consult-story__copy');
  if (!phone || !copy || !('IntersectionObserver' in window)) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const chat = phone.querySelector('.consult-phone__chat');
  const rows = Array.from(chat.querySelectorAll('[data-speaker]'));
  const typing = chat.querySelector('.consult-phone__typing');
  const field = phone.querySelector('.consult-phone__field');
  const draft = phone.querySelector('.consult-phone__draft');
  let timer;
  let active = false;
  let index = 0;

  function later(fn, delay) { timer = setTimeout(fn, delay); }
  function scrollChat() {
    chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
  }
  function reset(showAll) {
    clearTimeout(timer);
    typing.hidden = true;
    field.classList.remove('is-typing');
    draft.textContent = '';
    rows.forEach(row => {
      row.hidden = !showAll;
      row.classList.remove('is-new');
    });
    index = 0;
    chat.scrollTop = showAll ? chat.scrollHeight : 0;
  }
  function showRow(row) {
    row.hidden = false;
    row.classList.add('is-new');
    scrollChat();
    index++;
    later(next, 850);
  }
  function typeCustomer(row) {
    const text = row.querySelector('.consult-phone__bubble').textContent.trim();
    const letters = typeof Intl.Segmenter === 'function'
      ? Array.from(new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(text), part => part.segment)
      : Array.from(text);
    let position = 0;
    field.classList.add('is-typing');
    function typeNext() {
      if (position < letters.length) {
        draft.textContent += letters[position++];
        draft.scrollLeft = draft.scrollWidth;
        later(typeNext, 65);
      } else {
        later(() => {
          field.classList.remove('is-typing');
          draft.textContent = '';
          showRow(row);
        }, 350);
      }
    }
    typeNext();
  }
  function next() {
    if (!active || motion.matches) return;
    if (index === rows.length) {
      later(() => {
        reset(false);
        later(next, 650);
      }, 5000);
      return;
    }
    const row = rows[index];
    if (row.hasAttribute('data-photo')) {
      showRow(row);
    } else if (row.dataset.speaker === 'customer') {
      typeCustomer(row);
    } else {
      typing.hidden = false;
      scrollChat();
      later(() => {
        typing.hidden = true;
        showRow(row);
      }, 1400);
    }
  }
  function update() {
    reset(!active || motion.matches);
    if (active && !motion.matches) later(next, 500);
  }

  if (!motion.matches) {
    copy.classList.add('is-reveal-ready');
    new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      copy.classList.add('is-revealed');
      observer.disconnect();
    }, { threshold: .15 }).observe(copy);
  }

  new IntersectionObserver(entries => {
    active = entries[0].isIntersecting;
    update();
  }, { threshold: .15 }).observe(phone);

  motion.addEventListener('change', update);
})();
