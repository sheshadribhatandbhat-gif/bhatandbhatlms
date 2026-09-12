document.addEventListener("DOMContentLoaded", async function () {

    // Load common header
    const headerContainer = document.getElementById("common-header");

    if (headerContainer) {
        try {
            const response = await fetch("../common/header.html");

            if (!response.ok) {
                throw new Error("Header could not be loaded");
            }

            headerContainer.innerHTML = await response.text();

        } catch (error) {
            console.error("Header loading error:", error);
        }
    }


    // Load common footer
    const footerContainer = document.getElementById("common-footer");

    if (footerContainer) {
        try {
            const response = await fetch("../common/footer.html");

            if (!response.ok) {
                throw new Error("Footer could not be loaded");
            }

            footerContainer.innerHTML = await response.text();

        } catch (error) {
            console.error("Footer loading error:", error);
        }
    }


    // Load PDF viewer
    const pdfContainer = document.getElementById("pdf-viewer");

    if (pdfContainer) {
        try {
            const response = await fetch("../common/pdf-viewer.html");

            if (!response.ok) {
                throw new Error("PDF viewer could not be loaded");
            }

            pdfContainer.innerHTML = await response.text();

        } catch (error) {
            console.error("PDF viewer loading error:", error);
        }
    }

});


// Open PDF
function loadPDF(title, fileId) {

    if (
        !fileId ||
        fileId === "FILE_LINK" ||
        fileId === "FILE_ID_HERE"
    ) {
        alert("Question paper link is not available yet.");
        return;
    }

    const modal = document.getElementById("pdfModal");
    const titleElement = document.getElementById("pdfTitle");
    const frame = document.getElementById("pdfFrame");
    const download = document.getElementById("pdfDownload");

    if (!modal || !titleElement || !frame || !download) {
        alert("PDF viewer is still loading. Please try again.");
        return;
    }


    const previewURL =
        "https://drive.google.com/file/d/" +
        fileId +
        "/preview";

    const downloadURL =
        "https://drive.google.com/uc?export=download&id=" +
        encodeURIComponent(fileId);


    titleElement.textContent = title;

    download.href = downloadURL;

    frame.src = previewURL;

    modal.classList.add("active");

    document.body.classList.add("pdf-open");
}


// Close PDF
function closePDF() {

    const modal = document.getElementById("pdfModal");
    const frame = document.getElementById("pdfFrame");

    if (modal) {
        modal.classList.remove("active");
    }

    if (frame) {
        frame.src = "";
    }

    document.body.classList.remove("pdf-open");
}


// Close when clicking outside PDF window
document.addEventListener("click", function (event) {

    const modal = document.getElementById("pdfModal");

    if (modal && event.target === modal) {
        closePDF();
    }

});


// Close with Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closePDF();
    }

});
