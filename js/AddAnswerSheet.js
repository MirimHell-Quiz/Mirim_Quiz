document.addEventListener("DOMContentLoaded", function () {
    // PHP 스크립트에서 퀴즈 데이터를 가져옴
    fetch('../php/fetch_quizData.php') // 여기에 PHP 스크립트의 경로를 넣으세요
        .then(response => response.json())
        .then(quizData => {

            // quizData 배열을 역순으로 뒤집습니다.
            quizData.reverse();
            // 가져온 quizData를 사용하여 페이지에 내용을 추가합니다.
            const container = document.querySelector('.container');

            quizData.forEach(function (quizItem, index) {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question-div');

                // 첫 번째 .question-div에만 별도의 ID를 지정합니다.
                if (index === 0) {
                    questionDiv.id = 'first-question-div';
                }

                const questionTitle = document.createElement('h3');
                questionTitle.classList.add('question', 'neon-text-2');
                questionTitle.textContent = `${quizItem.id}번`;

                const containerText = document.createElement('div');
                containerText.classList.add('container-text', 'neon-div-1');

                const problemText = document.createElement('h2');
                problemText.classList.add('problem_text', 'neon-text-1');
                problemText.textContent = quizItem.problem;

                containerText.appendChild(problemText);

                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result-div');

                const resultDiv2 = document.createElement('div');
                resultDiv2.classList.add('result-div-2');

                ['choice1', 'choice2', 'choice3', 'choice4'].forEach(function (choice, index) {
                    const result = document.createElement('div');
                    result.classList.add('result', 'neon-div-1');

                    const resultText = document.createElement('p');
                    resultText.classList.add('result-text', `result-text-${index + 1}`);
                    resultText.textContent = quizItem[choice];

                    result.appendChild(resultText);
                    resultDiv2.appendChild(result);
                });

                resultDiv.appendChild(resultDiv2);
                questionDiv.appendChild(questionTitle);
                questionDiv.appendChild(containerText);
                questionDiv.appendChild(resultDiv);

                container.appendChild(questionDiv);
            });
        })
        .catch(error => console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error));
});