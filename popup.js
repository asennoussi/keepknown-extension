document.addEventListener('DOMContentLoaded', () => {
  const dashboardBtn = document.getElementById('dashboard-btn');
  const blockedLink = document.getElementById('blocked-link');

  dashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://keepknown.com/dashboard' });
  });

  blockedLink.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://mail.google.com/mail/u/0/#label/KeepKnown' });
  });
});
