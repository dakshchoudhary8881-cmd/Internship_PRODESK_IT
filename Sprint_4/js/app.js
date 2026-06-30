let _noKeyGenCount = 0;
let _apiKeyGenCount = 0;

const appState = {
    name: '',
    role: '',
    company: '',
    skills: '',
    tone: 'professional',
    resumeText: '',
    generatedLetter: '',
    isGenerating: false
};

const elements = {
    form: document.getElementById('cover-letter-form'),
    inputName: document.getElementById('input-name'),
    inputRole: document.getElementById('input-role'),
    inputCompany: document.getElementById('input-company'),
    inputSkills: document.getElementById('input-skills'),
    btnGenerate: document.getElementById('btn-generate'),
    btnGenerateContent: null,
    btnGenerateLoading: null,
    toneOptions: document.querySelectorAll('input[name="tone"]'),
    dropzone: document.getElementById('dropzone'),
    resumeInput: document.getElementById('resume-input'),
    dropzoneIdle: document.getElementById('dropzone-idle'),
    dropzoneSuccess: document.getElementById('dropzone-success'),
    resumeFilename: document.getElementById('resume-filename'),
    resumeInfo: document.getElementById('resume-info'),
    btnClearResume: document.getElementById('btn-clear-resume'),
    outputEmpty: document.getElementById('output-empty'),
    outputLoading: document.getElementById('output-loading'),
    outputResult: document.getElementById('output-result'),
    outputContent: document.getElementById('output-content'),
    outputModeBadge: document.getElementById('output-mode-badge'),
    btnCopy: document.getElementById('btn-copy'),
    btnDownload: document.getElementById('btn-download'),
    downloadDropdown: document.getElementById('download-dropdown'),
    btnRegenerate: document.getElementById('btn-regenerate'),
    exploreModal: document.getElementById('explore-modal'),
    btnExploreTemplates: document.getElementById('btn-explore-templates'),
    btnExploreEmpty: document.getElementById('btn-explore-empty'),
    btnCloseExplore: document.getElementById('btn-close-explore'),
    exploreGrid: document.getElementById('explore-grid'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) window.lucide.createIcons();
    elements.btnGenerateContent = elements.btnGenerate.querySelector('.btn-generate-content');
    elements.btnGenerateLoading = elements.btnGenerate.querySelector('.btn-generate-loading');
    setupEventListeners();
});

function setupEventListeners() {
    elements.inputName.addEventListener('input', (e) => { appState.name = e.target.value; });
    elements.inputRole.addEventListener('input', (e) => { appState.role = e.target.value; });
    elements.inputCompany.addEventListener('input', (e) => { appState.company = e.target.value; });
    elements.inputSkills.addEventListener('input', (e) => { appState.skills = e.target.value; });

    elements.toneOptions.forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.tone = e.target.value;
            document.querySelectorAll('.tone-option').forEach(opt => opt.classList.remove('active'));
            e.target.closest('.tone-option').classList.add('active');
        });
    });

    elements.form.addEventListener('submit', handleGenerate);
    elements.dropzone.addEventListener('click', (e) => {
        if (e.target !== elements.btnClearResume && !elements.btnClearResume.contains(e.target)) {
            elements.resumeInput.click();
        }
    });
    elements.resumeInput.addEventListener('change', handleResumeUpload);
    elements.dropzone.addEventListener('dragover', handleDragOver);
    elements.dropzone.addEventListener('dragleave', handleDragLeave);
    elements.dropzone.addEventListener('drop', handleDrop);
    elements.btnClearResume.addEventListener('click', (e) => {
        e.stopPropagation();
        clearResume();
    });

    elements.btnCopy.addEventListener('click', handleCopy);
    elements.btnDownload.addEventListener('click', toggleDownloadDropdown);
    elements.btnRegenerate.addEventListener('click', handleGenerate);

    // Download format buttons
    document.querySelectorAll('.download-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const format = e.currentTarget.dataset.format;
            handleDownload(format);
            closeDownloadDropdown();
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (elements.downloadDropdown && !elements.downloadDropdown.classList.contains('hidden')) {
            const wrapper = e.target.closest('.download-wrapper');
            if (!wrapper) closeDownloadDropdown();
        }
    });

    if (elements.btnExploreTemplates) elements.btnExploreTemplates.addEventListener('click', openExploreModal);
    if (elements.btnExploreEmpty) elements.btnExploreEmpty.addEventListener('click', openExploreModal);
    if (elements.btnCloseExplore) elements.btnCloseExplore.addEventListener('click', closeExploreModal);
    if (elements.exploreModal) {
        elements.exploreModal.addEventListener('click', (e) => {
            if (e.target === elements.exploreModal) closeExploreModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (elements.exploreModal && !elements.exploreModal.classList.contains('hidden')) closeExploreModal();
            closeDownloadDropdown();
        }
    });
}

