const dropzone = document.getElementById('dropzone');
const fileLabel = document.getElementById('fileLabel');
const vectorImage = document.querySelector('.vector-3Jy');

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#2196F3';
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = '#ccc';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#ccc';

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        const filename = files[0].name;
        fileLabel.textContent = `선택한 파일: ${filename}`;

        // 이미지를 변경
        vectorImage.src = './assets/vector-71B.png';
    }
});

// 파일 입력 필드의 변화도 감지
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (e) => {
    const filename = e.target.files[0].name;
    fileLabel.textContent = `선택한 파일: ${filename}`;

    // 이미지를 변경
    vectorImage.src = './assets/vector-71B.png';
});











// tlqkfffffffffffffffffffffff fuck you
const dropzone2 = document.getElementById('dropzoneModified'); // 변경된 ID
const fileLabel2 = document.getElementById('fileLabelModified'); // 변경된 ID
const vectorImage2 = document.querySelector('.vector-XnZ');

dropzone2.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone2.style.borderColor = '#2196F3';
});

dropzone2.addEventListener('dragleave', () => {
    dropzone2.style.borderColor = '#ccc';
});

dropzone2.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone2.style.borderColor = '#ccc';

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        const filename = files[0].name;
        fileLabel2.textContent = `선택한 파일: ${filename}`;

        // 이미지를 변경
        vectorImage2.src = './assets/vector-71B.png';
    }
});

// 파일 입력 필드의 변화도 감지
const fileInput2 = document.getElementById('fileInput');
fileInput2.addEventListener('change', (e) => {
    const filename = e.target.files[0].name;
    fileLabel.textContent = `선택한 파일: ${filename}`;

    // 이미지를 변경
    vectorImage.src = './assets/vector-71B.png';
});