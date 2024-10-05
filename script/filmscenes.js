document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchColumn = document.getElementById('searchColumn');
    const movieTable = document.getElementById('movieTable').getElementsByTagName('tbody')[0];

    searchInput.addEventListener('input', filterMovies);
    searchColumn.addEventListener('change', filterMovies);

    function filterMovies() {
        const searchValue = searchInput.value.toLowerCase();
        const column = searchColumn.value;

        Array.from(movieTable.rows).forEach(row => {
            const title = row.cells[2].textContent.toLowerCase();
            const quotes = row.cells[4].textContent.toLowerCase();

            if (column === 'title' && title.includes(searchValue)) {
                row.style.display = '';
            } else if (column === 'quotes' && quotes.includes(searchValue)) {
                row.style.display = '';
            } else if (column === 'all' && (title.includes(searchValue) || quotes.includes(searchValue))) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Genre and Country filtering
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterByCategory);
    });

    function filterByCategory() {
        const genres = Array.from(document.querySelectorAll('.filter-genre input:checked')).map(input => input.value);
        const countries = Array.from(document.querySelectorAll('.filter-country input:checked')).map(input => input.value);

        Array.from(movieTable.rows).forEach(row => {
            const genre = row.cells[0].textContent;
            const country = row.cells[3].textContent;

            const genreMatch = genres.length === 0 || genres.some(g => genre.includes(g));
            const countryMatch = countries.length === 0 || countries.includes(country);

            if (genreMatch && countryMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Year filtering using noUiSlider
    const yearRangeSlider = document.getElementById('yearRange');
    const yearValue = document.getElementById('yearValue');
    noUiSlider.create(document.getElementById('yearRange'), {
        start: [1960, 2020],  // 초기 슬라이더 값
        connect: true,
        range: {
            'min': 1960,
            'max': 2020
        },
        step: 1,
        // tooltips: true,  // 슬라이더의 현재 값을 툴팁으로 표시
        format: {
            to: value => Math.round(value),  // 소수점 없는 정수로 변환
            from: value => Number(value)
        }
    });

    yearRangeSlider.noUiSlider.on('update', (values, handle) => {
        const minYear = values[0];
        const maxYear = values[1];
        yearValue.textContent = `${minYear} - ${maxYear}`;  // 선택된 연도 범위를 표시
        filterByYear(minYear, maxYear);
    });

    function filterByYear(minYear, maxYear) {
        Array.from(movieTable.rows).forEach(row => {
            const year = parseInt(row.cells[1].textContent, 10);
            if (year >= minYear && year <= maxYear) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Sorting functionality
    document.getElementById('genreHeader').addEventListener('click', () => sortTable(0));
    document.getElementById('yearHeader').addEventListener('click', () => sortTable(1));
    document.getElementById('titleHeader').addEventListener('click', () => sortTable(2));

    function sortTable(columnIndex) {
        const rows = Array.from(movieTable.rows);
        const sortedRows = rows.sort((a, b) => {
            const aValue = a.cells[columnIndex].textContent.toLowerCase();
            const bValue = b.cells[columnIndex].textContent.toLowerCase();
            return aValue.localeCompare(bValue);
        });

        movieTable.innerHTML = '';
        sortedRows.forEach(row => movieTable.appendChild(row));
    }

    // Video playback functionality
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const closeBtn = document.querySelector('.close');

    Array.from(movieTable.rows).forEach((row, index) => {
        row.addEventListener('click', () => {
            videoSource.src = `videos/movie${index + 1}.mp4`; // 영상 파일명을 index를 통해 지정
            videoPlayer.load();
            videoModal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        videoPlayer.pause();
    });

    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            videoPlayer.pause();
        }
    });
});
