import io from 'socket.io-client'

function reloadExtension() {
  // TODO replace this with chrome.runtime.reload() when
  // this bug will be fixed https://bugs.chromium.org/p/chromium/issues/detail?id=733209
  chrome.tabs.query({ url: 'chrome://extensions/' }, ([ extensionTab ]) => {
    if (!extensionTab) {
      chrome.tabs.create({ url: 'chrome://extensions/', active: false }, (extensionTab) => {
        chrome.tabs.reload(extensionTab.id)
      })
    } else {
      chrome.tabs.reload(extensionTab.id)
    }
  })
}

// setTimeout(reloadExtension, 15000)

const WEBSOCKET_PORT = 8080
const socket = io(`http://localhost:${WEBSOCKET_PORT}`)
socket.on('file changed', reloadExtension)