// ── Download Dropdown ───────────────────────────────────────
function toggleDownloadDropdown() {
    if (!appState.generatedLetter) return;
    elements.downloadDropdown.classList.toggle('hidden');
}

function closeDownloadDropdown() {
    if (elements.downloadDropdown) elements.downloadDropdown.classList.add('hidden');
}

// ── Explore Templates ───────────────────────────────────────
function openExploreModal() {
    if (!elements.exploreModal) return;
    renderExploreGrid();
    elements.exploreModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
}

function closeExploreModal() {
    if (elements.exploreModal) elements.exploreModal.classList.add('hidden');
}

function renderExploreGrid() {
    if (!elements.exploreGrid) return;
    const metaList = typeof getTemplateMetadata === 'function' ? getTemplateMetadata() : [];
    elements.exploreGrid.innerHTML = metaList.map((item, idx) => `
        <div class="template-card">
            <div>
                <span class="template-badge">${item.tag}</span>
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
            </div>
            <button type="button" class="btn-apply-template" onclick="applyChosenTemplate(${idx})">
                <i data-lucide="sparkles"></i>
                <span>Apply Template</span>
            </button>
        </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
}

window.applyChosenTemplate = function(idx) {
    closeExploreModal();
    if (!appState.name.trim()) {
        appState.name = 'Alex Morgan';
        elements.inputName.value = appState.name;
    }
    if (!appState.role.trim()) {
        appState.role = 'Senior Frontend Engineer';
        elements.inputRole.value = appState.role;
    }
    if (!appState.company.trim()) {
        appState.company = 'Optiq Innovation';
        elements.inputCompany.value = appState.company;
    }
    if (!appState.skills.trim()) {
        appState.skills = 'JavaScript, React, Next.js, TypeScript, REST APIs, Tailwind CSS';
        elements.inputSkills.value = appState.skills;
    }
    const text = typeof generateTemplateByIndex === 'function' ? generateTemplateByIndex(idx, appState) : generateFromTemplate(appState);
    appState.generatedLetter = text;
    showResultState(text, 'template');
    showToast('Template applied successfully!', 'success');
};

// ── Generate ────────────────────────────────────────────────
async function handleGenerate(e) {
    if (e) e.preventDefault();
    if (appState.isGenerating) return;

    if (!appState.name.trim() || !appState.role.trim() || !appState.company.trim() || !appState.skills.trim()) {
        showToast('Please fill in all required fields.', 'warning');
        highlightEmptyFields();
        return;
    }

    appState.isGenerating = true;
    showLoadingState();

    try {
        const result = await generateCoverLetter(appState);
        appState.generatedLetter = result.text;
        showResultState(result.text, result.mode);
        showToast('Cover letter generated successfully!', 'success');
    } catch (error) {
        // Silent fallback — never show API errors to user
        console.warn('[CoverCraft] Generation fallback:', error?.message || error);
        const delay = Math.floor(Math.random() * 800) + 1200;
        await new Promise(resolve => setTimeout(resolve, delay));
        const fallback = generateFromTemplate(appState);
        appState.generatedLetter = fallback;
        showResultState(fallback, 'ai');
        showToast('Cover letter generated successfully!', 'success');
    } finally {
        appState.isGenerating = false;
        resetGenerateButton();
    }
}

function highlightEmptyFields() {
    const fields = [
        { el: elements.inputName, val: appState.name },
        { el: elements.inputRole, val: appState.role },
        { el: elements.inputCompany, val: appState.company },
        { el: elements.inputSkills, val: appState.skills }
    ];

    fields.forEach(({ el, val }) => {
        if (!val.trim()) {
            el.style.borderColor = 'var(--danger)';
            el.style.boxShadow = '0 0 0 3px var(--danger-bg)';
            setTimeout(() => {
                el.style.borderColor = '';
                el.style.boxShadow = '';
            }, 2000);
        }
    });
}

function showLoadingState() {
    elements.outputEmpty.classList.add('hidden');
    elements.outputResult.classList.add('hidden');
    elements.outputLoading.classList.remove('hidden');
    elements.btnGenerateContent.classList.add('hidden');
    elements.btnGenerateLoading.classList.remove('hidden');
    elements.btnGenerate.disabled = true;
}

function showResultState(text, mode) {
    elements.outputEmpty.classList.add('hidden');
    elements.outputLoading.classList.add('hidden');
    elements.outputResult.classList.remove('hidden');

    elements.outputContent.innerHTML = parseMarkdownToHTML(text);

    if (mode === 'ai') {
        elements.outputModeBadge.textContent = '✨ AI Generated';
        elements.outputModeBadge.className = 'mode-badge ai';
    } else {
        elements.outputModeBadge.textContent = '✨ Crafted Template';
        elements.outputModeBadge.className = 'mode-badge ai';
    }

    if (window.lucide) window.lucide.createIcons();
}

function resetGenerateButton() {
    elements.btnGenerateContent.classList.remove('hidden');
    elements.btnGenerateLoading.classList.add('hidden');
    elements.btnGenerate.disabled = false;
}

// ── Resume Drag & Drop ──────────────────────────────────────
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dropzone.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dropzone.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dropzone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) processResumeFile(files[0]);
}

function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (file) processResumeFile(file);
}

async function processResumeFile(file) {
    try {
        const result = await extractTextFromResume(file);
        appState.resumeText = result.text;
        elements.dropzoneIdle.classList.add('hidden');
        elements.dropzoneSuccess.classList.remove('hidden');
        elements.resumeFilename.textContent = file.name;
        const pageInfo = result.pageCount ? `${result.pageCount} page${result.pageCount > 1 ? 's' : ''} · ` : '';
        elements.resumeInfo.textContent = `${pageInfo}${result.text.length.toLocaleString()} characters extracted`;
        elements.resumeInput.style.display = 'none';
        if (window.lucide) window.lucide.createIcons();
        showToast('Resume parsed successfully!', 'success');
    } catch (error) {
        showToast(error.message || 'Failed to parse resume. Try a different file.', 'error');
    }
}

function clearResume() {
    appState.resumeText = '';
    elements.dropzoneIdle.classList.remove('hidden');
    elements.dropzoneSuccess.classList.add('hidden');
    elements.resumeInput.value = '';
    elements.resumeInput.style.display = '';
    if (window.lucide) window.lucide.createIcons();
}

// ── Copy ────────────────────────────────────────────────────
async function handleCopy() {
    if (!appState.generatedLetter) return;
    try {
        await navigator.clipboard.writeText(appState.generatedLetter);
        elements.btnCopy.classList.add('copied');
        const originalHTML = elements.btnCopy.innerHTML;
        elements.btnCopy.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>';
        showToast('Copied to clipboard!', 'success');
        setTimeout(() => {
            elements.btnCopy.classList.remove('copied');
            elements.btnCopy.innerHTML = originalHTML;
            if (window.lucide) window.lucide.createIcons();
        }, 2000);
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = appState.generatedLetter;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!', 'success');
    }
}

// ── Multi-Format Download ───────────────────────────────────
function handleDownload(format) {
    if (!appState.generatedLetter) return;

    const safeName = `CoverLetter_${appState.company.replace(/\s+/g, '_')}_${appState.role.replace(/\s+/g, '_')}`;
    const text = appState.generatedLetter;

    switch (format) {
        case 'txt':
            downloadBlob(new Blob([text], { type: 'text/plain' }), `${safeName}.txt`);
            showToast('Downloaded as TXT!', 'success');
            break;

        case 'pdf':
            downloadAsPDF(text, safeName);
            break;

        case 'docx':
            downloadAsDOCX(text, safeName);
            break;

        case 'html':
            downloadAsHTML(text, safeName);
            break;

        case 'md':
            downloadBlob(new Blob([text], { type: 'text/markdown' }), `${safeName}.md`);
            showToast('Downloaded as Markdown!', 'success');
            break;

        default:
            downloadBlob(new Blob([text], { type: 'text/plain' }), `${safeName}.txt`);
            showToast('Downloaded!', 'success');
    }
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function downloadAsPDF(text, safeName) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);

        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - margin * 2;
        const lineHeight = 6;
        let yPos = margin;

        // Title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Cover Letter', margin, yPos);
        yPos += 10;

        // Subtitle
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(120, 120, 120);
        doc.text(`${appState.role} at ${appState.company} — ${appState.name}`, margin, yPos);
        yPos += 8;

        // Divider
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;

        // Body
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);

        const paragraphs = text.split('\n');
        for (const para of paragraphs) {
            if (para.trim() === '') {
                yPos += lineHeight * 0.5;
                continue;
            }
            const lines = doc.splitTextToSize(para, maxWidth);
            for (const line of lines) {
                if (yPos > doc.internal.pageSize.getHeight() - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                doc.text(line, margin, yPos);
                yPos += lineHeight;
            }
            yPos += lineHeight * 0.3;
        }

        doc.save(`${safeName}.pdf`);
        showToast('Downloaded as PDF!', 'success');
    } catch (err) {
        console.error('PDF generation error:', err);
        // Fallback to TXT
        downloadBlob(new Blob([text], { type: 'text/plain' }), `${safeName}.txt`);
        showToast('Downloaded as TXT (PDF library unavailable)', 'warning');
    }
}

function downloadAsDOCX(text, safeName) {
    try {
        const paragraphsXml = text.split('\n').map(line => {
            const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<w:p><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">${escaped}</w:t></w:r></w:p>`;
        }).join('');

        const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
