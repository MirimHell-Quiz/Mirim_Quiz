<?php
// 데이터베이스 연결 정보
$servername = "localhost";
$username = "root";
$password = "505015";
$dbname = "testdb";

// 데이터베이스 연결 생성
$conn = mysqli_connect($servername, $username, $password, $dbname);

// 연결 확인
if (!$conn) {
    die("연결 실패: " . mysqli_connect_error());
}

// URL에서 id 가져오기
$id = $_GET['id'];

// 데이터베이스에서 해당 id의 Nickname을 가져오는 쿼리
$query = "SELECT Nickname FROM User WHERE id = '$id'";
$result = mysqli_query($conn, $query);

// 쿼리 실행 결과가 있으면 결과 반환합니다.
if ($result && mysqli_num_rows($result) > 0) {
    // 결과에서 Nickname 가져오기
    $row = mysqli_fetch_assoc($result);
    $nickname = $row['Nickname'];

    // Nickname을 포함하여 HTML 페이지로 리다이렉트합니다.
    header("Location: http://localhost/MIRIM_QUIZ/html/Review.html?Nickname=$nickname");
    exit();
} else {
    // 학생 키가 일치하지 않는 경우, 오류 메시지를 포함하여 HTML 페이지로 리다이렉트합니다.
    header("Location: http://localhost/MIRIM_QUIZ/html/Review.html?error=1");
    exit();
}

// MySQL 연결 닫기
mysqli_close($conn);
?>
