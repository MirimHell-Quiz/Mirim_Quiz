const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = parseInt(urlParams.get('id')); // ID를 정수형으로 변환합니다.

loadQuiz(id); // 받은 ID로 초기 로드합니다.

// ID를 기준으로 퀴즈를 차례대로 불러옵니다.
function loadQuiz(id) {
    const quiz = Quiz_date.find(quiz => quiz.id === id);
    // Quiz_date 배열에서 있는 ID가 현재 받은 ID와 일치하는지 확인합니다.

    if (quiz) {
        const problemText = document.querySelector('.problem_text');
        problemText.textContent = quiz.problem;

        const buttons = [];

        for (let i = 1; i <= 4; i++) {
            // 각 버튼 요소를 buttons 배열에 추가합니다.
            buttons.push(document.querySelector(`.button${i}`));
            buttons[i - 1].textContent = quiz[`choice${i}`]; // 인덱스를 0부터 시작하도록 조정합니다.
        }

        adjustTextSize(buttons); // 버튼 텍스트의 크기를 조정합니다.
    } else {
        console.error('ID에 해당하는 퀴즈를 찾을 수 없습니다:', id);
    }
}

// 버튼을 클릭하면 다음 id로 넘어가서 문제를 보여줌
for (let i = 0; i < 4; i++) {
    document.querySelector(`.button${i + 1}`).addEventListener('click', handleButtonClick);
}

// 버튼 클릭을 처리하는 함수
function handleButtonClick() {
    id++;
    loadQuiz(id); // 새로운 ID로 퀴즈를 로드합니다.
}

// 버튼 텍스트의 크기를 조정하는 함수
function adjustTextSize(buttons) {
    console.log("adjustTextSize 들어옴")
    buttons.forEach(button => {
        let fontSize = 35; // 기본 폰트 크기 설정
        button.style.fontSize = `${fontSize}px`;

        console.log("button.style.fontSize "+button.style.fontSize)
        console.log("button.scrollWidth "+button.scrollWidth)
        console.log("button.clientWidth "+button.clientWidth)
        console.log("button.scrollHeight "+button.scrollHeight)
        console.log("button.clientHeight "+button.clientHeight)

        // 버튼 내부의 텍스트 길이에 따라 폰트 크기를 줄입니다.
        while (button.scrollWidth > button.clientWidth || button.scrollHeight > button.clientHeight) {
            fontSize--;
            button.style.fontSize = `${fontSize}px`;
            if (fontSize < 10) break; // 최소 폰트 크기를 설정합니다.
        }
    });
}
