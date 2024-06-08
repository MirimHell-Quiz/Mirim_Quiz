<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "mysql";


// 데이터베이스 연결 생성
$conn = mysqli_connect($servername, $username, $password, $dbname);
if($conn) {
    echo "success";
}
else {
    echo "fail";
}

$sql = "SELECT auto_increment AS id, Question AS problem, Answer1 AS choice1, Answer2 AS choice2, Answer3 AS choice3, Answer4 AS choice4 FROM AddQuiz";
$result = $conn->query($sql);

$quizData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $quizData[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($quizData);
?>