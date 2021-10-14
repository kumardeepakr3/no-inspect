function initBackground() {
  loadContentScriptInAllTabs();

  chrome.browserAction.onClicked.addListener(
    function (tab) {
      chrome.tabs.sendRequest(
        tab.id,
        { 'elementSelection': true });
    });
}

initBackground();
