document.querySelector('button').addEventListener('click', () => {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'webinar-run');
    })
    chrome.tabs.executeScript({
        file: "main.js"
    });
});