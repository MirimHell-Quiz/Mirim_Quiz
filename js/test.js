const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = parseInt(urlParams.get('id')); // Convert ID to integer

//id 를 기준으로 퀴즈를 차례대로 불러옴
function loadQuiz(id) {
    buttonClicked = false;
    const quiz = Quiz_date.find(quiz => quiz.id === id);
    //Quiz_date배열에서 있는 id가 지금 받은 아이디와 일치하냐 체크


    //맞다면
    if (quiz) {
        const problemText = document.querySelector('.problem_text');
        problemText.textContent = quiz.problem;

        const buttons = [];

        for (let i = 1; i <= 4; i++) {
            // Push each button element into the buttons array
            buttons.push(document.querySelector(`.button${i}`));
            buttons[i - 1].textContent = quiz[`choice${i}`]; // Adjust index to start from 0
            buttonClicked = true;
        }

        // Add event listeners to the buttons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                console.log(`Clicked button ${i + 1}. Value:`, quiz[`choice${i + 1}`]);
            });
        }
    } else {
        console.error('Quiz not found for ID:', id);
    }
    setTimeout(checkTimeout, 8000);
}

loadQuiz(id); // Initial load with the received ID

// Function to handle button clicks
function handleButtonClick() {
    id++; // Increment ID
    loadQuiz(id); // Load quiz with new ID
}

// Add event listener to all buttons to handle click event
for (let i = 0; i < 4; i++) {
    document.querySelector(`.button${i + 1}`).addEventListener('click', handleButtonClick2);
}


// 버튼 클릭 시간을 기록할 변수
let isButtonClicked = false;

// 버튼 클릭 이벤트 처리 함수
function handleButtonClick2() {
    // 버튼이 클릭되었음을 표시
    isButtonClicked = true;
    // showWarningWindow 함수를 호출하여 경고 창을 보여줌
    showWarningWindow();
}

// 시간 초과를 감지하고 경고 창을 보여주는 함수
function checkTimeout() {
    // 버튼이 클릭되지 않았을 때 경고 창에 '2' 텍스트를 표시
    if (!isButtonClicked) {
        const warningText = document.querySelector('.warning-window-div-2 p');
        warningText.textContent = 'sdfsdf';
        showWarningWindow();
    }
}

// 버튼 클릭 시 '1' 텍스트를 경고 창에 표시하는 함수
function showWarningWindow() {
    const warningWindow = document.querySelector('.warning-window-div-1');
    const container = document.querySelector('.container');

    warningWindow.style.display = 'block';
    container.style.filter = 'blur(4px)';

    if (isButtonClicked) {
        const warningText = document.querySelector('.warning-window-div-2 p');
        warningText.textContent = '1';
    }
    
}

// 버튼 클릭 이벤트 리스너 등록
const buttons = document.querySelectorAll('.container-button button');
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick2);
});

// Enter 키 이벤트 처리 함수
document.addEventListener('keydown', function(event) {
    let eventDiv = document.querySelector('.warning-window-div-1');
    if (event.key === 'Enter') {
        if (eventDiv .style.display == 'block') {
            console.log("!!");
            eventDiv .style.display = 'none';
            document.querySelector('.container').style.filter = 'none';
            event.preventDefault();
            handleButtonClick();
        }
    }
});


// 모든 버튼에 클릭 이벤트 리스너 추가
document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelector('.warning-window-div-1').style.display = 'block';
        document.querySelector('.container').style.filter = 'blur(5px)';
    });
});


