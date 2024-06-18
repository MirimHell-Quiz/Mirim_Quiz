<?php
// 데이터베이스 연결
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

// 클라이언트에서 보낸 데이터 가져오기
$data = json_decode(file_get_contents('php://input'), true);

// JSON 데이터에서 리뷰 및 ID 추출
$review = $conn->real_escape_string($data['review']);
$user_id = $conn->real_escape_string($data['id']); // 문자열로 취급

// 리뷰를 user 테이블의 review 칼럼에 업데이트하는 SQL 쿼리
$sql = "UPDATE user SET review='$review' WHERE Nickname LIKE '$user_id'";

$response = [];
if ($conn->query($sql) === TRUE) {
    $response['status'] = 'success';
    $response['message'] = 'Review updated successfully';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error: ' . $conn->error;
}

// 응답을 JSON 형식으로 변환하여 클라이언트에 반환
header('Content-Type: application/json');
echo json_encode($response);

// 데이터베이스 연결 종료
$conn->close();
?>
