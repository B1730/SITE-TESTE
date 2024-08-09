document.addEventListener("DOMContentLoaded", loadVideos);

function loadVideos() {
    const playlist_area = document.querySelector(".playlist");

    if (!playlist_area) {
        console.error("Elemento .playlist não encontrado");
        return;
    }

    videos.forEach((video, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <div class="playlist-videos ${index === 0 ? "active" : ""}">
            <video src="${video.src}" muted></video>
            <label class="playlist-video-info">${video.title}</label>
        </div>
        `;

        playlist_area.appendChild(div);
    });
    addOnclick();
}

function addOnclick() {
    const video_main = document.querySelector(".main-video-content");
    const playlist_videos = document.querySelectorAll(".playlist-videos");

    if (!video_main || video_main.children.length < 2) {
        console.error("Estrutura esperada de .main-video-content não encontrada");
        return;
    }

    if (playlist_videos.length === 0) {
        console.error("Nenhum elemento .playlist-videos encontrado");
        return;
    }

    playlist_videos.forEach((item, i) => {
        if (i === 0) {
            setVideo(video_main, item);
        }
        item.onclick = () => {
            playlist_videos.forEach((video) => video.classList.remove("active"));
            item.classList.add("active");

            setVideo(video_main, item);
        };
    });
}

function setVideo(video_main, item) {
    video_main.children[0].src = item.children[0].getAttribute("src");
    video_main.children[1].innerHTML = item.children[1].innerHTML;
}
