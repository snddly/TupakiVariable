// 텍스트 요소 선택
const textElement = document.getElementById('dynamic-text');

// 텍스트를 글자 단위로 분리
const originalText = textElement.textContent;
textElement.innerHTML = originalText.split('').map(char => `<span>${char}</span>`).join('');

// 각 글자(span)를 선택
const characters = document.querySelectorAll('#dynamic-text span');

// 마우스 오버 시 폰트 축 값 및 크기 변경 함수
characters.forEach((char, index) => {
    char.addEventListener('mouseover', () => {
        // 현재 글자에 font-variation-settings와 크기 증가 효과 적용
        setFontVariation(index, 1000);
        char.classList.add('expand'); // 호버된 글자 확대

        // 왼쪽 글자는 "ACTN"을 약간 높이고 크기 약간 변화
        if (index > 0) {
            setFontVariation(index - 1, 500);
            characters[index - 1].classList.add('side-expand'); // 좌우 글자 약간 확대
        }

        // 오른쪽 글자는 "ACTN"을 약간 높이고 크기 약간 변화
        if (index < characters.length - 1) {
            setFontVariation(index + 1, 500);
            characters[index + 1].classList.add('side-expand'); // 좌우 글자 약간 확대
        }

        // 나머지 글자는 'shrink' 클래스로 가로 폭을 줄임
        characters.forEach((otherChar, otherIndex) => {
            if (otherIndex !== index && otherIndex !== index - 1 && otherIndex !== index + 1) {
                otherChar.classList.add('shrink');
            }
        });
    });

    char.addEventListener('mouseout', () => {
        // 모든 글자 font-variation-settings 리셋 및 크기 원상태로 복구
        resetFontVariation();
        char.classList.remove('expand'); // 호버된 글자 원상태로 복구

        // 좌우 글자의 side-expand 클래스 제거
        if (index > 0) {
            characters[index - 1].classList.remove('side-expand');
        }
        if (index < characters.length - 1) {
            characters[index + 1].classList.remove('side-expand');
        }

        // 모든 글자에 'shrink' 클래스 제거
        characters.forEach(otherChar => {
            otherChar.classList.remove('shrink');
        });
    });
});

// 글자의 font-variation-settings 값을 변경하는 함수
function setFontVariation(index, actnValue) {
    characters[index].style.fontVariationSettings = `"RMNC" 0, "CMDY" 0, "ACTN" ${actnValue}, "THRL" 0`;
}

// 모든 글자의 font-variation-settings 값을 기본값으로 리셋하는 함수
function resetFontVariation() {
    characters.forEach(char => {
        char.style.fontVariationSettings = `"RMNC" 500, "CMDY" 0, "ACTN" 0, "THRL" 0`;
    });
}
