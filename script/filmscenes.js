// 비디오 파일 경로 배열
const videos = [
    '../video/판타스틱미스터폭스.mov'
];

let currentIndex = Math.floor(Math.random() * videos.length); // 첫 랜덤 비디오 인덱스 설정

// 비디오 플레이어 설정 및 자동 재생
function loadVideo(index) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    videoSource.src = videos[index];
    videoPlayer.load(); // 새 비디오 로드
    videoPlayer.play(); // 자동 재생
}

// 이전 비디오 재생
function previousVideo() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length; // 인덱스 순환
    loadVideo(currentIndex);
}

// 다음 비디오 재생
function nextVideo() {
    currentIndex = (currentIndex + 1) % videos.length; // 인덱스 순환
    loadVideo(currentIndex);
}

// 현재 영상이 끝나면 자동으로 다음 영상 재생
document.getElementById('videoPlayer').addEventListener('ended', function() {
    nextVideo();
});

// 페이지 로드 시 랜덤 비디오 자동 재생
window.onload = function() {
    loadVideo(currentIndex);
};
