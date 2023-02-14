document.addEventListener('DOMContentLoaded', async () => {
    const tab = await getCurrentTab()
    const button = document.querySelector('.--btn-download-webinarjam');
    if (!tab) {
        button.disabled = true;
        button.innerText = "Nelze stáhnout"
    }
    button.addEventListener('click', () => {
        if (tab) executeScript(tab.id);
    });
})

function newTabVideo() {
    const createPopUpMessage = (messsage, delay) => {
        const isPopup = document.querySelector(".--webinarjam-popup-extension");

        if (!isPopup) {
            const popUp = document.createElement('div');
            popUp.classList.add("--webinarjam-popup-extension")
            popUp.innerHTML = messsage;

            popUp.style.background = "#00fffb";
            popUp.style.position = "fixed";
            popUp.style.bottom = "-5rem";
            popUp.style.left = "50%";
            popUp.style.transform = "translateX(-50%)";
            popUp.style.color = "#000";
            popUp.style.padding = "1rem";
            popUp.style.border = "3px solid #000";
            popUp.style.fontWeight = "bold";
            popUp.style.fontSize = "16px";
            popUp.style.transition = "all 0.2s ease-in-out";
            popUp.style.zIndex = "11111111";

            document.body.append(popUp);

            setTimeout(() => {
                popUp.style.bottom = "2rem";
            }, 100);


            setTimeout(() => {
                popUp.style.bottom = "-5rem";
            }, delay);

            setTimeout(() => {
                popUp.remove();
            }, (delay + 200));
        }
        return isPopup;
    }

    const isEnd = window.location.pathname.includes('replay')
    if (isEnd) {


        const popUp = createPopUpMessage('Odkaz byl uložen v clipboardu.', 3500)
        if (!popUp) {
            setTimeout(() => {
                const video = document.getElementById("vjs_video_3_html5_api");
                const el = document.createElement('textarea');

                const src = video.src;

                el.value = src;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                window.open(src, "_blank");
            }, 1000)
        }
    } else {
        createPopUpMessage('Video není připraveno.', 3500)
    }
}

function checkDownload() {

}

const executeScript = (tabId) => {
    chrome.scripting.executeScript({
        target: {
            tabId: tabId,
            allFrames: false
        },
        func: newTabVideo
    }).then(() => console.log("Script injected")).catch((e) => console.warn(e));
}

async function getCurrentTab() {
    let queryOptions = {
        active: true,
        url: "https://event.webinarjam.com/*"
    };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}