<?php
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');

// 데이터베이스 연결
// $host='localhost';
// $id='root';
// $pass='505015';
// $db='testdb';

// /* 여기문 진짜 어쩔 수 없어요 includ? 이걸로 쓰면 오류나요.. */

// $conn=mysqli_connect($host,$id,$pass,$db);

$conn = mysqli_connect('localhost', 'root', '505015', 'testdb');

// JSON 데이터 수신
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 수신한 데이터에서 userId와 answers 추출
$userId = $data['userId'];
$answers = $data['answers'];

// SQL 쿼리 생성
$sql = "INSERT INTO UserAnswer (id, Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        Question1 = VALUES(Question1),
        Question2 = VALUES(Question2),
        Question3 = VALUES(Question3),
        Question4 = VALUES(Question4),
        Question5 = VALUES(Question5),
        Question6 = VALUES(Question6),
        Question7 = VALUES(Question7),
        Question8 = VALUES(Question8),
        Question9 = VALUES(Question9),
        Question10 = VALUES(Question10)";

// prepared statement 생성 및 데이터 바인딩
$stmt = $conn->prepare($sql);
$stmt->bind_param("siiiiiiiiii", $userId, $answers[0], $answers[1], $answers[2], $answers[3], $answers[4], $answers[5], $answers[6], $answers[7], $answers[8], $answers[9]);

// 쿼리 실행 및 결과 확인
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Answers saved successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error saving answers: " . $stmt->error]);
}

// statement와 연결 종료
$stmt->close();
$conn->close();
?>