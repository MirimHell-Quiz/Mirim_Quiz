document.addEventListener("DOMContentLoaded", function() {
    const $bottomBtn = document.querySelector(".moveBottomBtn");

    // URL에서 nickname 값을 추출하는 함수
    function getNickName() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('Nickname');
    }

    const nickname = getNickName();

    console.log(nickname);

    // 추출한 닉네임을 HTML에 삽입하는 함수
    function setNickname(nickname) {
        const nicknameElement = document.getElementById('nickname');
        if (nicknameElement) {
            nicknameElement.textContent = nickname || '잠자는 두루미'; // 닉네임이 없으면 기본값 사용
        }
    }

    // 닉네임 설정
    setNickname(nickname);

    // 사용자 ID를 가져오는 함수
    function fetchUserId(nickname, callback) {
        fetch(`../php/getuser_id.php?nickname=${nickname}`)
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    callback(data.id);
                } else {
                    console.error('Error fetching user ID:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // 버튼 클릭 시 페이지 하단으로 이동
    $bottomBtn.onclick = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    var textarea = document.getElementById("reviewTextarea");   // html에서 값 받기
    var limitmessage = document.getElementById("limitmessage");
    var reviewCounter = 0;
    var textarea_date = [ // 금지어 리스트
        "사랑", "씨발", "좆", "죄송", "사실", "사죄", "시발", "개"
    ];

    textarea.addEventListener("keypress", function(event) { // textarea에 키 이벤트 추가
        if (event.key === "Enter") {
            event.preventDefault(); // Enter 키의 기본 동작 방지 (새 줄 추가)

            const text = textarea.value;
            const foundProhibitedWords = textarea_date.filter(word => text.includes(word));

            if (foundProhibitedWords.length > 0) { // 발견된 금지어가 있으면
                const prohibitedWordString = foundProhibitedWords.join(", ");
                alert("해당 글자는 금지어입니다 => " + prohibitedWordString); // Alert message instead of limitmessage
            } else { // 금지어가 없으면
                limitmessage.textContent = ""; // 금지어 경고문 삭제
                limitmessage.style.display = "none"; // 메시지 숨기기
                displayReview({ Nickname: nickname, Review: text }); // 리뷰 출력 함수 호출
                sendReviewToServer(text); // 서버로 데이터 전송
                saveReviewToLocalStorage("reviewOutput" + reviewCounter, text);
                textarea.value = ''; // textarea 초기화
            }
        }
    });

    // 후기를 로컬 스토리지에 저장하는 함수
    function saveReviewToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    // 후기를 서버로 전송하는 함수
    function sendReviewToServer(text) {
        const user_nick = nickname; // 예시로 하드코딩한 사용자 ID. 실제로는 동적으로 설정해야 함.

        fetch('../php/review.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ review: text, id: user_nick })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }) // JSON 형식으로 응답 처리
        .then(data => {
            console.log('Success:', data);
            // 서버 응답에 따라 추가 작업을 수행할 수 있습니다.
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    // 서버에서 리뷰 데이터를 가져오는 함수
    function fetchReviews() {
        fetch('http://localhost/MIRIM_QUIZ/php/fetch_reviews.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched reviews:', data); // 콘솔에 데이터를 출력하여 확인
                displayReviews(data);
            })
            .catch(error => console.error('Error:', error));
    }

    // 리뷰 데이터를 HTML에 표시하는 함수
    function displayReviews(reviews) {
        const messagebox = document.getElementById('messagebox');
        messagebox.innerHTML = ''; // 기존 리뷰 초기화
        reviews.forEach(review => {
            displayReview(review);
        });
    }

    function displayReview(review) {
        const messagebox = document.getElementById('messagebox');
        const messageHTML = `
            <div class="information neon-div-1">
                <div class="nicknamebox">
                    <div class="user-div-1 neon-div-1 neon-text-2">닉네임</div>
                    <div class="user_nickname neon-div-1 neon-text-2">${review.Nickname}</div>
                </div>
                <div class="reviewOutput neon-div-2">${review.Review}</div>
            </div>
        `;
        messagebox.insertAdjacentHTML("beforeend", messageHTML);
    }

    // 페이지 로드 시 리뷰 데이터를 가져옵니다
    fetchReviews();

    // Result 페이지로 이동
    document.getElementById('resultBtn').onclick = function() {
        fetchUserId(nickname, function(userId) {
            location.href = `Result.html?id=${userId}`;
        });
    };

    // AddQuiz 페이지로 이동
    document.getElementById('addQuizBtn').onclick = function() {
        fetchUserId(nickname, function(userId) {
            location.href = `AddQuiz.html?id=${userId}`;
        });
    };

    // Finish 페이지로 이동
    document.getElementById('finishBtn').onclick = function() {
        location.href = 'finish.html';
    };
});
