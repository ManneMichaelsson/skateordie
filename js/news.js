
const video = document.getElementById('collection-video');
const startTime = 0; // start i sekunder
const endTime = 7;   // slut i sekunder

// När musen hovrar
video.parentElement.addEventListener('mouseenter', () => {
    video.currentTime = startTime;
    video.play();
});

// När musen lämnar
video.parentElement.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = startTime;
});

// Loop mellan start och end
video.addEventListener('timeupdate', () => {
    if (video.currentTime >= endTime) {
        video.currentTime = startTime;
    }
});

