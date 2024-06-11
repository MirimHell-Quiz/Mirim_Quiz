let currentQuestionIndex = 0;
let userId = "sssa"; // 사용자 ID
let isButtonClicked = false;
let userAnswers = {}; // 사용자의 답변을 저장할 객체

function loadQuestion() {
    let currentQuestion = Quiz_date[currentQuestionIndex];
    document.getElementById("question").innerHTML = currentQuestion.Question;
    document.querySelector("#button-group1 .button1").innerHTML = currentQuestion.Answer1;
    document.querySelector("#button-group2 .button2").innerHTML = currentQuestion.Answer2;
    document.querySelector("#button-group1 .button3").innerHTML = currentQuestion.Answer3;
    document.querySelector("#button-group2 .button4").innerHTML = currentQuestion.Answer4;
}

function submitAnswer(answerIndex) {
    isButtonClicked = true;
    let currentQuestion = Quiz_date[currentQuestionIndex];
    console.log('현재 질문 :', currentQuestion);
    console.log('답변 Index:', answerIndex);

    let correctAnswer = currentQuestion[`NoAnswer${answerIndex}`];

    console.log('Correct Answer:', correctAnswer);

    showWarningWindow(correctAnswer, "Lorem ipsum dolor sit amet consectetur. Adipiscing quis sollicitudin aenean phasellus.");
    stopCountdown();

    // 답변 저장
    userAnswers[`Question${currentQuestionIndex + 1}`] = answerIndex;

    setTimeout(() => {
        hideWarningWindow();
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Quiz_date.length) {
        loadQuestion();
    } else {
        showWarningWindow("모든 문제를 푸셨습니다!", "");
        sendAnswersToServer(); // 모든 질문을 푼 후 서버로 답변 전송
    }
}

function sendAnswersToServer() {
    const data = {
        userId: userId,
        answers: userAnswers
    };

    fetch('http://localhost/mirim/php/save_answer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
        showWarningWindow("서버 오류", "답변을 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    });
}

function showWarningWindow(text1, text2) {
    const warningWindow = document.querySelector('.warning-window-div-1');
    const warningText1 = document.querySelector('.warning-text-1');
    const warningText2 = document.querySelector('.warning-text-2');
    const container = document.querySelector('.container');

    if (text1 !== undefined) {
        warningText1.innerHTML = text1.replace(/\n/g, '<br>');
    } else {
        warningText1.innerHTML = "알 수 없는 오류가 발생했습니다.";
    }
    warningText2.textContent = text2;
    warningWindow.style.display = 'block';
    container.style.filter = 'blur(20px)';
}

function hideWarningWindow() {
    document.querySelector('.warning-window-div-1').style.display = 'none';
    document.querySelector('.container').style.filter = 'none';
}

function noClickButton() {
    if (!isButtonClicked) {
        const warningMessage1 = `아... ` + userId + `님은.. 아무것도 고르지 못하셨군요.
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
        hideWarningWindow();
        event.preventDefault();
        nextQuestion();
    }
});

document.querySelector("#button-group1 .button1").addEventListener("click", function() {
    submitAnswer(1);
});
document.querySelector("#button-group2 .button2").addEventListener("click", function() {
    submitAnswer(2);
});
document.querySelector("#button-group1 .button3").addEventListener("click", function() {
    submitAnswer(3);
});
document.querySelector("#button-group2 .button4").addEventListener("click", function() {
    submitAnswer(4);
});

loadQuestion(); // 초기 문제 로드
