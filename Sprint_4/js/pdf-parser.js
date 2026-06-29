async function extractTextFromPDF(file) {
    if (!file) throw new Error('No file provided.');
    if (file.type !== 'application/pdf') throw new Error('Invalid file type. Please upload a PDF file.');
    if (file.size > 5 * 1024 * 1024) throw new Error('File too large. Maximum size is 5MB.');
    if (!window.pdfjsLib) throw new Error('PDF.js library not loaded. Please refresh the page.');

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        const pageCount = pdf.numPages;

        for (let i = 1; i <= pageCount; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            fullText += textContent.items.map(item => item.str).join(' ') + '\n\n';
        }

        const cleanedText = fullText.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
        if (cleanedText.length < 10) throw new Error('Could not extract meaningful text from this PDF. It may be image-based or encrypted.');

        return { text: cleanedText, pageCount };
    } catch (error) {
        if (error.message.includes('Could not extract') || error.message.includes('Invalid') || error.message.includes('File too large')) throw error;
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
}
