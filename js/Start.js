// URL에서 id 값을 추출하는 함수
function getStudentKey() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// id 값을 추출
const studentKey = getStudentKey();

document.querySelector('.start').addEventListener('click', function () {
    // ID 1로 퀴즈 시작 페이지로 이동
    window.location.href = `../php/remember_name.php?id=${studentKey}`;
});

document.querySelector('.back').addEventListener('click', function () {
    // 취소 버튼 클릭 시, 사용자 정의 작업 수행 (예: 다른 페이지로 이동)
    alert('퀴즈를 취소하셨습니다.');
    window.location.href = `../index.html`;
});