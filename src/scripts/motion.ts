/*
  Motion — GSAP + ScrollTrigger, ported from the prototype's _animate().
  Rules from the handoff:
   - All initial "hidden" states are set here (via gsap.from / fromTo), never in
     CSS, so if this script never runs the page is simply static and visible.
   - Everything is skipped under prefers-reduced-motion.
   - A safety pass 2.6s after boot rescues anything left hidden (guards hosts
     where ScrollTrigger never fires).
*/
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const prefersReduced =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  gsap.registerPlugin(ScrollTrigger);
  // Let layout/fonts settle a frame before measuring scroll positions.
  requestAnimationFrame(() => window.setTimeout(animate, 60));
}

function animate(): void {
  const q = <T extends Element = HTMLElement>(sel: string) =>
    gsap.utils.toArray<T>(sel);

  // ── Hero load timeline ──
  gsap
    .timeline({ defaults: { ease: 'power4.out' } })
    .from('[data-hero-line]', { yPercent: 112, duration: 0.7, stagger: 0.06 })
    .from('[data-hero-copy]', { y: 20, opacity: 0, duration: 0.5, stagger: 0.06 }, '-=0.42')
    .from(
      '[data-hero-fig]',
      { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.75, ease: 'power3.inOut' },
      '-=0.75',
    )
    .from('[data-hero-fig] + figcaption', { opacity: 0, duration: 0.35 }, '-=0.2');

  // ── Scroll reveals (spec strip, about, contact) ──
  const scrollReveal = (els: Element[], vars: gsap.TweenVars = {}) => {
    els.forEach((el, i) => {
      gsap.from(el, {
        y: 26,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: (i % 3) * 0.06,
        ...vars,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  };

  scrollReveal(q('[data-spec-strip] > div'), { y: 16, duration: 0.42 });
  scrollReveal(q('#about [data-reveal], #contact [data-reveal]'));

  // ── Project cards: diagonal clip expansion from the top-left, then corners pop ──
  q('#projects article').forEach((card, i) => {
    const corners = card.querySelectorAll('.corner');
    gsap
      .timeline({ scrollTrigger: { trigger: card, start: 'top 88%', once: true } })
      .fromTo(
        card,
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%)', opacity: 1 },
        { clipPath: 'polygon(0% 0%, 230% 0%, 0% 230%)', duration: 0.62, ease: 'power3.inOut', delay: i * 0.09 },
      )
      .fromTo(
        corners,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, duration: 0.24, stagger: 0.04, ease: 'back.out(2.4)' },
        '-=0.24',
      )
      .set(card, { clearProps: 'clipPath' });
  });

  // ── Section header rules draw in from the left ──
  q('[data-h2]').forEach((h) => {
    const rule = h.nextElementSibling;
    if (!rule) return;
    gsap.from(rule, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.7,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });

  // ── Scrubbed parallax: project images and the hero figure ──
  q('#projects article').forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { scale: 1.14 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  const fig = document.querySelector('[data-hero-fig]');
  if (fig && window.innerWidth > 900) {
    gsap.to(fig, {
      y: -46,
      ease: 'none',
      scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });
  }

  // ── Safety pass: rescue anything still hidden after 2.6s ──
  window.setTimeout(() => {
    const stuck = q(
      '[data-reveal], #projects article, [data-spec-strip] > div, [data-hero-fig]',
    ).filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99);
    if (stuck.length) gsap.to(stuck, { opacity: 1, y: 0, clearProps: 'clipPath', duration: 0.4 });

    const clipped = q('#projects article').filter((el) => {
      const c = getComputedStyle(el).clipPath;
      return !!c && c.indexOf('polygon') === 0 && c.indexOf('230%') === -1;
    });
    clipped.forEach((el) => {
      gsap
        .timeline()
        .to(el, { clipPath: 'polygon(0% 0%, 230% 0%, 0% 230%)', duration: 0.62, ease: 'power3.inOut' })
        .fromTo(
          el.querySelectorAll('.corner'),
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.24, stagger: 0.04, ease: 'back.out(2.4)' },
          '-=0.2',
        )
        .set(el, { clearProps: 'clipPath' });
    });
  }, 2600);
}
