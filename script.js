let qrContentInput = document.getElementById("qr-content");
let qrGenerationForm = document.getElementById("qr-generation-form");
let qrCodeContainer = document.getElementById("qr-code");
let qrCode;
let copyButton, downloadButton;

// Function to generate QR code
function generateQrCode(qrContent) {
    // Clear any existing QR code
    qrCodeContainer.innerHTML = "";
    
    // Generate new QR code
    qrCode = new QRCode("qr-code", {
        text: qrContent,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });

    // Show the action buttons after QR code is generated
    showActionButtons();
}

// Function to show action buttons (copy and download)
function showActionButtons() {
    if (!copyButton) {
        // Create copy button
        copyButton = document.createElement("button");
        copyButton.textContent = "Copy QR Code";
        copyButton.onclick = copyQRCode;
        qrCodeContainer.appendChild(copyButton);
    }

    if (!downloadButton) {
        // Create download button
        downloadButton = document.createElement("button");
        downloadButton.textContent = "Download QR Code";
        downloadButton.onclick = downloadQRCode;
        qrCodeContainer.appendChild(downloadButton);
    }

    copyButton.style.display = "inline-block";
    downloadButton.style.display = "inline-block";
}

// Function to copy the QR code to the clipboard
function copyQRCode() {
    const qrCodeImage = qrCodeContainer.querySelector("img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the canvas size to the QR code size
    canvas.width = qrCodeImage.width;
    canvas.height = qrCodeImage.height;
    ctx.drawImage(qrCodeImage, 0, 0);

    // Copy the canvas content to clipboard as an image
    canvas.toBlob(blob => {
        const data = [new ClipboardItem({ "image/png": blob })];
        navigator.clipboard.write(data).then(() => {
            alert("QR Code copied to clipboard!");
        }).catch(error => {
            alert(`Failed to copy QR code: ${error}`);
        });
    });
}

// Function to download the QR code as a PNG file
function downloadQRCode() {
    const qrCodeImage = qrCodeContainer.querySelector("img");
    const link = document.createElement("a");
    link.href = qrCodeImage.src;
    link.download = "qr_code.png";
    link.click();
}

// Event listener for form submit event
qrGenerationForm.addEventListener("submit", function (event) {
    // Prevent form submission
    event.preventDefault();
    let qrContent = qrContentInput.value;
    if (qrCode == null) {
        // Generate code initially
        generateQrCode(qrContent);
    } else {
        // If code already generated then make again using same object
        qrCode.makeCode(qrContent);
    }
});
