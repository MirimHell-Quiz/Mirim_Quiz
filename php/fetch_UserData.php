<?php
// $servername = "localhost";
// $username = "root";
// $password = "1234";
// $dbname = "mysql";

// // 데이터베이스 연결 생성
// $conn = mysqli_connect($servername, $username, $password, $dbname);

$conn = mysqli_connect('localhost', 'test', 'Osb01166', 'testdb');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT id AS Userid, StudentKey AS StudentKey, Nickname AS Nickname, Review AS Review FROM User";
$result = $conn->query($sql);   

$UserData = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $UserData[] = $row;
    }
}

$conn->close();

// JSON으로 변환하여 출력
header('Content-Type: application/json');
echo json_encode($UserData);
?>