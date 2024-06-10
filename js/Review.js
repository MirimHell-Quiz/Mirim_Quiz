const $bottomBtn = document.querySelector(".moveBottomBtn");

// 버튼 클릭 시 페이지 하단으로 이동
$bottomBtn.onclick = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

document.addEventListener("DOMContentLoaded", function() {
    var textarea = document.getElementById("reviewTextarea");   // html에서 값 받기
    var limitmessage = document.getElementById("limitmessage");
    var reviewCounter = 0;
    var textarea_date = [ // 금지어 리스트
        {
            "date1": "사랑",
            "date2": "씨발",
            "date3": "좆",
            "date4": "죄송",
            "date5": "사실",
            "date6": "사죄",
            "date7": "시발",
            "date8": "개",
        },
    ];

    // 랜덤 닉네임을 생성하는 함수
    function generateRandomNickname() {
        const nicknames = ["유저1", "유저2", "유저3", "유저4", "유저5"]; // PHP에서 랜덤 이름 값 받기 (여기서는 예시로 하드코딩)
        return nicknames[Math.floor(Math.random() * nicknames.length)];
    }

    textarea.addEventListener("keypress", function(event) { // textarea에 키 이벤트 추가
        if (event.key === "Enter") {
            event.preventDefault(); // Enter 키의 기본 동작 방지 (새 줄 추가)
    
            var text = textarea.value;
            var prohibitedWords = Object.values(textarea_date[0]); // 금지어 배열
            var foundProhibitedWords = prohibitedWords.filter(function(word) {
                return text.includes(word);
            });
    
            if (foundProhibitedWords.length > 0) { // 발견된 금지어가 있으면
                var prohibitedWordString = foundProhibitedWords.join(", ");
                alert("해당 글자는 금지어입니다 => " + prohibitedWordString); // Alert message instead of limitmessage
            } else { // 금지어가 없으면
                limitmessage.textContent = ""; // 금지어 경고문 삭제
                limitmessage.style.display = "none"; // 메시지 숨기기
                printReview(text); // 후기 출력 함수 호출
                saveReviewToLocalStorage("reviewOutput" + reviewCounter, text);
                textarea.value = ''; // textarea 초기화
            }
        }
    });
    

    function printReview(text) { // 리뷰 출력 함수
        const messagebox = document.getElementById("messagebox");
        reviewCounter++; // 리뷰 카운터 증가
        if (text.trim() !== "") {
            const nickname = generateRandomNickname();
            const messageHTML = `
                <div class="information neon-div-1">
                    <div class="nicknamebox">
                        <div class="base_nickname neon-div-1 neon-text-2">닉네임</div>
                        <div class="user_nickname neon-div-1 neon-text-2">${nickname}</div>
                    </div>
                    <div class="reviewOutput neon-div-2">${text}</div>
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