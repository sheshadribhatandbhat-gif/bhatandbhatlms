document.addEventListener("DOMContentLoaded", async function () {

    /* -----------------------------
       COMMON HEADER
    ----------------------------- */

    const headerContainer =
        document.getElementById("common-header");

    if (headerContainer) {

        try {

            const response =
                await fetch("../common/header.html");

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


    /* -----------------------------
       COMMON FOOTER
    ----------------------------- */

    const footerContainer =
        document.getElementById("common-footer");

    if (footerContainer) {

        try {

            const response =
                await fetch("../common/footer.html");

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


    /* -----------------------------
       PDF VIEWER
    ----------------------------- */

    const pdfContainer =
        document.getElementById("pdf-viewer");

    if (pdfContainer) {

        pdfContainer.innerHTML = `
            <div class="pdf-modal" id="pdfModal">

                <div class="pdf-window">

                    <div class="pdf-header">

                        <div
                            class="pdf-title"
                            id="pdfTitle"
                        >
                            PDF Preview
                        </div>

                        <div class="pdf-actions">

                            <a
                                id="pdfDownload"
                                class="pdf-download"
                                href="#"
                                target="_blank"
                                rel="noopener"
                            >
                                Download PDF
                            </a>

                            <button
                                type="button"
                                class="pdf-close"
                                onclick="closePDF()"
                                aria-label="Close PDF"
                            >
                                ×
                            </button>

                        </div>

                    </div>

                    <div class="pdf-body">

                        <iframe
                            id="pdfFrame"
                            class="pdf-frame"
                            title="PDF Preview"
                        ></iframe>

                    </div>

                </div>

            </div>
        `;

    }

});


/* -----------------------------
   OPEN PDF
----------------------------- */

function loadPDF(title, fileId) {

    if (
        !fileId ||
        fileId === "FILE_ID_HERE" ||
        fileId === "FILE_LINK"
    ) {

        alert(
            "PDF link is not available yet."
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


    if (
        !modal ||
        !titleElement ||
        !frame ||
        !download
    ) {

        alert(
            "PDF viewer is still loading. Please try again."
        );

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


/* -----------------------------
   CLOSE PDF
----------------------------- */

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


/* -----------------------------
   CLOSE ON BACKDROP
----------------------------- */

document.addEventListener("click", function (event) {

    const modal =
        document.getElementById("pdfModal");

    if (
        modal &&
        event.target === modal
    ) {

        closePDF();

    }

});


/* -----------------------------
   ESC KEY
----------------------------- */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closePDF();

    }

});
