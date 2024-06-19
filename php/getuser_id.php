<?php
header('Content-Type: application/json');

if (isset($_GET['nickname'])) {
    $nickname = $_GET['nickname'];
    // DB 연결
    $conn = new mysqli('localhost', 'root', '505015', 'testdb');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = $conn->prepare("SELECT id FROM user WHERE nickname = ?");
    $sql->bind_param("s", $nickname);
    $sql->execute();
    $result = $sql->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['id' => $row['id']]);
    } else {
        echo json_encode(['error' => 'User not found']);
    }

    $sql->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'No nickname provided']);
}
?>
