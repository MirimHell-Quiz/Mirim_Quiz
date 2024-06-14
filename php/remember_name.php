<?php
$conn = mysqli_connect('localhost', 'root', '505015', 'testdb');

if (!$conn) {
    die("연결 실패: " . mysqli_connect_error());
}

$studentKey = $_GET['id']; // GET 요청을 통해 받은 경우

// 데이터베이스에서 학생 키에 해당하는 id를 가져옵니다.
$query = "SELECT Nickname FROM User WHERE StudentKey = '$studentKey'";
$result = mysqli_query($conn, $query);

// 쿼리 실행 결과가 있으면 결과 반환합니다.
if ($result && mysqli_num_rows($result) > 0) {
    // 결과에서 Nickname 가져옵니다.
    $row = mysqli_fetch_assoc($result);
    $id = $row['Nickname'];
    
    // HTML 페이지로 리다이렉트하면서 Nickname URL 매개변수로 전달합니다.
    header("Location: http://localhost/mirim/html/quiz.html?id=$id");
    exit();
} else {
    // 학생 키가 일치하지 않는 경우, 오류 메시지를 포함하여 HTML 페이지로 리다이렉트합니다.
    header("Location: http://localhost/mirim/html/quiz.html?error=1");
    exit();
}

// MySQL 연결을 닫습니다.
mysqli_close($conn);
?>
