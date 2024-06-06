document.addEventListener("DOMContentLoaded", function () {
    // Quiz_date.js의 데이터를 사용합니다.
    const quizData = Quiz_date;

    // .container 요소를 가져옵니다.
    const container = document.querySelector('.container');

    // quizData 배열을 순회하면서 .question-div 요소를 동적으로 생성합니다.
    quizData.forEach(function (quizItem, index) {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-div');

        // 첫 번째 .question-div에만 별도의 ID를 지정합니다.
        if (index === 0) {
            questionDiv.id = 'first-question-div';
        }

        const questionTitle = document.createElement('h3');
        questionTitle.classList.add('question', 'neon-text-2');
        questionTitle.textContent = `${quizItem.id}번 문제`;

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
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Array of result div IDs
//     const resultIds = ['result1', 'result2', 'result3', 'result4'];

//     // Iterate through each result div and set its width
//     resultIds.forEach(function (id) {
//         // Get the result div element
//         const resultDiv = document.getElementById(id);
//         if (resultDiv) {
//             // Extract the percentage value from the inner text
//             const percentage = parseInt(resultDiv.innerText);
//             if (!isNaN(percentage)) {
//                 // Set the width of the result div
//                 resultDiv.style.width = percentage + '%';
//             }
//         }
//     });
// });