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
  const focusables = [...drawer.querySelectorAll<HTMLElement>('a[href], button')];
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const isOpen = () => drawer.classList.contains('open');

  const open = () => {
    drawer.inert = false;
    drawer.classList.add('open');
    scrim.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  // `inert` (also set in the markup) keeps the off-screen drawer out of the
  // Tab order while it is closed.
  const close = () => {
    drawer.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    document.body.style.overflow = '';
  };

  const dismiss = () => {
    close();
    toggle.focus();
  };

  toggle.addEventListener('click', open);
  closeBtn?.addEventListener('click', dismiss);
  scrim.addEventListener('click', dismiss);
  // Following a section link hands focus to the anchor target, not the burger.
  links.forEach((link) => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      dismiss();
      return;
    }
    // Keep Tab cycling inside the drawer while it covers the page.
    if (e.key === 'Tab' && first && last) {
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !drawer.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !drawer.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
