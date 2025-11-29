/**
 * PDF Generation Logic
 */

function generatePDF(templateName) {
    const element = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-btn');

    // Show loading state
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
    downloadBtn.disabled = true;

    // Options for html2pdf
    const opt = {
        margin: 0,
        filename: `Resume_${templateName}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Reset button state
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error('PDF Generation Error:', err);
        alert('Failed to generate PDF. Please try again.');
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    });
}

function generateWord(templateName) {
    const element = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-word-btn');
    const originalText = downloadBtn.innerHTML;

    downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    downloadBtn.disabled = true;

    // Get the HTML content
    const content = element.innerHTML;

    // Create a complete HTML document with styles for Word
    // We need to inline some critical styles or include the style block
    // For simplicity and robustness in this context, we'll include the relevant CSS text
    // Note: Word doesn't support all CSS (like flexbox/grid) perfectly, but it does a decent job with basic layouts.
    // Since our templates use flexbox, we might need a specific "print" or "word" stylesheet, 
    // but for now we will try to dump the current styles.

    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Resume</title>
    <style>
        body { font-family: sans-serif; }
        /* Basic reset for Word */
        * { box-sizing: border-box; }
        /* We can try to fetch the content of style.css, but for now let's add some basic inline styles to the elements before exporting or just rely on what Word parses */
        /* Word handles tables better than divs for layout, but let's see how it handles the current div soup */
        .resume-preview { width: 100%; max-width: 210mm; margin: 0 auto; }
        /* Add more specific print styles here if needed */
    </style>
    </head><body>`;
    const postHtml = "</body></html>";

    // Prepare the blob
    // We use a simple approach: just the HTML content. 
    // To make it look better, we might need to inline styles. 
    // For this task, we will export the raw HTML which Word can open.

    const html = preHtml + content + postHtml;

    const blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Create download link
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Prefer Blob URL
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Resume_${templateName}_${new Date().toISOString().split('T')[0]}.doc`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    // Reset button
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        URL.revokeObjectURL(blobUrl);
    }, 500);
}
