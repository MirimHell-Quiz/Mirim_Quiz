<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "mysql";

// 데이터베이스 연결 생성
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT id AS Answerid, Question1 AS Question1, Question2 AS Question2, Question3 AS Question3, Question4 AS Question4, Question5 AS Question5, Question6 AS Question6, Question7 AS Question7, Question8 AS Question8, Question9 AS Question9, Question10 AS Question10 FROM UserAnswer";
$result = $conn->query($sql);

$answerData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $answerData[] = $row;
    }
}

$conn->close();

// JSON으로 변환하여 출력
header('Content-Type: application/json');
echo json_encode($answerData);
?>