/* ============================================================
   SCROLL ANIMATIONS JS — Intersection Observer, No GSAP
   Targets every content block, image, card, text, section
   across all nav pages. Elements animate DOWN → UP on scroll.
   ============================================================ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  /* ------------------------------------------------------------------ */
  /* SELECTOR LISTS — categorised by animation direction                 */
  /* ------------------------------------------------------------------ */

  /* UP animation (default — covers every content/image element) */
  var UP = [
    /* ── Generic structural ── */
    'h1', 'h2', 'h3', 'h4', 'h5',
    'p', 'blockquote',
    'img',                          /* ALL images */

    /* ── Badges / labels / kickers ── */
    '.badge-pill-lime', '.slide-kicker', '.slide-title', '.slide-desc',
    '.section-kicker', '.section-label',
    '.about-section-kicker', '.about-story-kicker',
    '.mission-kicker', '.swim-kicker', '.shop-intro-kicker', '.promo-subtext-1', '.promo-subtext-2',

    /* ── Headers / titles ── */
    '.section-title', '.section-subtitle',
    '.programs-main-title', '.programs-header',
    '.promo-main-title',
    '.explore-title', '.explore-desc',
    '.party-title', '.party-subtitle', '.party-kicker', '.party-desc',
    '.swim-title', '.swim-desc',
    '.shop-intro-title', '.shop-intro-para',
    '.shop-facility-title', '.shop-facility-desc',
    '.shop-info-title', '.shop-info-desc',
    '.value-main-title', '.values-banner-text',
    '.mission-big-title', '.mission-desc-para',
    '.mission-pillar-title', '.mission-pillar-desc', '.mission-pillar-header',
    '.about-intro-title', '.about-intro-para',
    '.about-story-title', '.about-story-para',
    '.proud-main-title', '.proud-tagline',
    '.testi-header-title', '.testi-header-dark', '.testi-header-lime',
    '.blog-benefit-title', '.blog-benefit-desc', '.blog-benefit-header',
    '.blog-join-title', '.join-title-lime',
    '.join-community-content',
    '.team-member-name', '.team-member-title',
    '.contact-info', '.contact-hours',
    '.clay-col-title', '.clay-address-text',

    /* ── Cards & tiles ── */
    '.blog-card', '.blog-card-body', '.blog-card-title',
    '.program-horizontal-card', '.program-vertical-card',
    '.program-card-body', '.program-card-title', '.program-card-desc',
    '.vertical-card-body', '.vertical-card-title', '.vertical-card-desc',
    '.team-member',
    '.polaroid-box', '.polaroid-frame', '.polaroid-caption', '.polaroid-quote-text',
    '.explore-white-card', '.explore-stat-box',
    '.location-card', '.location-info', '.location-title',
    '.mission-photo-card',
    '.benefit-item', '.blog-benefit-item',
    '.mission-pillar-item',
    '.value-row-block', '.value-text-wrap', '.value-img-card-wrap',
    '.shop-info-block', '.shop-stat-item', '.shop-spec-block',
    '.strip-item',
    '.party-slider-slide',

    /* ── Images specifically ── */
    '.program-card-img', '.vertical-card-img',
    '.blog-card-img',
    '.team-member-img',
    '.promo-img-card',
    '.about-intro-img-wrap', '.about-story-img-wrap',
    '.mission-photos-wrap', '.mission-photo-left', '.mission-photo-right',
    '.value-tilted-img-card',
    '.explore-basketball-graphic',

    /* ── Buttons / CTAs ── */
    '.btn-lime-rect', '.btn-about-explore', '.btn-swim',
    '.btn-proud-enrol', '.btn-load-more', '.btn-schedules',
    '.btn-all-testimonials', '.btn-blog-member', '.btn-blog-benefits',
    '.btn-join-member', '.btn-join-benefits',
    '.program-action-link', '.blog-read-more',
    '.join-btns-wrap', '.blog-join-btns', '.party-action-row', '.explore-action-row',
    '.contact-form', '.contact-form-wrapper',
    '.footer-newsletter-form',

    /* ── Misc blocks ── */
    '.promo-text-card',
    '.slide-content-wrap',
    '.hero-bottom-strip',
    '.facility-aerial-banner',
    '.shop-facility-stats',
    '.shop-specs-grid', '.shop-outdoor-grid',
    '.social-icons-row',
    '.clay-icon-wrap',
    '.contact-info-list',
    '.shop-contact-list',
    '.benefits-grid', '.blog-benefits-grid',
    '.swim-pill', '.swim-interactive-area',
    '.spec-content-left', '.spec-content-right',
    '.form-group',
    '.benefit-item-title', '.benefit-item-desc',
  ];

  /* LEFT slide-in */
  var LEFT = [
    '.spec-content-left', '.about-intro-content',
    '.proud-left-panel', '.promo-text-card',
    '.about-story-content', '.mission-headline-grid',
  ];

  /* RIGHT slide-in */
  var RIGHT = [
    '.spec-content-right', '.promo-img-card',
    '.proud-right-panel', '.explore-basketball-graphic',
  ];

  /* ZOOM + up (images / visual wrappers) */
  var ZOOM = [
    '.program-card-img > img', '.vertical-card-img > img',
    '.blog-card-img img', '.team-member-img img',
    '.about-intro-img-wrap img', '.about-story-img-wrap img',
    '.mission-photo-card img', '.value-tilted-img-card img',
    '.polaroid-img-wrap img', '.promo-img-card img',
  ];

  /* ------------------------------------------------------------------ */
  /* STAGGER PARENTS — children get auto-staggered delays               */
  /* ------------------------------------------------------------------ */
  var STAGGER_PARENTS = [
    '.programs-large-grid', '.programs-vertical-grid',
    '.blog-grid', '.team-grid', '.polaroids-grid',
    '.benefits-grid', '.blog-benefits-grid',
    '.mission-pillars-grid', '.mission-photos-wrap',
    '.explore-stats-row', '.explore-card-wrap',
    '.value-row-block', '.values-container',
    '.promo-grid', '.clay-grid',
    '.shop-fieldhouse-grid', '.shop-intro-grid',
    '.shop-party-grid', '.shop-outdoor-grid', '.shop-specs-grid',
    '.shop-info-grid', '.hero-bottom-strip',
    '.about-intro-grid', '.about-story-grid',
    '.contact-grid', '.contact-info-list',
    '.mission-headline-grid',
  ];

  /* ------------------------------------------------------------------ */
  /* HELPERS                                                             */
  /* ------------------------------------------------------------------ */
  function tag(el, cls) {
    if (el.dataset.saTagged) return;
    /* Skip preloader, header, navbar, footer elements */
    if (el.closest('#preloader, .header-area, .master-sports-footer')) return;
    el.classList.add(cls);
    el.dataset.saTagged = '1';
  }

  function staggerChildren(parent) {
    var kids = Array.prototype.slice.call(parent.children);
    kids.forEach(function (child, i) {
      if (i < 8) {
        child.style.transitionDelay = (i * 0.1 + 0.05) + 's';
        tag(child, 'sa');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* TAG ALL ELEMENTS                                                    */
  /* ------------------------------------------------------------------ */
  function tagAll() {
    UP.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { tag(el, 'sa'); });
    });
    LEFT.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { tag(el, 'sa-left'); });
    });
    RIGHT.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { tag(el, 'sa-right'); });
    });
    ZOOM.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { tag(el, 'sa-zoom'); });
    });
    STAGGER_PARENTS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (parent) {
        staggerChildren(parent);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* INTERSECTION OBSERVER                                               */
  /* ------------------------------------------------------------------ */
  function observe() {
    var targets = document.querySelectorAll('.sa, .sa-left, .sa-right, .sa-zoom');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* INIT                                                                */
  /* ------------------------------------------------------------------ */
  function init() {
    tagAll();
    observe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