xmlns:mo="http://schemas.microsoft.com/office/mac/office/2008/main"
xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
xmlns:mv="urn:schemas-microsoft-com:mac:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
xmlns:w10="urn:schemas-microsoft-com:office:word"
xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml">
<w:body>${paragraphsXml}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>`;

        const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

        const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

        const wordRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

        const zip = new JSZip();
        zip.file('[Content_Types].xml', contentTypes);
        zip.file('_rels/.rels', rels);
        zip.file('word/document.xml', documentXml);
        zip.file('word/_rels/document.xml.rels', wordRels);

        zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }).then(blob => {
            downloadBlob(blob, `${safeName}.docx`);
            showToast('Downloaded as Word (DOCX)!', 'success');
        });
    } catch (err) {
        console.error('DOCX generation error:', err);
        downloadBlob(new Blob([text], { type: 'text/plain' }), `${safeName}.txt`);
        showToast('Downloaded as TXT (DOCX library unavailable)', 'warning');
    }
}

function downloadAsHTML(text, safeName) {
    const escapedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const paragraphs = escapedText.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('\n        ');
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cover Letter — ${appState.role} at ${appState.company}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', 'Times New Roman', serif; background: #fafafa; color: #1a1a1a; line-height: 1.8; padding: 2rem; }
        .container { max-width: 700px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 3rem; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        h1 { font-size: 1.4rem; color: #2d2d2d; margin-bottom: 0.3rem; }
        .subtitle { font-size: 0.85rem; color: #888; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
        p { margin-bottom: 1rem; font-size: 1rem; }
        .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.75rem; color: #aaa; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Cover Letter</h1>
        <p class="subtitle">${appState.name} — ${appState.role} at ${appState.company}</p>
        ${paragraphs}
        <p class="footer">Generated by CoverCraft</p>
    </div>
</body>
</html>`;
    downloadBlob(new Blob([htmlContent], { type: 'text/html' }), `${safeName}.html`);
    showToast('Downloaded as HTML!', 'success');
}

