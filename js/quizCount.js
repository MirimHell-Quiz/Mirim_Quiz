let currentQuestionIndex = 0;
let userId = "null";
let isButtonClicked = false;
let userAnswers = {};
let nullUserData = {};

// URL에서 학생 키를 가져오는 함수
function getStudentKey() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const studentKey = getStudentKey();
if (studentKey) {
    userId = studentKey;
}

window.onload = function() {
    loadQuestion();
    fetchNullUserData();
};

// null값을 가진 유저 데이터를 불러오는 함수
function fetchNullUserData() {
    fetch('http://localhost/MIRIM_QUIZ/php/find_nulluser.php')
        .then(response => response.json())
        .then(list => {
            if (list.status == "success") {
                nullUserData = list.data;
                console.log(nullUserData); // 이 부분에 nullUserData를 출력하여 확인
                // 여기서 nullUserData를 사용하는 함수를 호출할 수 있음
            } else {
                console.error("Error fetching null user data:", list.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

// 문제를 불러오는 함수
function loadQuestion() {
    let currentQuestion = Quiz_date[currentQuestionIndex];
    document.getElementById("question").innerHTML = currentQuestion.Question;
    document.querySelector("#button-group1 .button1").innerHTML = currentQuestion.Answer1;
    document.querySelector("#button-group2 .button2").innerHTML = currentQuestion.Answer2;
    document.querySelector("#button-group1 .button3").innerHTML = currentQuestion.Answer3;
    document.querySelector("#button-group2 .button4").innerHTML = currentQuestion.Answer4;

    startCountdown(); // 문제를 로드할 때 카운트다운 시작
}

// 답변 제출 함수
function submitAnswer(answerIndex) {
    isButtonClicked = true;
    let currentQuestion = Quiz_date[currentQuestionIndex];
    let correctAnswer = currentQuestion[`NoAnswer${answerIndex}`]; // AnswerIndex 수정

    showWarningWindow("아... "+userId+"님은 "+correctAnswer, "대답 못하신 분: " + (nullUserData[`Question${currentQuestionIndex + 1}`] || []).join(", "));
    stopCountdown();

    userAnswers[`Question${currentQuestionIndex + 1}`] = answerIndex;
    console.log("User answers after submitting:", userAnswers);

    setTimeout(() => {
        hideWarningWindow();
        nextQuestion();
        isButtonClicked = false; // 다음 문제로 넘어갈 때 초기화
    }, 4000);
}

// 다음 문제로 넘어가는 함수
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Quiz_date.length) {
        loadQuestion();
    } else {
        showWarningWindow("모든 문제를 푸셨습니다!");
        sendAnswersToServer();

        setTimeout(() => {
            window.location.href = `http://localhost/MIRIM_QUIZ/html/Result.html?id=${userId}`;
        }, 4000);
    }
}

// 답변을 서버로 보내는 함수
function sendAnswersToServer() {
    const data = {
        userId: userId,
        answers: Object.values(userAnswers) // object로 안하면 에러...
    };

    console.log("Sending data to server:", data);
    
    fetch('http://localhost/MIRIM_QUIZ/php/save_answer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        if (data.status === "error") {
            console.error("Error from server:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// 경고창을 표시하는 함수
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

    if (text2 !== undefined) {
        warningText2.innerHTML = text2.replace(/\n/g, '<br>');
    } else {
        warningText2.innerHTML = "";
    }

    warningWindow.style.display = 'block';
    container.style.filter = 'blur(20px)';
}

// 경고창을 숨기는 함수
function hideWarningWindow() {
    document.querySelector('.warning-window-div-1').style.display = 'none';
    document.querySelector('.container').style.filter = 'none';
    autoStart(); // 카운트다운 자동 시작
}

// 아무 버튼도 클릭하지 않았을 때 호출되는 함수
function noClickButton() {
    console.log("Entered noClickButton");

    if (!isButtonClicked) { // 클릭하지 않았을 때만 실행되도록 수정
        const warningMessage1 = `아무것도 고르지 못하셨군요.
        모든 답항이 필요도 없다.. 고를 가치도 없는 것들이다..
        이런 말씀이시군요 잘 알겠습니다..`;
        const warningMessage2 = `※ 시간안에 아무것도 고르지 않으셨으므로 미리 공지한 벌칙이 실시 될 예정입니다 참고해 주세요 ※`;

        showWarningWindow(warningMessage1, warningMessage2);
        stopCountdown();

        userAnswers[`Question${currentQuestionIndex + 1}`] = null;

        setTimeout(() => {
            hideWarningWindow();
            nextQuestion();
        }, 4000);
    }
}

// 버튼 이벤트 리스너 등록
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
