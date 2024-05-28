<?php
session_start();

// 디비접속
$conn = mysqli_connect('localhost', 'test', '1111', 'testdb', 3307);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 사용자 입력 값 가져오기
    $uname = $_POST['user_name'];
    $ustuid = $_POST['user_stuid'];

    // 입력한 정보와 일치하는 사용자가 있는지 확인
    $sql = "SELECT * FROM hell_login WHERE name = '$uname' AND student_id = '$ustuid'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        // 사용자 정보가 일치하는 경우, 로그인 성공
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $uname;
        // header("Location: welcome.php");  //로그인 후 작동
        echo "<script>alert('로그인에 성공했습니다!');</script>";
    } else {
        // 사용자 정보가 일치하지 않는 경우, 로그인 실패
        echo "<script>alert('로그인에 실패했습니다.');</script>";
    }
}

mysqli_close($conn);
?>
