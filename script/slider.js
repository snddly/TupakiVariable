function updateSliderValue(sliderId, valueId) {
    const slider = document.getElementById(sliderId);
    const value = document.getElementById(valueId);

    slider.addEventListener('input', () => {
        value.textContent = slider.value;
    });
	
}

updateSliderValue('thrillerSlider', 'thrillerValue');
updateSliderValue('romanceSlider', 'romanceValue');
updateSliderValue('comedySlider', 'comedyValue');
updateSliderValue('actionSlider', 'actionValue');