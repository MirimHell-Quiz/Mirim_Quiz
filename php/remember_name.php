<?php
// $servername = "localhost";
// $username = "root";
// $password = "1234";
// $dbname = "mysql";

// // 데이터베이스 연결 생성
// $conn = mysqli_connect($servername, $username, $password, $dbname);
$conn = mysqli_connect('localhost', 'test', 'Osb01166', 'testdb');

if (!$conn) {
    die("연결 실패: " . mysqli_connect_error());
}

$id = $_GET['id'];

// 데이터베이스에서 학생 키에 해당하는 id를 가져옵니다.
$query = "SELECT id FROM User WHERE id = '$id'";
$result = mysqli_query($conn, $query);

// 쿼리 실행 결과가 있으면 결과 반환합니다.
if ($result && mysqli_num_rows($result) > 0) {
    // 결과에서 Nickname 가져옵니다.
    $row = mysqli_fetch_assoc($result);

    // HTML 페이지로 리다이렉트하면서 Nickname URL 매개변수로 전달합니다.
    header("Location: http://localhost/MIRIM_QUIZ/html/quiz.html?id=$id");
    exit();
} else {
    // 학생 키가 일치하지 않는 경우, 오류 메시지를 포함하여 HTML 페이지로 리다이렉트합니다.
    header("Location: http://localhost/MIRIM_QUIZ/html/quiz.html?error=1");
    exit();
}

// MySQL 연결을 닫습니다.
mysqli_close($conn);
?>