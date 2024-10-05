// 웹캠 피드 설정
const webcamElement = document.getElementById('webcam');
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    webcamElement.srcObject = stream;
  });

// 폰트 슬라이더 조절 기능
const fontSettingsBtn = document.getElementById('font-settings');
const slidersbox = document.getElementById('slidersbox');

// Font-Genre-Settings 버튼 위에 슬라이더 위치 조정
function positionSlidersBox() {
    const buttonRect = fontSettingsBtn.getBoundingClientRect();
    slidersbox.style.right = `${window.innerWidth - buttonRect.right}px`;  // 버튼의 오른쪽 끝에 맞춤
    slidersbox.style.bottom = `${window.innerHeight - buttonRect.top + 10}px`;  // 버튼의 바로 위로 위치
}

fontSettingsBtn.addEventListener('click', () => {
  positionSlidersBox();
  
  // 슬라이더가 활성화된 상태인지 확인
  if (slidersbox.classList.contains('active')) {
      slidersbox.classList.remove('active'); // 비활성화 (애니메이션이 적용됨)
      setTimeout(() => {
          slidersbox.style.pointerEvents = 'none'; // 슬라이더가 완전히 닫힌 후에 클릭 차단
      }, 300); // 애니메이션 시간과 동일하게 설정
  } else {
      slidersbox.style.pointerEvents = 'auto'; // 슬라이더가 열리면서 클릭 가능하게 설정
      slidersbox.classList.add('active'); // 활성화
  }
});


// Surprise Me 버튼 기능
const surpriseMeBtn = document.getElementById('surprise-me');
const subtitleInput = document.getElementById('subtitle-text');

const randomPhrases = [
  { phrase: "야 4885 너지??", romance: 0, comedy: 100, action: 800, thriller: 400 },
  { phrase: "진실의 방으로.", romance: 0, comedy: 300, action: 1000, thriller: 100 },
  { phrase: "봄에 하자.", romance: 1000, comedy: 800, action: 0, thriller: 0 }
];

surpriseMeBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * randomPhrases.length);
  const randomPhrase = randomPhrases[randomIndex];
  
  subtitleInput.value = randomPhrase.phrase;
  
  romanceSlider.value = randomPhrase.romance;
  comedySlider.value = randomPhrase.comedy;
  actionSlider.value = randomPhrase.action;
  thrillerSlider.value = randomPhrase.thriller;
  
  updateFontVariation();
});

const romanceSlider = document.getElementById('romanceSlider');
const comedySlider = document.getElementById('comedySlider');
const actionSlider = document.getElementById('actionSlider');
const thrillerSlider = document.getElementById('thrillerSlider');

function updateFontVariation() {
  const romance = romanceSlider.value;
  const comedy = comedySlider.value;
  const action = actionSlider.value;
  const thriller = thrillerSlider.value;
  
  subtitleInput.style.fontVariationSettings = 
    `"RMNC" ${romance}, "CMDY" ${comedy}, "ACTN" ${action}, "THRL" ${thriller}`;
  
  // 필터 강도 계산 (임의의 예시)
  const blur = (romance / 1000) * 10; 
  const hueRotate = (comedy / 1000) * 359;
  const saturate = 1 + (comedy / 1000);
  const contrast = 1 + (action / 1000);
  const invert = thriller / 1000; 
  
  webcamElement.style.filter = 
    `blur(${blur}px) hue-rotate(${hueRotate}deg) saturate(${saturate}) contrast(${contrast}) invert(${invert})`;

  }

romanceSlider.addEventListener('input', updateFontVariation);
comedySlider.addEventListener('input', updateFontVariation);
actionSlider.addEventListener('input', updateFontVariation);
thrillerSlider.addEventListener('input', updateFontVariation);

