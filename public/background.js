// chrome.action.onClicked.addListener(buttonClicked);
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request) {
  const { message, tab } = request;

  if (message.for === "BACKGROUND") {
    const _message = {
      for: "CONTENT",
      body: message.body,
    };
    chrome.tabs.sendMessage(tab.id, _message);
  }
}
