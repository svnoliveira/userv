export const handleLabels = () => {
  const inputs = document.querySelectorAll(
    ".supplier__register input, .supplier__register select"
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.previousElementSibling.style.visibility = "visible";
    });
    input.addEventListener("blur", () => {
      input.previousElementSibling.style.visibility = "hidden";
    });
  });
};

export const handleFileDrop = () => {
  const setupDragAndDrop = (area, input) => {
    const dropArea = document.getElementById(area);
    const image = document.querySelector(`#${area} img`);
    const text = document.querySelectorAll(`#${area} p`);
    const firstLine = text[0];
    const secondLine = text[1];

    dropArea.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropArea.classList.add("drag-over");
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("drag-over");
    });

    dropArea.addEventListener("drop", (event) => {
      event.preventDefault();
      dropArea.classList.remove("drag-over");

      const files = event.dataTransfer.files;
      // console.log(files.item(0).name)
      document.getElementById(input).files = files;
      image.src = "../src/image/icons/success.svg";
      firstLine.style.display = 'none';
      secondLine.innerText = files.item(0).name;
    });
  };
  setupDragAndDrop("custom-file-upload", "supplier__fileInput");
  setupDragAndDrop("custom-doc-upload", "supplier__docInput");
};
