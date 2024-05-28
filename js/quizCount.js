// quizCount.js 파일
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = parseInt(urlParams.get('id'));

let isButtonClicked = false;

function loadQuiz(id) {
    isButtonClicked = false;
    const quiz = Quiz_date.find(quiz => quiz.id === id);

    if (quiz) {
        const problemText = document.querySelector('.problem_text');
        problemText.textContent = quiz.problem;

        const buttons = [];

        for (let i = 1; i <= 4; i++) {
            buttons.push(document.querySelector(`.button${i}`));
            buttons[i - 1].textContent = quiz[`choice${i}`];
        }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                console.log(`Clicked button ${i + 1}. Value:`, quiz[`choice${i + 1}`]);
                clickButton();
            });
        }

        startQuizCountdown();
    } else {
        console.error('Quiz not found for ID:', id);
    }
}

function handleButtonClick() {
    id++;
    loadQuiz(id);
}

function showWarningWindow(text) {
    const warningWindow = document.querySelector('.warning-window-div-1');
    const warningText = document.querySelector('.warning-window-div-2 p');
    const container = document.querySelector('.container');

    warningText.textContent = text;
    warningWindow.style.display = 'block';
    container.style.filter = 'blur(4px)';
}

function clickButton() {
    isButtonClicked = true;
    showWarningWindow('1');
    stopCountdown(); // countdown.js에 있는 stopCountdown 함수 호출
}

function noClickButton() {
    if (!isButtonClicked) {
        showWarningWindow('2');
        stopCountdown();
    }
}

document.addEventListener('keydown', function(event) {
    let eventDiv = document.querySelector('.warning-window-div-1');
    if (event.key === 'Enter') {
        if (eventDiv.style.display == 'block') {
            eventDiv.style.display = 'none';
            document.querySelector('.container').style.filter = 'none';
            event.preventDefault();
            handleButtonClick();
        }
    }
});

loadQuiz(id); // 초기 로드
