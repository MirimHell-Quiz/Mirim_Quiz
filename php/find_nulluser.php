<?php
header('Content-Type: application/json');

// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root";
$password = "505015";
$dbname = "testdb";

// 데이터베이스 연결 생성
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Questions 배열
$questions = ['Question1', 'Question2', 'Question3', 'Question4', 'Question5', 'Question6', 'Question7', 'Question8', 'Question9', 'Question10'];

$response = [];

foreach ($questions as $question) {
    $sql = "SELECT id FROM useranswer WHERE $question IS NULL";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $ids = [];
        while ($row = $result->fetch_assoc()) {
            $ids[] = $row["id"];
        }
        $response[$question] = $ids;
    } else {
        $response[$question] = [];
    }
}

// 연결 종료
$conn->close();

echo json_encode(["status" => "success", "data" => $response]);
?>
