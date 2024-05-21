document.addEventListener('DOMContentLoaded', () => {
    const containerButtons = document.querySelectorAll('.container-button button');

    // 각 버튼에 클릭 이벤트 리스너 추가
    containerButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 버튼을 클릭하면 warning-window-div-2-1를 보이도록 설정
            const warningWindow = document.querySelector('.warning-window-div-2-1');
            const container = document.querySelector('.container');
            warningWindow.style.display = 'block';
            container.style.filter = 'blur(4px)'
        });
    });
});


function handleKeyPress(event) {
    if (event.keyCode === 13) {
        id++;
        loadQuiz(id);

        console.log("안녕")

        // 경고 창과 컨테이너 가져오기
        const warningWindow = document.querySelector('.warning-window-div-2-1');
        const container = document.querySelector('.container');

        console.log("SS",warningWindow);
        console.log("SS2",warningWindow.style.display);

        // 경고 창이 열려 있는지 확인하고 열려 있다면 숨기고 블러 효과 제거
        if (warningWindow.style.display === 'block') {
            console.log("KK??");
            warningWindow.style.display = 'none';
            container.style.filter = 'none';
        }
    }
}

document.addEventListener('keypress', handleKeyPress);
