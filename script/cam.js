// 웹캠 설정
const webcamElement = document.getElementById('webcam');
const overlayTextInput = document.getElementById('overlayText');

// 웹캠 연결
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    webcamElement.srcObject = stream;
  })
  .catch(function(err) {
    console.error('Error accessing webcam: ', err);
  });
