const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-open');
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
const toast = document.querySelector('.toast');
let toastTimeout;
function notify(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}
document.querySelectorAll('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail);
      notify('이메일 주소를 복사했습니다.');
    } catch {
      notify(`이메일 주소: ${button.dataset.copyEmail}`);
    }
  });
});
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
const dialog = document.querySelector('.lightbox');
let previousFocus;
document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', event => {
    if (!dialog?.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    previousFocus = link;
    const source = link.querySelector('img');
    dialog.querySelector('img').src = link.href;
    dialog.querySelector('img').alt = source.alt;
    dialog.querySelector('.lightbox-caption').textContent = source.alt;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('[data-close-lightbox]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  previousFocus?.focus();
});
document.querySelectorAll('[data-comparison]').forEach(container => {
  container.querySelectorAll('[data-compare]').forEach(button => {
    button.addEventListener('click', () => {
      const state = button.dataset.compare;
      const label = state === 'before' ? '보정 비활성화' : '보정 활성화';
      container.querySelectorAll('[data-compare]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      const image = container.querySelector('[data-compare-image]');
      image.src = image.dataset[state];
      image.alt = `${label}: 벽 밀착 상태에서의 로컬 1인칭 무기`;
      image.closest('a').href = image.dataset[state];
      container.querySelector('[data-compare-caption]').textContent = `${label} · 로컬 1인칭 무기 표시 비교`;
    });
  });
});
const tocLinks = [...document.querySelectorAll('.project-toc nav a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      tocLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('.project-content > section').forEach(section => observer.observe(section));
}
document.querySelectorAll('details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (!details.open) details.querySelectorAll('video').forEach(v => v.pause());
  });
});