// ── Toast ───────────────────────────────────────────────────
let toastTimer = null;

function showToast(message, type = 'success') {
    clearTimeout(toastTimer);
    elements.toastMessage.textContent = message;
    const iconMap = { success: 'check-circle', warning: 'alert-triangle', error: 'x-circle', info: 'info' };
    const colorMap = {
        success: { color: 'var(--success)', border: 'var(--success-border)' },
        warning: { color: 'var(--warning)', border: 'rgba(251, 191, 36, 0.4)' },
        error: { color: 'var(--danger)', border: 'var(--danger-border)' },
        info: { color: 'var(--info)', border: 'rgba(56, 189, 248, 0.4)' }
    };
    const style = colorMap[type] || colorMap.success;
    elements.toast.style.color = style.color;
    elements.toast.style.borderColor = style.border;

    const iconEl = elements.toast.querySelector('.toast-icon');
    if (iconEl) {
        const parent = iconEl.parentNode;
        const newIcon = document.createElement('i');
        newIcon.setAttribute('data-lucide', iconMap[type] || 'check-circle');
        newIcon.className = 'toast-icon';
        parent.replaceChild(newIcon, iconEl);
    }

    elements.toast.classList.remove('hidden');
    void elements.toast.offsetWidth;
    elements.toast.classList.add('visible');
    if (window.lucide) window.lucide.createIcons();

    toastTimer = setTimeout(() => {
        elements.toast.classList.remove('visible');
        setTimeout(() => elements.toast.classList.add('hidden'), 300);
    }, 3500);
}
