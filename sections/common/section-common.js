document.addEventListener("DOMContentLoaded", function () {

    /*
     * Load common header
     */
    const headerContainer = document.getElementById("common-header");

    if (headerContainer) {
        fetch("common/header.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load header");
                }
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;
            })
            .catch(error => {
                console.error("Header loading error:", error);
            });
    }


    /*
     * Load common footer
     */
    const footerContainer = document.getElementById("common-footer");

    if (footerContainer) {
        fetch("common/footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load footer");
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => {
                console.error("Footer loading error:", error);
            });
    }


    /*
     * Load common PDF viewer
     */
    const pdfContainer = document.getElementById("pdf-viewer");

    if (pdfContainer) {
        fetch("common/pdf-viewer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Unable to load PDF viewer");
                }
                return response.text();
            })
            .then(html => {
                pdfContainer.innerHTML = html;
            })
            .catch(error => {
                console.error("PDF viewer loading error:", error);
            });
    }

});


/*
 * Open PDF
 */
function loadPDF(title, fileId) {

    if (
        !fileId ||
        fileId === "FILE_LINK" ||
        fileId === "FILE_ID_HERE"
    ) {
        alert("PDF link is not available for this chapter yet.");
        return;
    }

    const modal = document.getElementById("pdfModal");
    const titleElement = document.getElementById("pdfTitle");
    const frame = document.getElementById("pdfFrame");
    const download = document.getElementById("pdfDownload");

    if (!modal || !titleElement || !frame || !download) {
        console.error("PDF viewer elements not loaded.");
        return;
    }

    const previewURL =
        "https://drive.google.com/file/d/" +
        fileId +
        "/preview";

    const downloadURL =
        "https://drive.usercontent.google.com/download?id=" +
        fileId +
        "&export=download";

    titleElement.textContent = title;

    frame.src = previewURL;

    download.href = downloadURL;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/*
 * Close PDF
 */
function closePDF() {

    const modal = document.getElementById("pdfModal");
    const frame = document.getElementById("pdfFrame");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    if (frame) {
        frame.src = "";
    }

    document.body.style.overflow = "";
}


/*
 * Close PDF when clicking outside the viewer
 */
document.addEventListener("click", function (event) {

    const modal = document.getElementById("pdfModal");

    if (
        modal &&
        event.target === modal
    ) {
        closePDF();
    }

});


/*
 * Close PDF with Escape key
 */
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closePDF();
    }

});
