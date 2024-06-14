<?php
$conn = mysqli_connect('localhost', 'root', '505015', 'testdb');

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT id AS Answerid, Question1, Question2, Question3, Question4, Question5, Question6, Question7, Question8, Question9, Question10 FROM UserAnswer";
$result = $conn->query($sql);

$answerData = array();
$nullFields = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $answerData[] = $row;
        foreach ($row as $key => $value) {
            if (is_null($value)) {
                $nullFields[] = array('id' => $row['Answerid'], 'field' => $key);
            }
        }
    }
}

$conn->close();

if (!empty($nullFields)) {
    // null 값이 있는 경우 다른 페이지로 리디렉션
    $nullFieldsEncoded = urlencode(json_encode($nullFields));
    header("Location: http://localhost/mirim/html/test.html?nullFields=$nullFieldsEncoded");
    exit();
}

// JSON으로 변환하여 출력
header('Content-Type: application/json');
echo json_encode($answerData);
?>
