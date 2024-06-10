<?php
// 디비접속
$conn = mysqli_connect('localhost', 'test', '1111', 'testdb', 3307);

// 사용자 입력 값 가져오기
$id = $_POST['user_id'];

// API에서 닉네임 가져오기
function getNickname() {
    $url = 'https://www.rivestsoft.com/nickname/getRandomNickname.ajax';
    $data = array('lang' => 'ko');

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        die('Error fetching nickname');
    }

    $response = json_decode($result, true);
    return $response['data'];
}

// 닉네임 중복 검사 함수
function isNicknameAvailable($conn, $nickname) {
    $sql = "SELECT * FROM User WHERE Nickname = '$nickname'";
    $result = mysqli_query($conn, $sql);
    return mysqli_num_rows($result) == 0; // 중복되지 않으면 true 반환
}

// 닉네임 생성 및 중복 검사
$nickname = getNickname();
while (!isNicknameAvailable($conn, $nickname)) {
    $nickname = getNickname();
}

// SQL 쿼리 생성
$sql = "INSERT INTO User (id, Nickname) VALUES ('$id', '$nickname')";

// 쿼리 실행
if (mysqli_query($conn, $sql)) {
    // 회원가입 성공 시 menu.html 페이지로 이동
    echo "<script>alert('회원가입이 완료되었습니다.');</script>";
    echo "<script>window.location.href = '../html/menu.html';</script>";
} else {
    // 회원가입 실패 시 실패 이유를 알림창에 표시
    echo "<script>alert('회원가입에 실패했습니다. 오류: " . mysqli_error($conn) . "');</script>";
}

// 데이터베이스 연결 해제
mysqli_close($conn);
?>
