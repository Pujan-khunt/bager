const isExtension = typeof chrome !== "undefined" && chrome.runtime?.id;

export function sendMessage(message) {
  if (isExtension) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, resolve);
    });
  } else {
    return Promise.resolve({ success: true, mock: true })
  }
}
