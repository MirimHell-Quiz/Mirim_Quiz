<?php
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');

// 데이터베이스 연결
$host='localhost';
$id='root';
$pass='505015';
$db='testdb';

/* 여기문 진짜 어쩔 수 없어요 includ? 이걸로 쓰면 오류나요.. */

$conn=mysqli_connect($host,$id,$pass,$db);


// JSON 형식으로 데이터를 받음
$input = json_decode(file_get_contents('php://input'), true);
$userId = $input['userId'];
$answers = $input['answers'];

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// INSERT 쿼리 작성
$sql = "INSERT INTO UserAnswer (id, Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("siiiiiiiiii", 
    $userId, 
    $answers['Question1'], 
    $answers['Question2'], 
    $answers['Question3'], 
    $answers['Question4'], 
    $answers['Question5'], 
    $answers['Question6'], 
    $answers['Question7'], 
    $answers['Question8'], 
    $answers['Question9'], 
    $answers['Question10']
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>