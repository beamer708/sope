/**
 * Sopes Auto Detailing — Cookie banner
 */

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');

  if (acceptBtn && banner) {
    if (localStorage.getItem('cookies-accepted')) {
      banner.classList.add('hidden');
    }
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      banner.classList.add('hidden');
    });
  }
});
