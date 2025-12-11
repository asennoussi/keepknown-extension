// Create context menu on extension install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'keepknown-allow-sender',
    title: 'KeepKnown: Allow this sender',
    contexts: ['selection']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'keepknown-allow-sender') {
    const selectedText = info.selectionText?.trim();

    if (selectedText && isValidEmail(selectedText)) {
      addToAllowlist(selectedText);
    } else {
      showNotification('Invalid Email', 'Please select a valid email address.');
    }
  }
});

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add email to allowlist in local storage
async function addToAllowlist(email) {
  try {
    const result = await chrome.storage.local.get(['allowlist']);
    const allowlist = result.allowlist || [];

    // Check if email already exists
    if (allowlist.includes(email.toLowerCase())) {
      showNotification('Already Added', 'This sender is already on your Allowlist.');
      return;
    }

    // Add email to allowlist
    allowlist.push(email.toLowerCase());
    await chrome.storage.local.set({ allowlist });

    showNotification('Sender Added', 'Sender added to Allowlist.');

    // TODO: Hook up API endpoint here
    // await syncWithAPI(email);

  } catch (error) {
    console.error('Error adding to allowlist:', error);
    showNotification('Error', 'Failed to add sender to Allowlist.');
  }
}

// Show browser notification
function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: title,
    message: message
  });
}

// Placeholder for future API integration
// async function syncWithAPI(email) {
//   const response = await fetch('https://keepknown.com/api/allowlist', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email })
//   });
//   return response.json();
// }
