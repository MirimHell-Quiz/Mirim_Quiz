let id = 1;
let isButtonClicked = false;

function loadQuiz(id) {
    isButtonClicked = false;

    fetch('load_question.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}`
    })
    .then(response => response.json())
    .then(quiz => {
        if (quiz) {
            const problemText = document.querySelector('.problem_text');
            problemText.textContent = quiz.Question;

            document.querySelector('.button1').textContent = quiz.Answer1;
            document.querySelector('.button2').textContent = quiz.Answer2;
            document.querySelector('.button3').textContent = quiz.Answer3;
            document.querySelector('.button4').textContent = quiz.Answer4;

            document.querySelector('.button1').onclick = () => submitAnswer(1, quiz);
            document.querySelector('.button2').onclick = () => submitAnswer(2, quiz);
            document.querySelector('.button3').onclick = () => submitAnswer(3, quiz);
            document.querySelector('.button4').onclick = () => submitAnswer(4, quiz);

            startQuizCountdown();
        } else {
            console.error('Quiz not found for ID:', id);
        }
    })
    .catch(error => console.error('Error loading quiz:', error));
}

function submitAnswer(answerId, quiz) {
    isButtonClicked = true;
    showWarningWindow(quiz[`NoAnswer${answerId}`], `Lorem ipsum dolor sit amet consectetur. Adipiscing quis sollicitudin aenean phasellus.`);
    stopCountdown();
    setTimeout(() => {
        document.querySelector('.warning-window-div-1').style.display = 'none';
        document.querySelector('.container').style.filter = 'none';
        handleButtonClick();
    }, 2000);
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

function noClickButton() {
    if (!isButtonClicked) {
        const warningMessage1 = `아... {닉네임}님은.. 아무것도 고르지 못하셨군요.
        모든 답항이 필요도 없다.. 고를 가치도 없는 것들이다..
        이런 말씀이시군요 잘 알겠습니다..`;
        const warningMessage2 = `※ 시간안에 아무것도 고르지 않으셨으므로 미리 공지한 벌칙이 실시 될 예정입니다 참고해 주세요 ※`;
        
        showWarningWindow(warningMessage1, warningMessage2);
        stopCountdown();
    }
}

document.addEventListener('keydown', function(event) {
    let eventDiv = document.querySelector('.warning-window-div-1');
    if (event.key === 'Enter' && eventDiv.style.display === 'block') {
        eventDiv.style.display = 'none';
        document.querySelector('.container').style.filter = 'none';
        event.preventDefault();
        handleButtonClick();
    }
});

loadQuiz(id); // 초기 로드