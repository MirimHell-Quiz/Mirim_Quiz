<?php
$servername = "localhost";
$username = "root";
$password = "505015";
$dbname = "testdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

$sql = "SELECT id, Question, Answer1, Answer2, Answer3, Answer4, NoAnswer1, NoAnswer2, NoAnswer3, NoAnswer4 FROM Quizlist WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(null);
}

$conn->close();
?>
