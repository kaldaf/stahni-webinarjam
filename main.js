(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function newTabVideo() {
        const video = document.getElementById("vjs_video_3_html5_api");
        const el = document.createElement('textarea');

        const src = video.src;

        el.value = src;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        window.open(src, "_blank");
    }

    function isEnd() {
        const isEnd = window.location.pathname.includes('replay')
        if (isEnd) {
            newTabVideo();
            createPopUpMessage('Úspěšně uloženo do clipboardu.', 5500)
        } else {
            createPopUpMessage('Video není připraveno.', 3500)
        }
    }

    function createPopUpMessage(messsage, delay) {
        const popUp = document.createElement('div');
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

    chrome.runtime.onMessage.addListener((message) => {
        if (message === "is-end") {
            isEnd();
        } else {
            createPopUpMessage('Nastala chyba.', 3500)
        }
    });
})();