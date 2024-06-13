<?php
session_start();

// 디비 접속
$conn = mysqli_connect('localhost', 'test', '1111', 'testdb', 3307);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 사용자 입력 값 가져오기
    $id = mysqli_real_escape_string($conn, $_POST['user_id']);

    // 입력한 정보와 일치하는 사용자가 있는지 확인
    $sql = "SELECT StudentKey FROM User1 WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        // 사용자 정보가 일치하는 경우, 로그인 성공
        $row = mysqli_fetch_assoc($result);
        $studentKey = $row['StudentKey'];
        
        $_SESSION['loggedin'] = true;
        $_SESSION['userid'] = $id;
        $_SESSION['studentKey'] = $studentKey;
        
        echo "<script>alert('로그인에 성공했습니다!');</script>";
        echo "<script>window.location.href = '../html/menu.html?id=$studentKey';</script>";
    } else {
        // 사용자 정보가 일치하지 않는 경우, 로그인 실패
        echo "<script>alert('로그인에 실패했습니다.');</script>";
    }
}

mysqli_close($conn);
?>
