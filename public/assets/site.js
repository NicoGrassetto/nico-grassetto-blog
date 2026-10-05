const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navigationLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const detailDialog = document.querySelector('.detail-dialog');
const dialogBody = document.querySelector('.dialog-body');
const contactForm = document.querySelector('.contact-form');
const contactEmail = String(window.siteConfig?.contactEmail || '').trim();
let detailTrigger;
let returnSection = '#home';

if (window.lucide) {
  window.lucide.createIcons();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuToggle.title = isOpen ? 'Close menu' : 'Open menu';
  document.body.classList.toggle('menu-open', isOpen);
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  menuToggle.title = 'Open menu';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && detailDialog.open) {
    event.preventDefault();
    detailDialog.close();
    return;
  }
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    menuToggle.click();
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 701px)').addEventListener('change', (event) => {
  if (event.matches && document.body.classList.contains('menu-open')) {
    menuToggle.click();
  }
});

function updateNavigation() {
  const position = window.scrollY + document.querySelector('.site-header').offsetHeight + 100;
  let current = navigationLinks[0];
  for (const link of navigationLinks) {
    const section = document.querySelector(link.hash);
    if (section.offsetTop <= position) current = link;
  }
  for (const link of navigationLinks) {
    if (link === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

function openDetailFromHash() {
  const template = document.getElementById(window.location.hash.slice(1));
  if (template instanceof HTMLAnchorElement && template.classList.contains('project-card')) {
    window.location.replace(template.href);
    return;
  }
  if (!(template instanceof HTMLTemplateElement)) {
    if (detailDialog.open) detailDialog.close();
    return;
  }
  if (detailDialog.open && detailDialog.dataset.detail === template.id) return;
  returnSection = template.id.startsWith('case-') ? '#case-studies' : '#home';
  dialogBody.replaceChildren(template.content.cloneNode(true));
  dialogBody.querySelector('.detail-title').id = 'detail-title';
  detailDialog.dataset.detail = template.id;
  if (window.lucide) window.lucide.createIcons();
  if (!detailDialog.open) detailDialog.showModal();
  detailDialog.scrollTop = 0;
  document.body.classList.add('dialog-open');
}

document.addEventListener('click', (event) => {
  const detailLink = event.target.closest('a[data-detail]');
  if (detailLink && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    detailTrigger = detailLink;
    history.pushState(null, '', detailLink.hash);
    openDetailFromHash();
  }

  const interestLink = event.target.closest('[data-interest]');
  if (interestLink) {
    document.getElementById('contact-interest').value = interestLink.dataset.interest;
  }

  if (document.body.classList.contains('menu-open') && !event.target.closest('.site-header')) {
    menuToggle.click();
  }
});

detailDialog.querySelector('[data-close]').addEventListener('click', () => detailDialog.close());

detailDialog.addEventListener('click', (event) => {
  if (event.target !== detailDialog) return;
  const bounds = detailDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
    detailDialog.close();
  }
});

detailDialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (window.location.hash === `#${detailDialog.dataset.detail}`) {
    history.replaceState(null, '', returnSection);
    detailTrigger?.focus({ preventScroll: true });
  }
});

window.addEventListener('hashchange', openDetailFromHash);
openDetailFromHash();

if (contactEmail) {
  const directLink = document.querySelector('.contact-direct');
  directLink.href = `mailto:${encodeURIComponent(contactEmail)}`;
  directLink.hidden = false;
  directLink.querySelector('span').textContent = contactEmail;
  document.getElementById('contact-submit-label').textContent = 'Open email draft';
  document.getElementById('contact-availability').textContent = 'A thoughtful message is always welcome.';
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const interest = document.getElementById('contact-interest').selectedOptions[0].textContent;
  const message = `Hi Nico,\n\n${formData.get('message').trim()}\n\n${formData.get('name').trim()}\n${formData.get('email').trim()}\n\nInterested in: ${interest}`;
  const formStatus = contactForm.querySelector('.form-status');
  contactForm.querySelector('.message-fallback').hidden = true;

  if (contactEmail) {
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(`Let's talk: ${interest}`)}&body=${encodeURIComponent(message)}`;
    formStatus.textContent = 'Email draft requested. Your message has not been sent automatically.';
    return;
  }

  try {
    await navigator.clipboard.writeText(message);
    formStatus.textContent = 'Message copied. Direct email details are coming soon.';
  } catch {
    const preparedMessage = document.getElementById('prepared-message');
    preparedMessage.value = message;
    contactForm.querySelector('.message-fallback').hidden = false;
    preparedMessage.focus();
    preparedMessage.select();
    formStatus.textContent = 'Message prepared below. Direct email details are coming soon.';
  }
});