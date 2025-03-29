console.log("JavaScript works");

const youtube_links = [
    "https://www.youtube.com/watch?v=sZN5yJqDaYI&t=2s",
    "https://www.youtube.com/watch?v=rdV9VTV1Bk8",
    "https://www.youtube.com/watch?v=tvOkF8cEsdQ",
    "https://www.youtube.com/watch?v=M5IYugY8pjE",
    "https://www.youtube.com/watch?v=2Auy-0qEJ7A",
    "https://www.youtube.com/watch?v=WRRC-Iw_OPg",
];

const youtube_links_shorts = [
    "https://www.youtube.com/shorts/0xMXVeMQshE",
    "https://www.youtube.com/shorts/z1gRn-u-mU8",
    "https://www.youtube.com/shorts/CVrmL3wIyNk",
];

//See if video is currently is shorts mode/mobile mode
if(window.screen.width <= 400){
    console.log("Shorts mode");
    youtube_links = youtube_links_shorts;
}

//Clear localstorage with command
document.addEventListener('keydown', async function(evt){
    evt.stopImmediatePropagation()
    if(evt.code === "KeyC" && evt.ctrlKey){
        localStorage.clear();
        console.log("Clear localstorage");
    }
})

function getWatchedVideos() {
    let watchedVideos = localStorage.getItem("watchedVideos");
    return watchedVideos ? JSON.parse(watchedVideos) : [];
}

function saveClip(videoUrl) {
    let watchedVideos = getWatchedVideos();
    if (!watchedVideos.includes(videoUrl)) {
        watchedVideos.push(videoUrl);
        localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
    }
}

function getUnwatchedVideos() {
    let watchedVideos = getWatchedVideos();
    return youtube_links.filter(video => !watchedVideos.includes(video));
}

function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function getNextVideo() {
    let unwatchedVideos = getUnwatchedVideos();
    if (unwatchedVideos.length === 0) {
        console.log("All videos have been watched!");
        return null;
    }
    shuffleArray(unwatchedVideos);
    return unwatchedVideos[0]; 
}

//Youtube api functionality will be for the future me
if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
    console.error("YouTube API is not loaded correctly.");
} else {
    console.log("YouTube API is loaded successfully.");
}

//Get to next video when video is over
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log("Video has ended.");
        changeVideoSource();  
    }
}

function extractVideoId(url) {
    let match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
}

function changeVideoSource() {
    let nextVideo = getNextVideo();
    if (!nextVideo) {
        console.log("No more unwatched videos.");
        return;
    }

    let videoId = extractVideoId(nextVideo);
    if (!videoId) {
        console.error("Invalid YouTube URL:", nextVideo);
        return;
    }

    let videoFrame = document.getElementById("video");
    if (videoFrame) {
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        console.log("Video changed to:", nextVideo);
        saveClip(nextVideo); 
    } else {
        console.error("No <iframe> element with id='video' found!");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("video_button");
    if (button) {
        button.addEventListener("click", changeVideoSource);
        console.log("Button event listener added.");
    } else {
        console.error("Button with id='video_button' not found.");
    }

    changeVideoSource();
});
