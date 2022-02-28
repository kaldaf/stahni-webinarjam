document.addEventListener('DOMContentLoaded', (e) => {
    const button = document.querySelector('--btn-download-webinarjam');
    setupButton(button);

})

const setupButton = (element) => {
    document.querySelector('button').addEventListener('click', () => {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, 'is-end');
        })
        chrome.tabs.executeScript({
            file: "main.js"
        });
    });
}