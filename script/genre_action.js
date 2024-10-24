window.onload = function () {
    const words = document.querySelectorAll('.word');
    let wordIndex = 0;
    let startTop = 5; // 단어가 시작하는 위치
    let gap = 20; // 단어 간격
    const message = document.getElementById('message');

    // 단어 애니메이션 - 클릭 시
    document.body.addEventListener('click', function () {
        if (wordIndex < words.length) {
            const currentWord = words[wordIndex];

            // 단어의 초기 위치를 설정
            currentWord.style.top = `${startTop + wordIndex * gap}%`; // 각 단어가 서로 다른 위치에서 떨어지게

            // 애니메이션 설정 (위치에서 쿵 떨어짐)
            currentWord.style.animation = `drop 0.8s cubic-bezier(.67,0,.35,1) forwards, shake 0.3s 0.5s ease-in-out forwards`;

            // 애니메이션 후 폰트 설정 변경
            setTimeout(() => {
                currentWord.style.fontVariationSettings = `"RMNC" 0, "CMDY" 0, "ACTN" 1000, "THRL" 0`;
            }, 800); // 애니메이션이 끝난 후 폰트 변경

            wordIndex++;
        }

        // 모든 단어가 떨어지면 처음으로 돌아가게 설정
        if (wordIndex === words.length) {
            setTimeout(resetWords, 2000); // 2초 후 리셋
        }
    });

    // 단어를 리셋하는 함수
    function resetWords() {
        words.forEach(word => {
            word.style.opacity = 0; // 단어 다시 숨김
            word.style.animation = 'none'; // 애니메이션 초기화
        });
        wordIndex = 0; // 인덱스 초기화
    }

    // 마우스가 움직일 때 메시지 숨기기
    document.addEventListener('mousemove', resetMessage);

    // 페이지 로드 후 일정 시간 동안 움직임이 없으면 메시지 표시 (초기 5초)
    let timeout = setTimeout(function () {
        message.classList.remove('hide');
    }, 5000);

    function resetMessage() {
        clearTimeout(timeout);
        message.classList.add('hide');
        timeout = setTimeout(function () {
            message.classList.remove('hide');
        }, 5000);
    }
};
