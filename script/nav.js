// 다이얼 회전 기능
$('#dialNav ul li a').click(function (e) {
  e.preventDefault();

  // 클릭한 버튼의 인덱스를 가져옴
  var index = $(this).parent().index();

  // 각도를 계산하여 다이얼이 회전하도록 설정
  var degreesToRotate = -45 * index;

  // 다이얼 회전 적용
  $('#dialNav').css({
    'transform': 'rotate(' + degreesToRotate + 'deg)',
    'transition': 'transform 0.5s ease-in-out'
  });
});

// 다이얼 숨김 기능
document.getElementById('toggleDial').addEventListener('click', function () {
  const dialContainer = document.getElementById('dialContainer');

  // hidden 클래스를 토글하여 다이얼을 숨김 또는 표시
  if (dialContainer.classList.contains('hidden')) {
    dialContainer.classList.remove('hidden');
    this.innerText = 'Hide Dial';
  } else {
    dialContainer.classList.add('hidden');
    this.innerText = 'Show Dial';
  }
});
