document.addEventListener("DOMContentLoaded", function () {
    // Quiz_date.js의 데이터를 사용합니다.
    const quizData = Quiz_date;

    // URL에서 userID를 추출합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const userID = urlParams.get('id');

    if (!userID) {
        console.error('User ID not provided in URL.');
        return;
    }

    // .container 요소를 가져옵니다.
    const container = document.querySelector('.container');

    // fetch 요청을 사용하여 두 개의 데이터를 비동기적으로 가져옵니다.
    Promise.all([
        fetch(`../php/fetch_AnswerData.php?id=${userID}`).then(response => response.json()),
        fetch(`../php/fetch_UserData.php`).then(response => response.json())
    ]).then(([answerData, userData]) => {
        if (!answerData || answerData.length === 0) {
            console.error('No data found for the given user ID.');
            return;
        }

        // userID에 맞는 데이터를 필터링합니다.
        const userAnswers = answerData.find(data => data.Answerid === userID);

        if (!userAnswers) {
            console.error('No matching data found for the given user ID.');
            return;
        }

        // userID에 맞는 닉네임을 필터링합니다.
        const user = userData.find(data => data.Userid == userID);

        if (!user) {
            console.error('No matching user data found for the given student key.');
            return;
        }

        // 사용자 정보를 표시하는 요소를 생성합니다.
        const userDivAll = document.createElement('div');
        userDivAll.classList.add('user-div-all');

        const userDivNumber = document.createElement('div');
        userDivNumber.classList.add('user-div', 'number');
        userDivNumber.innerHTML = `
            <div class="user-div-1 neon-div-1 neon-text-2">학번</div>
            <div class="user-div-2 neon-div-1 neon-text-2">${userAnswers.Answerid}</div>
        `;

        const userDivNickname = document.createElement('div');
        userDivNickname.classList.add('user-div', 'nickname');
        userDivNickname.innerHTML = `
            <div class="user-div-1 neon-div-1 neon-text-2">닉네임</div>
            <div class="user-div-2 neon-div-1 neon-text-2">${user.Nickname}</div>
        `;

        userDivAll.appendChild(userDivNumber);
        userDivAll.appendChild(userDivNickname);

        container.appendChild(userDivAll);

        // quizData 배열을 순회하면서 .question-div 요소를 동적으로 생성합니다.
        quizData.forEach(function (quizItem, questionIndex) {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-div');

            // 첫 번째 .question-div에만 별도의 ID를 지정합니다.
            if (questionIndex === 0) {
                questionDiv.id = 'first-question-div';
            }

            const questionTitle = document.createElement('h3');
            questionTitle.classList.add('question', 'neon-text-2');
            questionTitle.textContent = `${quizItem.id}번 문제`;

            const containerText = document.createElement('div');
            containerText.classList.add('container-text', 'neon-div-1');

            const problemText = document.createElement('h2');
            problemText.classList.add('problem_text', 'neon-text-1');
            problemText.textContent = quizItem.Question;

            containerText.appendChild(problemText);

            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result-div');

            const resultDiv2 = document.createElement('div');
            resultDiv2.classList.add('result-div-2');

            ['Answer1', 'Answer2', 'Answer3', 'Answer4'].forEach(function (choice, answerIndex) {
                const result = document.createElement('div');
                result.classList.add('result', 'neon-div-1');

                const resultText = document.createElement('p');
                resultText.classList.add('result-text', `result-text-${answerIndex + 1}`);
                resultText.textContent = quizItem[choice];

                // 각 사용자가 선택한 답변을 반영하여 스타일을 변경합니다.
                const questionKey = `Question${questionIndex + 1}`;
                if (userAnswers[questionKey] == answerIndex + 1) {
                    result.style.backgroundColor = '#FFF0F0';
                    resultText.style.color = '#000000';
                    result.style.boxShadow = '0 0 .2rem #fff, 0 0 .2rem #fff, 0 0 2rem rgb(244, 0, 0, 0.47), 0 0 0.8rem rgb(244, 0, 0, 0.47), 0 0 2.8rem rgb(244, 0, 0, 0.47)';
                } else {
                    resultText.style.color = '#FFFFFF';
                }

                result.appendChild(resultText);
                resultDiv2.appendChild(result);
            });

            resultDiv.appendChild(resultDiv2);
            questionDiv.appendChild(questionTitle);
            questionDiv.appendChild(containerText);
            questionDiv.appendChild(resultDiv);

            container.appendChild(questionDiv);
        });
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
});
