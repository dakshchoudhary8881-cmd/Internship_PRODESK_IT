// ── Multi-Format Resume Parser ──────────────────────────────
// Supports: PDF, DOCX, DOC, TXT, RTF

async function extractTextFromResume(file) {
    if (!file) throw new Error('No file provided.');
    if (file.size > 10 * 1024 * 1024) throw new Error('File too large. Maximum size is 10MB.');

    const extension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type.toLowerCase();

    // PDF
    if (extension === 'pdf' || mimeType === 'application/pdf') {
        return await extractTextFromPDF(file);
    }

    // DOCX
    if (extension === 'docx' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return await extractTextFromDOCX(file);
    }

    // TXT / RTF / DOC (plain text fallback)
    if (['txt', 'rtf', 'doc', 'text'].includes(extension) ||
        mimeType.startsWith('text/') ||
        mimeType === 'application/rtf') {
        return await extractTextFromTXT(file);
    }

    throw new Error(`Unsupported file type: .${extension}. Please upload a PDF, DOCX, or TXT file.`);
}

// ── PDF Parser (using PDF.js) ───────────────────────────────
async function extractTextFromPDF(file) {
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

// ── DOCX Parser (using JSZip) ───────────────────────────────
async function extractTextFromDOCX(file) {
    if (!window.JSZip) throw new Error('JSZip library not loaded. Please refresh the page.');

    try {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);

        const docXml = zip.file('word/document.xml');
        if (!docXml) throw new Error('Invalid DOCX file — no document.xml found.');

        const xmlText = await docXml.async('string');

        // Extract text from <w:t> tags
        const textContent = xmlText
            .replace(/<w:p[^>]*>/g, '\n')           // Paragraph breaks
            .replace(/<w:tab\/>/g, '\t')              // Tab characters
            .replace(/<w:br[^>]*\/>/g, '\n')          // Line breaks
            .replace(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g, '$1')  // Extract text
            .replace(/<[^>]+>/g, '')                  // Strip remaining XML
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/\n{3,}/g, '\n\n')              // Collapse excessive newlines
            .trim();

        if (textContent.length < 10) throw new Error('Could not extract meaningful text from this DOCX file.');

        return { text: textContent, pageCount: null };
    } catch (error) {
        if (error.message.includes('Could not extract') || error.message.includes('Invalid DOCX')) throw error;
        throw new Error(`Failed to parse DOCX: ${error.message}`);
    }
}

// ── TXT / RTF Parser (plain text) ───────────────────────────
async function extractTextFromTXT(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            let text = e.target.result || '';

            // Basic RTF cleanup if needed
            if (text.startsWith('{\\rtf')) {
                text = text
                    .replace(/\{\\[^{}]*\}/g, '')    // Remove RTF groups
                    .replace(/\\[a-z]+\d*\s?/gi, '')  // Remove RTF commands
                    .replace(/[{}]/g, '')              // Remove braces
                    .replace(/\s{2,}/g, ' ')           // Collapse spaces
                    .trim();
            }

            text = text.trim();
            if (text.length < 10) {
                reject(new Error('Could not extract meaningful text from this file.'));
                return;
            }
            resolve({ text, pageCount: null });
        };
        reader.onerror = () => reject(new Error('Failed to read the file.'));
        reader.readAsText(file);
    });
}
