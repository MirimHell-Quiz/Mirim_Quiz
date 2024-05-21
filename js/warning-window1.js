const buttons = document.querySelectorAll('.container-button button');
const warningWindow = document.querySelector('.warning-window-div-1-1');
const container = document.querySelector('.container');
document.addEventListener('DOMContentLoaded', () => {
    let timer;

    function displayWarningWindow() {
        warningWindow.style.display = 'block';
        container.style.filter = 'blur(4px)'
    }

    function resetTimer() {
        clearTimeout(timer);
        timer = setTimeout(displayWarningWindow, 10000); // 10초 타이머
    }

    function handleButtonClick() {
        resetTimer();
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    resetTimer(); // 초기 타이머 시작
});

// Function to handle keyboard events
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        id++;
        loadQuiz(id);

        console.log("윤지쌤캡숑짱1",warningWindow);
console.log("윤지쌤캡숑짱2",warningWindow.style);

         if (warningWindow.style.display === 'block') {
            console.log("윤지쌤캡숑짱33",warningWindow.style.display);
             warningWindow.style.display = 'none';
             container.style.filter = 'none';
         }
    }
}

document.addEventListener('keypress', handleKeyPress);


