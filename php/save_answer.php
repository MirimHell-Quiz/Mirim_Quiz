<?php
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');

// 데이터베이스 연결
$conn = mysqli_connect('localhost', 'root', '505015', 'testdb');

// 연결 확인
if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Failed to connect to database: " . mysqli_connect_error()]));
}

// JSON 데이터 수신
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 데이터 확인
if (is_null($data) || !isset($data['userId']) || !isset($data['answers'])) {
    die(json_encode(["status" => "error", "message" => "Invalid data received", "received_data" => $data]));
}

// 수신한 데이터에서 userId와 answers 추출
$userId = $data['userId'];
$answers = $data['answers'];

// 디버그: 추출한 데이터 출력
error_log("Received User ID: " . $userId);
error_log("Received Answers: " . json_encode($answers));

// Answers 배열에서 10개의 값을 추출하고, 부족한 경우 null로 채움
$answerValues = array_pad($answers, 10, null);

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

// Prepared statement가 생성되지 않은 경우 오류 메시지 반환
if (!$stmt) {
    die(json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]));
}

// 데이터 바인딩 시, 해당 배열 요소를 하나씩 사용하여 바인딩
$stmt->bind_param("siiiiiiiiii", 
    $userId, 
    $answerValues[0], 
    $answerValues[1], 
    $answerValues[2], 
    $answerValues[3], 
    $answerValues[4], 
    $answerValues[5], 
    $answerValues[6], 
    $answerValues[7], 
    $answerValues[8], 
    $answerValues[9]
);

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
