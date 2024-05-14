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
    reviewCounter++; // 리뷰 카운터 증가
    var reviewOutput = document.createElement('div'); // 새로운 div 요소 생성
    reviewOutput.textContent = "입력된 리뷰 " + reviewCounter + ": " + text; // 리뷰 텍스트 설정
    reviewOutput.classList.add('reviewOutput'); // reviewOutput 클래스 추가
    reviewOutput.id = "reviewOutput" + reviewCounter; // 리뷰의 id를 설정하여 고유하게 만듦
    
    if (reviewCounter >= 1) { // 만약 리뷰가 2개 이상이라면
        var messagebox = document.createElement('div'); // messagebox 요소 생성
        messagebox.classList.add('messagebox'); // messagebox 클래스 추가
        
        var information = document.createElement('div'); // information 요소 생성
        information.classList.add('information'); // information 클래스 추가
        
        var nickname = document.createElement('div'); // nickname 요소 생성
        nickname.classList.add('nickname'); // nickname 클래스 추가
        nickname.textContent = "이름 :랜덤요소 넣기"; // 닉네임 설정
        
        information.appendChild(nickname); // nickname을 information에 추가
        information.appendChild(reviewOutput); // reviewOutput을 information에 추가
        messagebox.appendChild(information); // information을 messagebox에 추가
        
        document.body.appendChild(messagebox); // messagebox를 body에 추가
    } else {
        document.body.appendChild(reviewOutput); // 리뷰를 body에 추가
    }
}

    // 후기를 로컬 스토리지에 저장하는 함수
    function saveReviewToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

});