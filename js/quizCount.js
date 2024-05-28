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

function showWarningWindow(text1, text2) {
    const warningWindow = document.querySelector('.warning-window-div-1');
    const warningText1 = document.querySelector('.warning-text-1');
    const warningText2 = document.querySelector('.warning-text-2');
    const container = document.querySelector('.container');
    
    warningText1.innerHTML = text1.replace(/\n/g, '<br>');
    warningText2.textContent = text2;
    warningWindow.style.display = 'block';
    container.style.filter = 'blur(20px)';
}

function clickButton() {
    isButtonClicked = true;
    const warningMessage1 = `아..{닉네임} 님은.. 000을 고르셨군요...
    000은 어디에서 매우 중요한 역할을 하고 있는데 말이죠..
    000은 필요도 없다.. 이런 말씀이시군요 잘 알겠습니다..`;
    const warningMessage2 = `Lorem ipsum dolor sit amet consectetur. Adipiscing quis sollicitudin aenean phasellus.`;
    
    let noAnswer = document.querySelector('.no-answer');
    noAnswer.style.display = 'block';
    showWarningWindow(warningMessage1, warningMessage2);
    stopCountdown(); // countdown.js에 있는 stopCountdown 함수 호출
}

function noClickButton() {
    if (!isButtonClicked) {
        const warningMessage1 = `아... {닉네임}님은.. 아무것도 고르지 못하셨군요.
        모든 답항이 필요도 없다..  고를 가치도 없는 것들이다..
        이런 말씀이시군요 잘 알겠습니다..`;
        const warningMessage2 = `※ 시간안에 아무것도 고르지 않으셨으므로 미리 공지한 벌칙이 실시 될 예정입니다 참고해 주세요 ※`;
        
        showWarningWindow(warningMessage1, warningMessage2);
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
