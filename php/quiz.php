<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link rel="stylesheet" href="../css/basic-style.css">
    <link rel="stylesheet" href="../css/countdown.css" />
    <link rel="stylesheet" href="../css/quiz.css" />
</head>

<body>
    <div class="warning-window-div-1" style="display:none;">
        <div class="warning-window-div-2 neon-div-1">
            <p class="warning-text-1 neon-text-1">텍스트</p>
            <div class="warning-text-small">
                <p class="no-answer neon-text-2">대답하지 못하신 분</p>
                <p class="warning-text-2 neon-text-2">텍스트</p>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="container-text neon-div-1">
            <h2 class="problem_text neon-text-1" id="question"><?php echo $question; ?></h2>
        </div>

        <div class="countdown">
            <audio id='audio_play' src='../src/audio/countdown.mp3' autoplay>오디오</audio>
            <div class="progress-bar neon-div-1">
                <div class="progress-bar__bar"></div>
            </div>
        </div>

        <div class="container-button">
            <div id="button-group1">
                <button class="button1 neon-div-1 neon-text-2" onclick="submitAnswer(1)"><?php echo $answer1; ?></button>
                <button class="button3 neon-div-1 neon-text-2" onclick="submitAnswer(2)"><?php echo $answer2; ?></button>
            </div>

            <div id="button-group2">
                <button class="button2 neon-div-1 neon-text-2" onclick="submitAnswer(3)"><?php echo $answer3; ?></button>
                <button class="button4 neon-div-1 neon-text-2" onclick="submitAnswer(4)"><?php echo $answer4; ?></button>
            </div>
        </div>
    </div>

    <script>
        let currentQuestionId = 1; // 현재 질문 ID
        let currentQuizData = {}; // 현재 퀴즈 데이터 저장

        // 답변 선택 시 호출되는 함수
        function submitAnswer(answerId) {
            // 해당 답변에 따른 NoAnswer 텍스트 표시
            const warningText1 = document.querySelector('.warning-text-1');
            warningText1.textContent = currentQuizData[`NoAnswer${answerId}`];
            document.querySelector('.warning-window-div-1').style.display = 'block';
        }

        // Enter 키를 눌렀을 때 호출되는 함수
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                // 다음 질문 로드
                currentQuestionId++;
                loadNextQuestion(currentQuestionId);
                document.querySelector('.warning-window-div-1').style.display = 'none';
            }
        });

        // 다음 질문을 로드하는 함수
        function loadNextQuestion(questionId) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'load_question.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response) {
                        currentQuizData = response; // 현재 퀴즈 데이터 업데이트
                        // 질문 및 답변 텍스트 업데이트
                        document.getElementById('question').textContent = response.Question;
                        document.querySelector('.button1').textContent = response.Answer1;
                        document.querySelector('.button2').textContent = response.Answer2;
                        document.querySelector('.button3').textContent = response.Answer3;
                        document.querySelector('.button4').textContent = response.Answer4;
                    } else {
                        // 더 이상 질문이 없을 경우
                        document.getElementById('question').textContent = 'No more questions available';
                        document.querySelectorAll('.container-button button').forEach(button => {
                            button.textContent = '';
                            button.disabled = true; // 버튼 비활성화
                        });
                    }
                }
            };
            xhr.send('id=' + questionId);
        }

        // 처음 로드 시 첫 번째 질문 로드
        loadNextQuestion(currentQuestionId);
    </script>
    <script src="../js/countdown.js"></script>
    <script src="../js/quizCount.js"></script>

</body>
</html>