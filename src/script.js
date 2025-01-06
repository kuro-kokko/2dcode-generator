function generateQR() {
  const text = document.getElementById("textInput").value;
  if (!text) {
    alert("Please enter text");
    return;
  }

  // QR code settings
  const typeNumber = 0;
  const errorCorrectionLevel = "L";
  const qr = qrcode(typeNumber, errorCorrectionLevel);
  qr.addData(text);
  qr.make();

  // Get QR code module information
  const modCount = qr.getModuleCount();
  const cellSize = 5;
  const margin = 20;

  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  const size = modCount * cellSize + margin * 2;
  canvas.width = size;
  canvas.height = size;

  // Set background
  const isTransparent = document.getElementById("transparentBg").checked;
  ctx.fillStyle = isTransparent ? "rgba(0, 0, 0, 0)" : "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  // Draw QR code
  ctx.fillStyle = "#000000";
  for (let row = 0; row < modCount; row++) {
    for (let col = 0; col < modCount; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect(
          col * cellSize + margin,
          row * cellSize + margin,
          cellSize,
          cellSize
        );
      }
    }
  }

  // Display QR code
  const output = document.getElementById("qrOutput");
  output.innerHTML = "";

  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  output.appendChild(img);

  // Add download button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download";
  downloadButton.style.marginTop = "10px";
  downloadButton.onclick = () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = isTransparent ? "2dcode-transparent.png" : "2dcode.png";
    link.click();
  };
  output.appendChild(downloadButton);
}

// Generate QR code on page load
window.onload = generateQR;

// Regenerate QR code when toggle changes
document.addEventListener("DOMContentLoaded", function () {
  const transparentToggle = document.getElementById("transparentBg");
  transparentToggle.addEventListener("change", generateQR);
});
