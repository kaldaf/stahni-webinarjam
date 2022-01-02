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

    chrome.runtime.onMessage.addListener((message) => {
        if (message === "webinar-run") {
            newTabVideo();
        }
    });
})();