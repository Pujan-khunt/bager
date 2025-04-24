chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Sender:", sender);

  if (request.type === "GET_BOOKMARK_TREE") {

    chrome.bookmarks.getTree((bookmarkTree) => {
      sendResponse({ bookmarks: bookmarkTree });
    });

    // Used when the sendResponse() function is called asynchronously
    // Since here its being passed to a async function we will return true.
    // Which will tell the Chrome to not garbage collect this callback function 
    // So it will not fail to send this message to the sender.
    return true;
  }
  else if (request.type === 'CREATE_TAB') {
    chrome.tabs.create({
      url: request.url
    })
  }
});
