const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
let menuOpen = false;

// 메뉴 아이콘 클릭 시 메뉴 열기/닫기
menuIcon.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menu.classList.toggle('open', menuOpen);
  menuIcon.classList.toggle('open', menuOpen);
});

// 메뉴 외부 클릭 시 메뉴 닫기
document.addEventListener('click', (e) => {
  // 메뉴 아이콘과 메뉴 자체를 제외한 영역을 클릭했을 때 메뉴를 닫음
  if (menuOpen && !menu.contains(e.target) && !menuIcon.contains(e.target)) {
    menuOpen = false;
    menu.classList.remove('open');
    menuIcon.classList.remove('open');
  }
});