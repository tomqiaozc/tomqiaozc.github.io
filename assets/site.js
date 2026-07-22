const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');

if (navLinks) {
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  const languageLink = document.createElement('a');
  languageLink.className = 'language-switch';
  languageLink.href = `${isEnglish ? '../' : 'en/'}${currentFile}${location.hash}`;
  languageLink.hreflang = isEnglish ? 'zh-CN' : 'en';
  languageLink.lang = isEnglish ? 'zh-CN' : 'en';
  languageLink.textContent = isEnglish ? '中文' : 'English';
  languageLink.setAttribute(
    'aria-label',
    isEnglish ? '切换到中文版' : 'Switch to English',
  );
  navLinks.append(languageLink);
}

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute(
    'aria-label',
    open ? (isEnglish ? 'Close navigation' : '关闭导航') : (isEnglish ? 'Open navigation' : '打开导航'),
  );
  menuButton.textContent = open ? '×' : '☰';
});

const currentPage = location.pathname.split('/').pop() || 'index.html';
const projectPages = new Set(['societas.html', 'copilot-epichan.html', 'office-plus.html']);
const activePage = projectPages.has(currentPage) ? 'projects.html' : currentPage;
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === activePage) link.setAttribute('aria-current', 'page');
});

navLinks?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', isEnglish ? 'Open navigation' : '打开导航');
  if (menuButton) menuButton.textContent = '☰';
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !navLinks?.classList.contains('open')) return;
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', isEnglish ? 'Open navigation' : '打开导航');
  if (menuButton) {
    menuButton.textContent = '☰';
    menuButton.focus();
  }
});

const tocLinks = [...document.querySelectorAll('[data-toc] a[href^="#"]')];
const observedSections = tocLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    tocLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.toggleAttribute('aria-current', active);
    });
  }, { rootMargin: '-18% 0px -68% 0px' });
  observedSections.forEach((section) => sectionObserver.observe(section));
}
