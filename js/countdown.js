const progressBarElem = document.querySelector('.progress-bar__bar');
const audio = document.getElementById('audio_play');
let isAudioPlayed = false;
let countdownTimeout;

// 카운트다운 시작 함수
function startCountdown() {
    countdownTimeout = setTimeout(noClickButton, 9000); // 9초 후에 noClickButton 함수 호출
}

// 카운트다운 정지 함수
function stopCountdown() {
    clearTimeout(countdownTimeout);
}

// 자동 시작 함수
function autoStart() {
    progressBarElem.classList.add('active');
    if (!isAudioPlayed) {
        audio.play();
        isAudioPlayed = true;
    }
    startCountdown();
}

// 카운트다운과 오디오 정지 함수
function stopCountdownAndAudio() {
    progressBarElem.classList.remove('active');
    clearTimeout(countdownTimeout);

    audio.pause();
    audio.currentTime = 0;
}

// 카운트다운과 오디오 재설정 함수
function resetCountdownAndAudio() {
    progressBarElem.classList.remove('active');
    clearTimeout(countdownTimeout);

    audio.pause();
    audio.currentTime = 0;

    audio.play();

    setTimeout(autoStart, 10); // 10ms 후에 다시 시작하도록 설정
}

// .container div를 표시하는 함수
function showContainerDiv() {
    const containerDiv = document.querySelector('.container');
    containerDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(autoStart, 0);

    const buttons = document.querySelectorAll('.container-button button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            stopCountdownAndAudio();
            showContainerDiv();
        });
    });

    // .warning-window-div-1 클릭 이벤트 추가
    document.querySelector('.warning-window-div-1').addEventListener('click', (event) => {
        resetCountdownAndAudio();
    });
});
