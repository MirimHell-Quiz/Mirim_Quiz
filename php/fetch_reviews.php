<?php
// MySQL 서버 접속 정보
include_once("./db_conn.php");

// 연결 확인
if ($conn->connect_error) {
    // JSON 형식으로 오류 메시지 반환
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]);
    exit();
}

// SQL 쿼리 작성 - review가 NULL이 아닌 행의 닉네임과 리뷰를 가져오기
$sql = "SELECT Nickname, Review FROM user WHERE Review IS NOT NULL";

// 쿼리 실행
$result = $conn->query($sql);

// 쿼리 결과가 있는지 확인 후 출력
$reviews = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
}

// JSON 형식으로 결과 반환
header('Content-Type: application/json');
echo json_encode($reviews);

// MySQL 연결 닫기
$conn->close();
?>
