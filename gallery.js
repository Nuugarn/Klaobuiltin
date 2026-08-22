/**
 * gallery.js — shared gallery loader for room pages
 * Reads gallery-data.json and fills [data-gallery-root] shelves.
 *
 * Required markup on each room page:
 *   <div class="filters space-filters" data-gallery-filters>
 *     <button type="button" class="filter-btn active" data-filter="all">ทั้งหมด</button>
 *     <button type="button" class="filter-btn" data-filter="island" data-label="เคาน์เตอร์เกาะกลาง">เคาน์เตอร์เกาะกลาง</button>
 *     ...
 *   </div>
 *   <div class="gallery space-gallery" data-gallery-root data-room="kitchen"></div>
 *
 * Optional:
 *   data-skip-categories="hero"   (default: hero)
 *   data-gallery-json="gallery-data.json"
 */
(function () {
  const DEFAULT_JSON = 'gallery-data.json';
  const DEFAULT_SKIP = ['hero'];

  function labelFor(category, filterRoot) {
    if (!filterRoot) return category;
    const btn = filterRoot.querySelector('[data-filter="' + category + '"]');
    if (btn) {
      return btn.getAttribute('data-label') || btn.dataset.label ||
        (btn.dataset.label = (btn.textContent || '').replace(/\s*\(\d+\)\s*$/, '').trim()) ||
        category;
    }
    return category;
  }

  function cardHTML(item, category, label) {
    const alt = (label + ' — ' + (item.name || '')).replace(/"/g, '&quot;');
    return (
      '<div class="project" data-cat="' + category + '">' +
        '<img src="' + item.thumb + '" data-full="' + item.full + '" alt="' + alt + '" loading="lazy">' +
        '<div class="project-overlay">' +
          '<div class="project-meta">' + label + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function bindPress(card) {
    const on = function () { card.classList.add('is-pressed'); };
    const off = function () { card.classList.remove('is-pressed'); };
    card.addEventListener('touchstart', on, { passive: true });
    card.addEventListener('touchend', off);
    card.addEventListener('touchcancel', off);
    card.addEventListener('mousedown', on);
    card.addEventListener('mouseup', off);
    card.addEventListener('mouseleave', off);
  }

  function setupFilters(filterRoot, galleryRoot) {
    if (!filterRoot) return;

    function projects() {
      return galleryRoot.querySelectorAll('.project');
    }

    function updateCounts() {
      const list = projects();
      const counts = { all: list.length };
      list.forEach(function (p) {
        const c = p.dataset.cat;
        counts[c] = (counts[c] || 0) + 1;
      });
      filterRoot.querySelectorAll('.filter-btn').forEach(function (btn) {
        if (!btn.dataset.label) {
          btn.dataset.label = (btn.textContent || '').replace(/\s*\(\d+\)\s*$/, '').trim();
        }
        const key = btn.dataset.filter;
        const n = counts[key] != null ? counts[key] : 0;
        btn.textContent = btn.dataset.label + ' (' + n + ')';
      });
    }

    filterRoot.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterRoot.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        const f = btn.dataset.filter;
        projects().forEach(function (p) {
          p.classList.toggle('hidden', !(f === 'all' || p.dataset.cat === f));
        });
      });
    });

    updateCounts();
    return updateCounts;
  }

  function setupLightbox(galleryRoot) {
    const lb = document.getElementById('lightbox');
    if (!lb || !galleryRoot) return;

    const imgEl = document.getElementById('lightboxImg');
    const countEl = document.getElementById('lightboxCount');
    const nameEl = document.getElementById('lightboxName');
    let items = [];
    let index = 0;

    function visible() {
      return Array.prototype.slice.call(
        galleryRoot.querySelectorAll('.project')
      ).filter(function (p) {
        return !p.classList.contains('hidden');
      });
    }

    function render() {
      const p = items[index];
      if (!p) return;
      const img = p.querySelector('img');
      imgEl.src = img.getAttribute('data-full') || img.src;
      countEl.textContent = (index + 1) + ' / ' + items.length;
      const meta = p.querySelector('.project-meta');
      nameEl.textContent = meta ? meta.textContent.trim() : '';
    }

    galleryRoot.addEventListener('click', function (e) {
      const p = e.target.closest('.project');
      if (!p || !galleryRoot.contains(p)) return;
      items = visible();
      index = items.indexOf(p);
      if (index < 0) return;
      render();
      lb.hidden = false;
      requestAnimationFrame(function () {
        lb.classList.add('is-open');
      });
      document.body.style.overflow = 'hidden';
    });

    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () {
        if (!lb.classList.contains('is-open')) lb.hidden = true;
      }, 300);
    }

    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (closeBtn) closeBtn.onclick = close;
    if (prevBtn) {
      prevBtn.onclick = function () {
        if (!items.length) return;
        index = (index - 1 + items.length) % items.length;
        render();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = function () {
        if (!items.length) return;
        index = (index + 1) % items.length;
        render();
      };
    }
    lb.addEventListener('click', function (e) {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && items.length) {
        index = (index - 1 + items.length) % items.length;
        render();
      }
      if (e.key === 'ArrowRight' && items.length) {
        index = (index + 1) % items.length;
        render();
      }
    });
  }


  function fillHero(room, roomData) {
    const heroEls = document.querySelectorAll(
      '[data-gallery-hero][data-room="' + room + '"], [data-gallery-hero]:not([data-room])'
    );
    if (!heroEls.length) return;

    const items = (roomData && roomData.hero) || [];
    const item = items[0];
    heroEls.forEach(function (el) {
      // Prefer matching data-room; skip orphan :not([data-room]) if another room is active on page
      if (el.hasAttribute('data-room') && el.getAttribute('data-room') !== room) return;
      if (!item) {
        el.hidden = true;
        el.innerHTML = '';
        return;
      }
      el.hidden = false;
      const alt = el.getAttribute('data-hero-alt') || (room + ' hero');
      // Use full image for hero banner (sharper); fall back to thumb
      const src = item.full || item.thumb;
      el.innerHTML =
        '<img class="space-view-hero" src="' + src + '" alt="' + alt.replace(/"/g, '&quot;') + '" width="1080" height="720" loading="eager">';
    });
  }

  function fillGallery(galleryRoot, roomData, filterRoot, skip) {
    const parts = [];
    const categories = Object.keys(roomData || {}).sort();
    categories.forEach(function (cat) {
      if (skip.indexOf(cat) !== -1) return;
      const items = roomData[cat] || [];
      if (!items.length) return;
      const label = labelFor(cat, filterRoot);
      items.forEach(function (item) {
        parts.push(cardHTML(item, cat, label));
      });
    });

    if (!parts.length) {
      galleryRoot.innerHTML =
        '<p class="gallery-empty" style="grid-column:1/-1;color:#7A7A76;padding:24px 0;text-align:center;">ยังไม่มีรูปในหมวดนี้</p>';
      return;
    }

    galleryRoot.innerHTML = parts.join('\n');
    galleryRoot.querySelectorAll('.project').forEach(bindPress);
  }

  function initOne(galleryRoot) {
    const room = galleryRoot.getAttribute('data-room');
    if (!room) {
      console.warn('[gallery] missing data-room on', galleryRoot);
      return;
    }
    const jsonUrl = galleryRoot.getAttribute('data-gallery-json') || DEFAULT_JSON;
    const skipAttr = galleryRoot.getAttribute('data-skip-categories');
    const skip = skipAttr
      ? skipAttr.split(',').map(function (s) { return s.trim(); }).filter(Boolean)
      : DEFAULT_SKIP.slice();

    const filterRoot =
      document.querySelector('[data-gallery-filters][data-room="' + room + '"]') ||
      document.querySelector('[data-gallery-filters]');

    galleryRoot.innerHTML =
      '<p class="gallery-loading" style="grid-column:1/-1;color:#7A7A76;padding:24px 0;text-align:center;">กำลังโหลดรูป…</p>';

    fetch(jsonUrl, { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        const roomData = data[room] || {};
        fillHero(room, roomData);
        fillGallery(galleryRoot, roomData, filterRoot, skip);
        setupFilters(filterRoot, galleryRoot);
        setupLightbox(galleryRoot);
      })
      .catch(function (err) {
        console.error('[gallery]', err);
        galleryRoot.innerHTML =
          '<p class="gallery-error" style="grid-column:1/-1;color:#a44;padding:24px 0;text-align:center;">โหลดรูปไม่สำเร็จ</p>';
      });
  }

  function boot() {
    document.querySelectorAll('[data-gallery-root]').forEach(initOne);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
