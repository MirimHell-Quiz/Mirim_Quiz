document.addEventListener("DOMContentLoaded", function() {
    var textarea = document.getElementById("reviewTextarea");   //html에서 값 받기
    var limitmessage = document.getElementById("limitmessage");
    var reviewCounter = 0;
    var textarea_date = [ // 금지어 리스트
        {
            "date1" : "사랑",
            "date2" : "씨발",
            "date3" : "좆",
            "date4" : "죄송",
            "date5" : "사실",
            "date6" : "사죄",
            "date7" : "시발",
            "date8" : "개",
        },
    ];

    // 랜덤 닉네임을 생성하는 함수
    function generateRandomNickname() {
        const nicknames = ["텐쿠바시", "군지아키라", "미림인", "마을사람B", "무다노", "신에이", "이치노세"];
        return nicknames[Math.floor(Math.random() * nicknames.length)];
    }

    textarea.addEventListener("keypress", function(event) { // textarea에 키 이벤트 추가
        if (event.key === "Enter") {
            var text = textarea.value;
            var prohibitedWords = Object.values(textarea_date[0]); // 금지어 배열
            var foundProhibitedWords = prohibitedWords.filter(function(word) {
                return text.includes(word);
            });

            if (foundProhibitedWords.length > 0) { // 발견된 금지어가 있으면
                var prohibitedWordString = foundProhibitedWords.join(", ");
                limitmessage.textContent = "해당 글자는 금지어입니다 => " + prohibitedWordString;
                limitmessage.style.display = "block"; // 메시지를 보이도록 설정
                event.preventDefault(); // Enter 키의 기본 동작 방지 (새 줄 추가)
            } else { // 금지어가 없으면
                limitmessage.textContent = ""; // 금지어 경고문 삭제
                limitmessage.style.display = "none"; // 메시지 숨기기
                printReview(text); // 후기 출력 함수 호출
                saveReviewToLocalStorage("reviewOutput" + reviewCounter, text);
                reviewTextarea.value = '';
            }
        }
    });


    function printReview(text) { // 리뷰 출력 함수
        const messagebox = document.getElementById("messagebox");
        reviewCounter++; // 리뷰 카운터 증가
        if (text.trim() !== "") {
            const nickname = generateRandomNickname();
            const messageHTML = `
                <div class="information">
                    <div class="nickname">${nickname}</div>
                    <div class="reviewOutput">${text}</div>
                </div>
            `;
            messagebox.insertAdjacentHTML("beforeend", messageHTML);
        }
    }

    // 후기를 로컬 스토리지에 저장하는 함수
    function saveReviewToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

});