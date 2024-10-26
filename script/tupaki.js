const textInput = document.getElementById('text-input');
const outputs = [
    document.getElementById('output1'),
    document.getElementById('output2'),
    document.getElementById('output3'),
    document.getElementById('output4'),
    document.getElementById('output5')
];
const fontSizeBtn = document.querySelector('.buttons button:first-child'); // Font-size button
const bgTextColorBtn = document.querySelector('.buttons button:last-child'); // bg/text color button
const useContainer = document.querySelector('.use_container');
const controls = document.querySelector('.controls');
const fontsizebtn = document.getElementById('fontsizebtn');
const colorbtn = document.getElementById('colorbtn');

let fontSizeIndex = 0;
const fontSizes = ['3rem', '.3.5rem', '4rem', '6rem'];
const fontSizeMultipliers = ['× 1', '× 1.2', '× 1.5', '× 2']; // 배율 표시를 위한 배열

const bgTextCombinations = [
    { background: '#5B1015', color: '#FA8AB2', borderColor: '#FA8AB2' },  // Black background, white text
    { background: '#12C4E0', color: '#FFD900', borderColor: '#FFD900' },  // White background, black text
    { background: '#FFE23E', color: '#762900', borderColor: '#762900' },  // Dark background, red text
    { background: '#2D0C53', color: '#81FF92', borderColor: '#81FF92' }, // Beige background, dark text
    { background: '#ffffff00', color: '#ffffff', borderColor: '#ffffff' }
];
let bgTextIndex = 0;

// Update the output texts when typing in the input box
textInput.addEventListener('input', () => {
    outputs.forEach(output => {
        output.textContent = textInput.value || '투파키 배리어블';
    });
});

// Adjust font size: cycle through 1rem, 1.2rem, 1.5rem, 2rem, and back to 1rem
function adjustFontSize() {
    fontSizeIndex = (fontSizeIndex + 1) % fontSizes.length;
    outputs.forEach(output => {
        output.style.fontSize = fontSizes[fontSizeIndex];
    });
    fontSizeBtn.textContent = `${fontSizeMultipliers[fontSizeIndex]}`;
}

// Change background and text color
function changeBgTextColor() {
    bgTextIndex = (bgTextIndex + 1) % bgTextCombinations.length;
    const { background, color, borderColor } = bgTextCombinations[bgTextIndex];
    useContainer.style.backgroundColor = background;
    useContainer.style.color = color;
    useContainer.style.borderColor = borderColor;
    controls.style.color = color;
    controls.style.borderColor = borderColor;
    textInput.style.color = color;
    textInput.style.borderColor = borderColor;
    fontsizebtn.style.color = color;
    fontsizebtn.style.borderColor = borderColor;
    colorbtn.style.color = color;
    colorbtn.style.borderColor = borderColor;
}





// 팝업창 및 버튼 요소 가져오기
const playButton = document.getElementById('playVideoBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const video = document.getElementById('video');

// 유튜브 영상 링크
const videoUrl = "https://www.youtube.com/embed/y6Df6kdwj0g?si=Ps6TZcE9QzUYQIld";  // 여기에 유튜브 영상 ID를 입력하세요

// 버튼 클릭 시 팝업을 열고 영상 재생
playButton.onclick = function () {
    video.src = videoUrl;
    popup.style.display = 'block';
};

// 팝업창 닫기 버튼 클릭 시
closePopup.onclick = function () {
    popup.style.display = 'none';
    video.src = '';  // 재생 중지
};

// 팝업창을 드래그로 이동할 수 있게 처리
let isDragging = false;
let offsetX, offsetY;

popup.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        popup.style.left = e.clientX - offsetX + 'px';
        popup.style.top = e.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});




//글리프 미리보기
function updatePreview(letter) {
    document.getElementById('glyphpreview-text').textContent = letter;
}

document.addEventListener('DOMContentLoaded', () => {
    // 처음 화면에서 Regular 체크박스를 선택 상태로 유지
    document.getElementById('regular').checked = true;

    // 모든 체크박스에 대해 이벤트 리스너 추가
    const checkboxes = document.querySelectorAll('.glyph-controls input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
            handleCheckboxClick(event, checkboxes);
        });
    });
});

function handleCheckboxClick(event, checkboxes) {
    checkboxes.forEach(checkbox => {
        if (checkbox !== event.target) {
            checkbox.checked = false;
        }
    });

    const selectedCheckbox = event.target;

    if (selectedCheckbox.checked) {
        toggleFontVariation('RMNC', fontStyle === 'ROMANCE' ? 1000 : 0);
        toggleFontVariation('CMDY', fontStyle === 'COMEDY' ? 1000 : 0);
        toggleFontVariation('ACTN', fontStyle === 'ACTION' ? 1000 : 0);
        toggleFontVariation('THRL', fontStyle === 'THRILLER' ? 1000 : 0);
    } else {
        toggleFontVariation(fontStyle, 0);  // 폰트 변형 초기화
    }
}


function toggleFontVariation(axis, value) {
    const textElement = document.getElementById('glyphpreview-text');
    const glyphElements = document.querySelectorAll('.glyph');

    textElement.style.fontVariationSettings = `"${axis}" ${value}`;
    glyphElements.forEach(glyph => {
        glyph.style.fontVariationSettings = `"${axis}" ${value}`;
    });
}
