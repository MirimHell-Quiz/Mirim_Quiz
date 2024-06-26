const progressBarElem = document.querySelector('.progress-bar__bar');
const audio = document.getElementById('audio_play');
let isAudioPlayed = false;
let countdownTimeout;
let countdownInterval;

// 카운트다운 시작 함수
function startCountdown() {
    stopCountdown(); // 기존 카운트다운 정지
    let timeLeft = 9; // 9초
    progressBarElem.classList.add('active');

    countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            noClickButton();
        }
    }, 1000);

    countdownTimeout = setTimeout(noClickButton, 9000); // 9초 후에 noClickButton 함수 호출
}

// 카운트다운 정지 함수
function stopCountdown() {
    clearTimeout(countdownTimeout);
    clearInterval(countdownInterval);
    progressBarElem.classList.remove('active');
}

// 자동 시작 함수
function autoStart() {
    if (!isAudioPlayed) {
        audio.play();
        isAudioPlayed = true;
    }
    startCountdown();
}

// 카운트다운과 오디오 정지 함수
function stopCountdownAndAudio() {
    stopCountdown();
    audio.pause();
    audio.currentTime = 0;
}

// 카운트다운과 오디오 재설정 함수
function resetCountdownAndAudio() {
    stopCountdownAndAudio();
    audio.play();
    setTimeout(autoStart, 10); // 10ms 후에 다시 시작하도록 설정
}

// .container div를 표시하는 함수
function showContainerDiv() {
    const containerDiv = document.querySelector('.container');
    containerDiv.style.display = 'block';
}

// 경고 창의 표시 여부를 감지하여 오디오를 제어하는 함수
function observeWarningWindow() {
    const warningWindow = document.querySelector('.warning-window-div-1');

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.attributeName === 'style') {
                const isDisplayed = window.getComputedStyle(warningWindow).display !== 'none';
                if (isDisplayed) {
                    stopCountdownAndAudio();
                } else {
                    resetCountdownAndAudio();
                }
            }
        }
    });

    observer.observe(warningWindow, { attributes: true });
}

document.addEventListener('DOMContentLoaded', () => {
    autoStart();
    observeWarningWindow();
});
