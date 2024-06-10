document.addEventListener("DOMContentLoaded", function () {
    const quizData = Quiz_date;
    const container = document.querySelector('.container');

    quizData.forEach(function (quizItem, index) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-div');

        if (index === 0) {
            questionDiv.id = 'first-question-div';
        }

        const problemAndQuestionDiv = document.createElement('div');
        problemAndQuestionDiv.classList.add('problem-and-question');

        const questionTitle = document.createElement('h3');
        questionTitle.classList.add('question', 'neon-text-2');
        questionTitle.textContent = `${quizItem.id}번 문제`;

        problemAndQuestionDiv.appendChild(questionTitle);

        const containerText = document.createElement('div');
        containerText.classList.add('container-text', 'neon-div-1');
        
        const problemText = document.createElement('h2');
        problemText.classList.add('problem_text', 'neon-text-1');
        problemText.textContent = quizItem.problem;

        containerText.appendChild(problemText);

        problemAndQuestionDiv.appendChild(containerText);

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-div');

        const resultDiv2 = document.createElement('div');
        resultDiv2.classList.add('result-div-2');

        // 그룹을 위한 div 추가
        const firstGroupDiv = document.createElement('div');
        firstGroupDiv.classList.add('result-group-1');

        const secondGroupDiv = document.createElement('div');
        secondGroupDiv.classList.add('result-group-2');

        ['choice1', 'choice2', 'choice3', 'choice4'].forEach(function (choice, index) {
            const result = document.createElement('div');
            result.classList.add('result', 'neon-div-1');

            const result2_1 = document.createElement('div');
            result2_1.classList.add('result2-1', 'neon-div-2');
            result2_1.id = `result${quizItem.id}_${index + 1}`;
            const percentage = (index + 1) * 20;
            result2_1.textContent = `${percentage}%`;
            result2_1.style.width = `${percentage}%`;

            const resultText = document.createElement('div');
            resultText.classList.add('result-text', `result-text-${index + 1}`);
            resultText.innerHTML = formatChoiceText(quizItem[choice]);

            result.appendChild(result2_1);
            result.appendChild(resultText);

            // 첫 번째와 두 번째 .result는 result-group-1에, 세 번째와 네 번째 .result는 result-group-2에 추가
            if (index < 2) {
                firstGroupDiv.appendChild(result);
            } else {
                secondGroupDiv.appendChild(result);
            }
        });

        resultDiv2.appendChild(firstGroupDiv);
        resultDiv2.appendChild(secondGroupDiv);
        resultDiv.appendChild(resultDiv2);

        questionDiv.appendChild(problemAndQuestionDiv);
        questionDiv.appendChild(resultDiv);

        container.appendChild(questionDiv);
    });

    function formatChoiceText(choice) {
        const teacherPattern = /(.+?)\s*([가-힣]+ 선생님)/;
        const match = choice.match(teacherPattern);
        if (match) {
            return `<div class='quiz-div'><p class='before-teacher'>${match[1]}</p><p class='teacher'>${match[2]}</p></div>`;
        } else {
            return choice;
        }
    }
});
