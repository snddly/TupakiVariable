// 검색 조건 드롭다운 토글
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

// 처음에 선택된 검색 옵션을 버튼에 표시
const updateDropdownText = () => {
  const selectedOption = document.querySelector('input[name="searchOption"]:checked').nextSibling.textContent.trim();
  dropdownToggle.textContent = selectedOption;
};

// 드롭다운 열기/닫기
dropdownToggle.addEventListener('click', () => {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// 검색 조건 변경 시, 선택된 조건을 버튼에 표시하고 드롭다운을 닫음
document.querySelectorAll('input[name="searchOption"]').forEach(option => {
  option.addEventListener('change', () => {
    updateDropdownText();  // 선택된 조건을 버튼에 표시
    dropdownMenu.style.display = 'none';  // 드롭다운 자동 닫기
  });
});

// 페이지 로드 시 초기 선택 옵션을 표시
window.onload = updateDropdownText;


// 'Enter' 키를 누르면 검색이 동작
document.getElementById('searchInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// 검색 함수
function performSearch() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchOption = document.querySelector('input[name="searchOption"]:checked').value;

  console.log(`검색어: ${searchInput}, 옵션: ${searchOption}`);
  // 여기에서 검색 로직을 추가하세요 (필터된 데이터 표시 등)
}

// 리셋 버튼 클릭 이벤트
document.getElementById('resetBtn').addEventListener('click', () => {
  // 모든 체크박스를 해제
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
});

// 필터 체크박스 선택 이벤트
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedGenres = Array.from(document.querySelectorAll('.genreFilter:checked')).map(cb => cb.value);
    const selectedCountries = Array.from(document.querySelectorAll('.countryFilter:checked')).map(cb => cb.value);

    console.log(`선택된 장르: ${selectedGenres.join(', ')}`);
    console.log(`선택된 국가: ${selectedCountries.join(', ')}`);
    // 여기에서 필터링된 데이터 표시 로직을 추가하세요
  });
});

// SLIDER 관련 코드 (생략하지 않고 그대로 유지)
const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");

const thumbLeft = document.querySelector(".slider > .thumb.left");
const thumbRight = document.querySelector(".slider > .thumb.right");
const range = document.querySelector(".slider > .range");

const leftValueLabel = document.getElementById("left-value");
const rightValueLabel = document.getElementById("right-value");

const setLeftValue = () => {
  const _this = inputLeft;
  const [min, max] = [parseInt(_this.min), parseInt(_this.max)];

  _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);

  leftValueLabel.textContent = _this.value;

  const percent = ((_this.value - min) / (max - min)) * 100;
  thumbLeft.style.left = percent + "%";
  range.style.left = percent + "%";
};

const setRightValue = () => {
  const _this = inputRight;
  const [min, max] = [parseInt(_this.min), parseInt(_this.max)];

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);

  rightValueLabel.textContent = _this.value;

  const percent = ((_this.value - min) / (max - min)) * 100;
  thumbRight.style.right = 100 - percent + "%";
  range.style.right = 100 - percent + "%";
};

inputLeft.addEventListener("input", setLeftValue);
inputRight.addEventListener("input", setRightValue);

setLeftValue();
setRightValue();

inputLeft.addEventListener('mousedown', () => {
  thumbLeft.style.backgroundColor = '#666666';
  thumbLeft.style.boxShadow = 'inset 0 0 0 3px #ffffff';
  range.style.backgroundColor = '#ffffff';
});

inputLeft.addEventListener('mouseup', () => {
  thumbLeft.style.backgroundColor = '#3d3d3d';
  thumbLeft.style.boxShadow = 'none';
  range.style.backgroundColor = '#484848';
});

inputRight.addEventListener('mousedown', () => {
  thumbRight.style.backgroundColor = '#666666';
  thumbRight.style.boxShadow = 'inset 0 0 0 3px #ffffff';
  range.style.backgroundColor = '#ffffff';
});

inputRight.addEventListener('mouseup', () => {
  thumbRight.style.backgroundColor = '#3d3d3d';
  thumbRight.style.boxShadow = 'none';
  range.style.backgroundColor = '#484848';
});


//여기서부터 필터기능//

// Sample table data structure
const tableData = [
  { title: "hahahamoviename", author: "Me", genre: "Action", country: "USA", year: 2019 },
  { title: "hahahamoviename2", author: "Me2", genre: "Drama", country: "UK", year: 2021 },
  { title: "hahahamoviename3", author: "Me3", genre: "Action", country: "Canada", year: 2018 },
  // More data here...
];

// Function to filter the table data
function filterTable() {
  const searchQuery = document.getElementById('searchBar').value.toLowerCase();
  const searchType = document.getElementById('dropdownToggle').innerText; // Assuming the button text updates on selection
  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked')).map(cb => cb.value);
  const selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked')).map(cb => cb.value);
  const minYear = parseInt(document.getElementById('minYear').value);
  const maxYear = parseInt(document.getElementById('maxYear').value);

  let filteredData = tableData;

  // Search Filter
  if (searchQuery) {
    filteredData = filteredData.filter(item => {
      if (searchType === 'Title Only') {
        return item.title.toLowerCase().includes(searchQuery);
      } else if (searchType === 'Author Only') {
        return item.author.toLowerCase().includes(searchQuery);
      } else if (searchType === 'Title and Author') {
        return item.title.toLowerCase().includes(searchQuery) || item.author.toLowerCase().includes(searchQuery);
      }
      return true; // No filter applied
    });
  }

  // Genre Filter
  if (selectedGenres.length > 0) {
    filteredData = filteredData.filter(item => selectedGenres.includes(item.genre));
  }

  // Country Filter
  if (selectedCountries.length > 0) {
    filteredData = filteredData.filter(item => selectedCountries.includes(item.country));
  }

  // Year Filter
  filteredData = filteredData.filter(item => item.year >= minYear && item.year <= maxYear);

  // Update the table with the filtered data
  updateTable(filteredData);
}

// Function to render the table based on the filtered data
function updateTable(filteredData) {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = ''; // Clear existing rows

  filteredData.forEach(item => {
    const row = `<tr>
                  <td>${item.title}</td>
                  <td>${item.author}</td>
                  <td>${item.genre}</td>
                  <td>${item.country}</td>
                  <td>${item.year}</td>
                </tr>`;
    tableBody.innerHTML += row;
  });
}

// Event listeners for filters
document.getElementById('searchBar').addEventListener('input', filterTable);
document.querySelectorAll('input[name="genre"], input[name="country"]').forEach(cb => {
  cb.addEventListener('change', filterTable);
});
document.getElementById('yearRange').addEventListener('input', filterTable);
