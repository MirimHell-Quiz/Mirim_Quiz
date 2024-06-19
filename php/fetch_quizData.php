<?php
// $servername = "localhost";
// $username = "root";
// $password = "1234";
// $dbname = "mysql";

// 데이터베이스 연결 생성
// $conn = mysqli_connect($servername, $username, $password, $dbname);

$conn = mysqli_connect('localhost', 'test', 'Osb01166', 'testdb');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT idx AS id, Question AS problem, Answer1 AS choice1, Answer2 AS choice2, Answer3 AS choice3, Answer4 AS choice4 FROM AddQuiz";
$result = $conn->query($sql);

$quizData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $quizData[] = $row;
    }
}

$conn->close();

// JSON으로 변환하여 출력
header('Content-Type: application/json');
echo json_encode($quizData);
?>
