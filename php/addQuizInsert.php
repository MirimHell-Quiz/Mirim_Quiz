<?php

error_reporting( E_ALL );
ini_set( "display_errors", 1 );

// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "mysql";


// 데이터베이스 연결 생성
$conn = mysqli_connect($servername, $username, $password, $dbname);
if($conn) {
    echo "success";x
}
else {
    echo "fail";
}

// POST로 전송된 데이터 받기
$student_id = $_POST['student_id']; // 학생 ID
$question = $_POST['question']; // 질문
$option1 = $_POST['option1']; // 옵션 1
$option2 = $_POST['option2']; // 옵션 2
$option3 = $_POST['option3']; // 옵션 3
$option4 = $_POST['option4']; // 옵션 4

// SQL 쿼리 생성하여 실행
$sql = "INSERT INTO more_quiz (Student_ID, Question, Option1, Option2, Option3, Option4, Confirm) VALUES ('$student_id', '$question', '$option1', '$option2', '$option3', '$option4', '0')";
if (mysqli_query($conn, $sql)) {
    echo "<script>alert('등록되었습니다');</script>";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

?>
<meta http-equiv='refresh' content='0;url=index.html'>