

document.addEventListener('DOMContentLoaded', () => {
  try {
    const { ipcRenderer } = require('electron');

    document.getElementById('minimize').addEventListener('click', () => {
      ipcRenderer.send('minimize');
    });

    document.getElementById('close').addEventListener('click', () => {
      ipcRenderer.send('close');
    });


    // 메인 프로세스로부터 신호 받기
    ipcRenderer.on('analysis-complete', (event, data) => {
      const floatValue = parseFloat(data);
      const roundedValue = floatValue.toFixed(2);

      let result;
      if (roundedValue >= 0 && roundedValue < 5) {
        result = '낮음';
      } else if (roundedValue >= 5 && roundedValue < 10) {
        result = '보통';
      } else if (roundedValue >= 10 && roundedValue < 15) {
        result = '높음';
      } else if (roundedValue >= 15 && roundedValue < 20) {
        result = '매우 높음';
      } else {
        result = '표절 가능성 있음';
      }

      resultIndicator.innerText = "[검사 결과] 유사도 " + roundedValue + "% [표절 가능성: "  + result + "]";
      resultIndicator.classList.add("abled");
      analyze.innerText = "분석"
      analyze.classList.add("abled");
    })

    ipcRenderer.on('analysis-error', (event, data) => {
      resultIndicator.innerText = "실행에 오류가 발생하였습니다. 재시작해주세요.";
      resultIndicator.classList.add("abled");
      analyze.innerText = "분석"
      analyze.classList.add("abled");
    })
  } catch (error) {
    console.log('not electron');
  }
  

  const fileZone1 = document.getElementById("file-zone-1");
  const fileZone2 = document.getElementById("file-zone-2");
  const grdBar = document.getElementById("synth-indicator");
  const analyze = document.getElementById("analyze");
  const resultIndicator = document.getElementById("result-indicator");

  let filePath1 = '';
  let filePath2 = '';

  fileZone1.addEventListener("click", () => {
    openFileExplorer(fileZone1);
  });

  fileZone2.addEventListener("click", () => {
    openFileExplorer(fileZone2);
  });

  fileZone1.addEventListener("dragover", (event) => {
    handleDragOver(event);
  });

  fileZone2.addEventListener("dragover", (event) => {
    handleDragOver(event);
  });

  fileZone1.addEventListener("drop", (event) => {
    handleDrop(event, fileZone1);
  });

  fileZone2.addEventListener("drop", (event) => {
    handleDrop(event, fileZone2);
  });

  analyze.addEventListener("click", (event) => {
    if(analyze.classList.contains("abled")) {
      try {
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('start-analyze', filePath1, filePath2);
        console.log("분석 시작 신호 전달 완료");
        analyze.classList.remove("abled");
        resultIndicator.classList.remove("abled");
        analyze.innerText = "분석 중.."
      } catch (error) {
        console.log("not electron");
      }
    }
  });

  const deleteButton1 = fileZone1.querySelector(".delete");
  const deleteButton2 = fileZone2.querySelector(".delete");

  deleteButton1.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop event propagation
    clearFileZone(fileZone1);
  });

  deleteButton2.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop event propagation
    clearFileZone(fileZone2);
  });

  function openFileExplorer(fileZone) {
    // Create an input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*"; // Optional: Limit file selection to audio files

    // Trigger click event on the input element
    input.click();

    // Listen for the file input change event
    input.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        updateFileZone(fileZone, selectedFile.name);
        updateFilePath(fileZone, selectedFile);
      }
    });
  }

  function updateFileZone(fileZone, fileName) {
    fileZone.classList.add("abled");
    updateSelectedFileText(fileZone, fileName);
    updateGrdBar();
  }

  function updateFilePath(fileZone, fileObject) {
    switch (fileZone.id) {
      case "file-zone-1":
        filePath1 = fileObject.path;
        break;
      case "file-zone-2":
        filePath2 = fileObject.path;
        break;
      default:
        break;
    }

    console.log(fileObject.path);
    console.log(filePath1);
    console.log(filePath2);
  }

  function clearFileZone(fileZone) {
    fileZone.classList.remove("abled");
    updateSelectedFileText(fileZone, "선택된 파일: ");
    updateGrdBar();
  }

  function updateSelectedFileText(fileZone, fileName) {
    const textElement = fileZone.querySelector(".abled-text");
    textElement.textContent = `선택된 파일: ${fileName}`;
  }

  function updateGrdBar() {
    grdBar.style = getGrdCode(fileZone1.classList.contains("abled"), fileZone2.classList.contains("abled"))

    if(fileZone1.classList.contains("abled") && fileZone2.classList.contains("abled")) {
      analyze.classList.add("abled");
    } else {
      analyze.classList.remove("abled");
    }

    function getGrdCode(is1Abled, is2Abled) {
      let a;
      let b;
      if(is1Abled) {a = "var(--primary-color)"} else {a = "var(--light-gray)"}
      if(is2Abled) {b = "var(--primary-color)"} else {b = "var(--light-gray)"}
      return `background-image: linear-gradient(var(--background), var(--background)), linear-gradient(to right, ${a} 0%,  ${b} 100%);`
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(event, fileZone) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const selectedFile = files[0];
      if(selectedFile.type.startsWith("audio/")) {
        updateFileZone(fileZone, selectedFile.name);
        updateFilePath(fileZone, selectedFile);
      } else {
        showError('오디오 파일이 아닙니다.');
      }
      
    }
  }

  function showError(message) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;
  
    document.body.appendChild(errorMessage);
  
    setTimeout(() => {
      errorMessage.style.display = "none";
      document.body.removeChild(errorMessage);
    }, 3000);
  }
});