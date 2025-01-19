function generateQRCode() {
    const input = document.getElementById("qrInput").value.trim();
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const actionButtons = document.getElementById("actionButtons");

    if (!input) {
        alert("Please enter text or a URL.");
        return;
    }

    // Show loading spinner
    loadingSpinner.style.display = "block";
    qrCodeContainer.style.display = "none"; // Hide QR code container
    actionButtons.style.display = "none"; // Hide action buttons

    // Clear any previous QR code
    qrCodeContainer.innerHTML = "";

    // Generate QR code after a short delay
    setTimeout(() => {
        // Hide spinner
        loadingSpinner.style.display = "none";

        // Generate QR code using qrcode.js
        new QRCode(qrCodeContainer, {
            text: input,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });

        // Display action buttons
        actionButtons.style.display = "flex";
    }, 1500);
}

function copyQRCode() {
    const qrCodeImage = document.querySelector("#qrCodeContainer img");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = qrCodeImage.width;
    canvas.height = qrCodeImage.height;
    ctx.drawImage(qrCodeImage, 0, 0);

    canvas.toBlob(blob => {
        const data = [new ClipboardItem({ "image/png": blob })];
        navigator.clipboard.write(data).then(() => {
            alert("QR Code copied to clipboard!");
        }).catch(error => {
            alert(`Failed to copy QR code: ${error}`);
        });
    });
}

function downloadQRCode() {
    const qrCodeImage = document.querySelector("#qrCodeContainer img");
    const link = document.createElement("a");
    link.href = qrCodeImage.src;
    link.download = "qr_code.png";
    link.click();
}

// Disable right-click on the page
document.addEventListener("contextmenu", event => event.preventDefault());
