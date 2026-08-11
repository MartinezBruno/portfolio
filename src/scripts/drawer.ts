/*
  Mobile drawer: open/close the slide-in menu and its scrim.
  The CSS transitions live in MobileDrawer.astro; this only toggles `.open`
  and the associated ARIA state, plus focus management and scroll lock.
*/
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
const scrim = document.querySelector<HTMLElement>('[data-menu-scrim]');
const drawer = document.querySelector<HTMLElement>('[data-drawer]');

if (toggle && scrim && drawer) {
  const links = drawer.querySelectorAll<HTMLAnchorElement>('a');

  const open = () => {
    drawer.classList.add('open');
    scrim.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const close = () => {
    drawer.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', open);
  closeBtn?.addEventListener('click', () => {
    close();
    toggle.focus();
  });
  scrim.addEventListener('click', close);
  links.forEach((link) => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      close();
      toggle.focus();
    }
  });
}
