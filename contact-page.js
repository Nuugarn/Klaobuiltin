(() => {
  const form = document.getElementById('contact-inquiry');
  if (!form) return;
  const nameInput = document.getElementById('inquiry-name');
  const phoneInput = document.getElementById('inquiry-phone');

  [nameInput, phoneInput].forEach(input => {
    input.addEventListener('input', () => input.setCustomValidity(''));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.replace(/[\s().-]/g, '');
    nameInput.setCustomValidity(name ? '' : 'กรุณากรอกชื่อผู้ติดต่อ');
    phoneInput.setCustomValidity(/^(?:0\d{8,9}|\+?[1-9]\d{7,14})$/.test(phone) ? '' : 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง');
    if (!form.reportValidity()) return;

    const message = `สวัสดีค่ะ/ครับ สนใจปรึกษางานบิลต์อินกับ KLAO\nชื่อผู้ติดต่อ: ${name}\nเบอร์โทรศัพท์: ${phone}`;
    const account = encodeURIComponent(form.dataset.lineAccount);
    // LINE opens a draft; the visitor confirms sending in LINE.
    window.location.assign(`https://line.me/R/oaMessage/${account}/?${encodeURIComponent(message)}`);
  });

  const map = document.querySelector('.contact-map-placeholder');
  const retryButton = map?.querySelector('.contact-map-retry');
  retryButton?.addEventListener('click', () => {
    if (retryButton.disabled) return;
    // Owner-requested visual retry only; no map service or location is configured.
    retryButton.disabled = true;
    map.classList.add('is-retrying');
    map.setAttribute('aria-busy', 'true');
    window.setTimeout(() => {
      map.classList.remove('is-retrying');
      map.removeAttribute('aria-busy');
      retryButton.disabled = false;
    }, 800);
  });
})();
