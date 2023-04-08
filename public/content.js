window.chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message) {
  if (message.for === "CONTENT") {
    let paragraphs = document.getElementsByTagName("p");
    for (const paragraph of paragraphs) {
      paragraph.innerHTML = `${message.body} The extension did this.`;
    }
  }
}
