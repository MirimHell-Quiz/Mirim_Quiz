// 버튼 클릭 시간을 기록할 변수
let buttonClicked = false;

// 버튼 클릭 이벤트 처리 함수
function handleButtonClick() {
    // 버튼이 클릭되었음을 표시
    buttonClicked = true;
    // showWarningWindow 함수를 호출하여 경고 창을 보여줌
    showWarningWindow();
}

// 시간 초과를 감지하고 경고 창을 보여주는 함수
function checkTimeout() {
    // 버튼이 클릭되지 않았을 때 경고 창에 '2' 텍스트를 표시
    if (!buttonClicked) {
        const warningText = document.querySelector('.warning-window-div-2 p');
        warningText.textContent = '2';
        showWarningWindow();
    }
}

// 8초 후에 checkTimeout 함수를 호출하여 시간 초과를 체크
setTimeout(checkTimeout, 8000);

// 버튼 클릭 시 '1' 텍스트를 경고 창에 표시하는 함수
function showWarningWindow() {
    // warning-window-div-1 요소를 가져옴
    const warningWindow = document.querySelector('.warning-window-div-1');
    // container 요소를 가져옴
    const container = document.querySelector('.container');
    // warning-window-div-1 요소를 보이게 함
    warningWindow.style.display = 'block';
    // container 요소에 blur 클래스를 추가하여 흐리게 함
    container.classList.add('blur');
    // 버튼이 클릭되었을 때만 '1' 텍스트를 표시
    if (buttonClicked) {
        const warningText = document.querySelector('.warning-window-div-2 p');
        warningText.textContent = '1';
    }
}

// 버튼 클릭 이벤트 리스너 등록
const buttons = document.querySelectorAll('.container-button button');
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


