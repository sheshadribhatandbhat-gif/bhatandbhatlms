document.addEventListener("DOMContentLoaded", async function () {

    /*
     * ================================
     * LOAD COMMON HEADER
     * ================================
     */

    const headerContainer =
        document.getElementById("common-header");

    if (headerContainer) {

        try {

            const response =
                await fetch("common/header.html");

            if (!response.ok) {
                throw new Error("Header could not be loaded");
            }

            headerContainer.innerHTML =
                await response.text();

        } catch (error) {

            console.error(
                "Header loading error:",
                error
            );

        }

    }


    /*
     * ================================
     * LOAD COMMON FOOTER
     * ================================
     */

    const footerContainer =
        document.getElementById("common-footer");

    if (footerContainer) {

        try {

            const response =
                await fetch("common/footer.html");

            if (!response.ok) {
                throw new Error("Footer could not be loaded");
            }

            footerContainer.innerHTML =
                await response.text();

        } catch (error) {

            console.error(
                "Footer loading error:",
                error
            );

        }

    }


    /*
     * ================================
     * LOAD PDF VIEWER
     * ================================
     */

    const pdfContainer =
        document.getElementById("pdf-viewer");

    if (pdfContainer) {

        try {

            const response =
                await fetch("common/pdf-viewer.html");

            if (!response.ok) {
                throw new Error("PDF viewer could not be loaded");
            }

            pdfContainer.innerHTML =
                await response.text();

        } catch (error) {

            console.error(
                "PDF viewer loading error:",
                error
            );

        }

    }

});


/*
 * ==========================================
 * OPEN PDF
 * ==========================================
 */

function loadPDF(title, fileId) {

    /*
     * Prevent placeholder links from opening
     */

    if (
        !fileId ||
        fileId === "FILE_LINK" ||
        fileId === "FILE_ID_HERE"
    ) {

        alert(
            "PDF link is not available for this chapter yet."
        );

        return;
    }


    const modal =
        document.getElementById("pdfModal");

    const titleElement =
        document.getElementById("pdfTitle");

    const frame =
        document.getElementById("pdfFrame");

    const download =
        document.getElementById("pdfDownload");


    /*
     * Check whether PDF viewer loaded
     */

    if (
        !modal ||
        !titleElement ||
        !frame ||
        !download
    ) {

        console.error(
            "PDF viewer has not loaded yet."
        );

        alert(
            "PDF viewer is still loading. Please try again."
        );

        return;
    }


    /*
     * Google Drive preview
     */

    const previewURL =
        "https://drive.google.com/file/" +
        fileId +
        "/preview";


    /*
     * Google Drive download
     */

    const downloadURL =
        "https://drive.google.com/uc?export=download&id=" +
        fileId;


    /*
     * Set PDF information
     */

    titleElement.textContent = title;

    frame.src = previewURL;

    download.href = downloadURL;


    /*
     * Show modal
     */

    modal.classList.add("active");

    document.body.classList.add("pdf-open");

}


/*
 * ==========================================
 * CLOSE PDF
 * ==========================================
 */

function closePDF() {

    const modal =
        document.getElementById("pdfModal");

    const frame =
        document.getElementById("pdfFrame");


    if (modal) {
        modal.classList.remove("active");
    }


    if (frame) {
        frame.src = "";
    }


    document.body.classList.remove("pdf-open");

}


/*
 * ==========================================
 * CLOSE WHEN CLICKING OUTSIDE
 * ==========================================
 */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("pdfModal");

        if (
            modal &&
            event.target === modal
        ) {
            closePDF();
        }

    }
);


/*
 * ==========================================
 * ESC KEY
 * ==========================================
 */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closePDF();
        }

    }
);
