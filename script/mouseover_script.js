// JavaScript 코드
let domRoot = document.documentElement;
let inputField = document.querySelector('.heading');
let isAnimationOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

let heading = document.querySelector('.heading');

let screen = {
  width: heading.clientWidth,
  height: heading.clientHeight
};

window.addEventListener("resize", () => {
  screen.width = heading.clientWidth;
  screen.height = heading.clientHeight;
});

let mouse = {
  x: 0,
  y: 0
};

let maxReach = 0.8;

if (isAnimationOk) {
  window.addEventListener("mousemove", debounce(function (e) {
    setMouseCoords(e);
    animateText();
  }, 5));
}

function setMouseCoords(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

function animateText() {
  let rect = heading.getBoundingClientRect();
  let xAdj = Math.min((mouse.x - rect.left) / (rect.width * maxReach), 1);
  let yAdj = Math.min((mouse.y - rect.top) / (rect.height * maxReach), 1);

  let rmnc = 1000 * (1 - xAdj) * (1 - yAdj);
  let cmdy = 1000 * xAdj * yAdj;
  let actn = 1000 * xAdj * (1 - yAdj);
  let thrl = 1000 * (1 - xAdj) * yAdj;

  domRoot.style.setProperty("--fontRMNC", rmnc);
  domRoot.style.setProperty("--fontCMDY", cmdy);
  domRoot.style.setProperty("--fontACTN", actn);
  domRoot.style.setProperty("--fontTHRL", thrl);
}

function debounce(func, delay, immediate) {
  let timeout;

  return function executedFunction() {
    let context = this;
    let args = arguments;

    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) func.apply(context, args);
  };
}

// 색상 조합 배열
let colorCombinations = [
  { backgroundColor: "#000000", textColor: "#ffffff" },
  { backgroundColor: "#5B1015", textColor: "#FA8AB2" },
  { backgroundColor: "#12C4E0", textColor: "#FFD900" },
  { backgroundColor: "#FFE23E", textColor: "#762900" },
  { backgroundColor: "#2D0C53", textColor: "#81FF92" }
];

// 랜덤 색상 조합 선택
let randomIndex = Math.floor(Math.random() * colorCombinations.length);
let selectedCombination = colorCombinations[randomIndex];

// 선택된 색상 조합을 적용
document.body.style.backgroundColor = selectedCombination.backgroundColor;
inputField.style.color = selectedCombination.textColor;

// 초기 글자 크기 설정
adjustFontSize();

// 글자 길이에 따른 글자 크기 조정
inputField.addEventListener('input', () => {
  adjustFontSize();
});

function adjustFontSize() {
  let textLength = inputField.value.length;
  let newFontSize = Math.max(15, 300 - textLength * 3); // 글자 길이에 따라 크기 조정 ->250 수치에서 변형하면 글자크기 변경 가능(최대크기 바꾸기)
  inputField.style.fontSize = `${newFontSize}px`;

  // 글자가 박스 내에서 잘리지 않도록 높이 자동 조정
  inputField.style.height = 'auto'; 
  inputField.style.height = `${inputField.scrollHeight}px`;
}

let timeout; // 타이머를 저장할 변수

// 마우스 움직임이 있을 때 실행되는 함수
function resetMessage() {
  const message = document.getElementById('message');
  message.classList.add('hide'); // 메시지 숨기기
  clearTimeout(timeout); // 기존 타이머 초기화

  // 일정 시간이 지나면 메시지가 다시 나타나게 설정 (예: 5초 후)
  timeout = setTimeout(function() {
    message.classList.remove('hide');
  }, 5000);
}

// 페이지 로드 시 초기 설정
window.onload = function() {
  const message = document.getElementById('message');

  // 마우스가 움직일 때마다 메시지 숨기고 타이머 재설정
  document.addEventListener('mousemove', resetMessage);

  // 페이지 로드 후 일정 시간 동안 움직임이 없으면 메시지 표시 (초기 5초)
  timeout = setTimeout(function() {
    message.classList.remove('hide');
  }, 5000);
};
