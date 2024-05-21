const progressBarElem = document.querySelector('.progress-bar__bar');
const audio = document.getElementById('audio_play');
let isAudioPlayed = false;
let countdownTimeout;

function autoStart() {
    progressBarElem.classList.add('active');
    if (!isAudioPlayed) {
        audio.play();
        isAudioPlayed = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(autoStart, 1000);

    // 엔터 키 이벤트 감지
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            resetCountdownAndAudio();
        }
    });

    // 버튼 클릭 이벤트 감지
    const buttons = document.querySelectorAll('.container-button button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            stopCountdownAndAudio();
        });
    });
});

function stopCountdownAndAudio() {
    // 프로그래스 바와 타이머 초기화
    progressBarElem.classList.remove('active');
    clearTimeout(countdownTimeout);

    // 오디오 정지
    audio.pause();
    audio.currentTime = 0;
}

function resetCountdownAndAudio() {
    // 프로그래스 바와 타이머 초기화
    progressBarElem.classList.remove('active');
    clearTimeout(countdownTimeout);

    // 오디오 정지 및 초기화
    audio.pause();
    audio.currentTime = 0;

    // 오디오 다시 시작
    audio.play();

    // 재시작
    setTimeout(autoStart, 10); // 10ms 후에 다시 시작하도록 설정
}
