document.addEventListener("DOMContentLoaded", function () {
    const quizData = Quiz_date;
    // PHP에서 데이터를 가져오는 fetch 요청
    fetch('../php/fetch_AnswerData.php')
        .then(response => response.json()) // JSON 형식으로 변환
        .then(Answerdata => {
            const answerData = Answerdata;

            const container = document.querySelector('.container');
            const questionCounts = {};

            // 각 질문에 대해 선택지의 빈도수를 계산
            answerData.forEach(item => {
                for (let i = 1; i <= 10; i++) {
                    const questionKey = `Question${i}`;
                    if (!questionCounts[questionKey]) {
                        questionCounts[questionKey] = { choice1: 0, choice2: 0, choice3: 0, choice4: 0 };
                    }
                    const choice = item[questionKey];
                    if (choice) {
                        questionCounts[questionKey][`choice${choice}`]++;
                    }
                }
            });

            // 비율 계산 함수
            function calculatePercentages(counts) {
                const total = Object.values(counts).reduce((a, b) => a + b, 0);
                return {
                    choice1: (counts.choice1 / total) * 100,
                    choice2: (counts.choice2 / total) * 100,
                    choice3: (counts.choice3 / total) * 100,
                    choice4: (counts.choice4 / total) * 100
                };
            }

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
                problemText.textContent = quizItem.Question;

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

                const questionKey = `Question${index + 1}`;
                const percentages = calculatePercentages(questionCounts[questionKey]);

                ['choice1', 'choice2', 'choice3', 'choice4'].forEach(function (choice, choiceIndex) {
                    const result = document.createElement('div');
                    result.classList.add('result', 'neon-div-1');

                    const result2_1 = document.createElement('div');
                    result2_1.classList.add('result2-1', 'neon-div-2');
                    result2_1.id = `result${quizItem.id}_${choiceIndex + 1}`;
                    const percentage = percentages[`choice${choiceIndex + 1}`];
                    result2_1.textContent = `${percentage.toFixed(1)}%`;
                    result2_1.style.width = `${percentage}%`;

                    const resultText = document.createElement('div');
                    resultText.classList.add('result-text', `result-text-${choiceIndex + 1}`);
                    const choiceText = quizItem[`Answer${choiceIndex + 1}`] || "";
                    resultText.innerHTML = formatChoiceText(choiceText);

                    result.appendChild(result2_1);
                    result.appendChild(resultText);

                    if (choiceIndex < 2) {
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
                if (!choice) {
                    return "";
                }
                const teacherPattern = /(.+?)\s*([가-힣]+ 선생님)/;
                const match = choice.match(teacherPattern);
                if (match) {
                    return `<div class='quiz-div'><p class='before-teacher'>${match[1]}</p><p class='teacher'>${match[2]}</p></div>`;
                } else {
                    return choice;
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
