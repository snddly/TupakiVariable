function update(e) {
    var x = e.clientX;
    var y = e.clientY;
    document.documentElement.style.setProperty('--cX', x + 'px');
    document.documentElement.style.setProperty('--cY', y + 'px');
}

function increaseRadialSize() {
    document.documentElement.style.setProperty('--rSize', '80vmax');
}

function resetRadialSize() {
    document.documentElement.style.setProperty('--rSize', '8vmax');
}

document.addEventListener('mousemove', update);
document.addEventListener('mousedown', increaseRadialSize);
document.addEventListener('mouseup', resetRadialSize);
