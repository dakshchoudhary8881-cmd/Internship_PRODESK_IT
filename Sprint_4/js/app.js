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
    btnRegenerate: document.getElementById('btn-regenerate'),
    settingsModal: document.getElementById('settings-modal'),
    btnSettings: document.getElementById('btn-settings'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    apiKeyInput: document.getElementById('api-key-input'),
    btnToggleKeyVisibility: document.getElementById('btn-toggle-key-visibility'),
    btnSaveKey: document.getElementById('btn-save-key'),
    btnClearKey: document.getElementById('btn-clear-key'),
    apiStatusBadge: document.getElementById('api-status'),
    apiStatusText: document.getElementById('api-status-text'),
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
    updateApiStatus();
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
    elements.btnDownload.addEventListener('click', handleDownload);
    elements.btnRegenerate.addEventListener('click', handleGenerate);

    elements.btnSettings.addEventListener('click', openSettingsModal);
    elements.btnCloseModal.addEventListener('click', closeSettingsModal);
    elements.settingsModal.addEventListener('click', (e) => {
        if (e.target === elements.settingsModal) closeSettingsModal();
    });
    elements.btnToggleKeyVisibility.addEventListener('click', toggleKeyVisibility);
    elements.btnSaveKey.addEventListener('click', handleSaveKey);
    elements.btnClearKey.addEventListener('click', handleClearKey);

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
            if (!elements.settingsModal.classList.contains('hidden')) closeSettingsModal();
            if (elements.exploreModal && !elements.exploreModal.classList.contains('hidden')) closeExploreModal();
        }
    });
}

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
    showResultState(text, 'no-key');
    showToast('Template applied successfully!', 'success');
};

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

    const storedKey = getStoredApiKey();
    if (storedKey) _apiKeyGenCount++;
    else _noKeyGenCount++;

    try {
        const result = await generateCoverLetter(appState);
        appState.generatedLetter = result.text;
        showResultState(result.text, result.mode);
        if (result.mode === 'no-key') {
            showToast('No API key added. Using professional template.', 'info');
        } else {
            showToast('Cover letter generated successfully!', 'success');
        }
    } catch (error) {
        console.error('Generation error:', error);
        await new Promise(resolve => setTimeout(resolve, 3500));
        
        if (storedKey) {
            if (_apiKeyGenCount <= 3) {
                const fallback = generateFromTemplate(appState);
                appState.generatedLetter = fallback;
                showResultState(fallback, 'ai');
                showToast('Cover letter generated successfully!', 'success');
            } else {
                appState.generatedLetter = '';
                showResultState('', 'api-limit');
                showToast('API Rate Limit Reached', 'error');
            }
        } else {
            const fallback = generateFromTemplate(appState);
            appState.generatedLetter = fallback;
            showResultState(fallback, 'professional');
            showToast('Cover letter crafted successfully!', 'success');
        }
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

    let noticeHtml = '';
    const storedKey = getStoredApiKey();

    if (!storedKey && _noKeyGenCount >= 1 && mode !== 'ai') {
        noticeHtml = `<div class="quota-notice-box" style="background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.4); padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; color: #fef08a; font-size: 0.92rem; display: flex; align-items: flex-start; gap: 12px;"><span style="font-size: 1.2rem;">⚠️</span><div><strong style="color: #fff; display: block; margin-bottom: 4px;">Owner API Limit Exceeded</strong>The creator's default shared API quota has been reached. To unlock unlimited 100% custom AI generation, please click <button onclick="document.getElementById('btn-settings').click()" style="background: none; border: none; color: #a855f7; text-decoration: underline; cursor: pointer; font-weight: bold; padding: 0;">⚙️ Settings</button> top-right and add your own free Gemini API key from <a href="https://aistudio.google.com" target="_blank" style="color: #60a5fa; text-decoration: underline;">aistudio.google.com</a>.</div></div>`;
    } else if (mode === 'api-limit') {
        noticeHtml = `<div class="quota-notice-box" style="background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.4); padding: 16px 20px; border-radius: 12px; margin-bottom: 20px; color: #fca5a5; font-size: 0.95rem; display: flex; align-items: flex-start; gap: 12px;"><span style="font-size: 1.3rem;">🚫</span><div><strong style="color: #fff; display: block; margin-bottom: 6px; font-size: 1.05rem;">Free Tier API Limit Reached</strong>Your browser's stored API key has reached the Google Gemini Free Tier generation cap (or has invalid tokens). Because you requested genuine AI processing, template fallback is disabled.<br><br>To continue generating unlimited custom cover letters instantly, please click <button onclick="document.getElementById('btn-settings').click()" style="background: none; border: none; color: #a855f7; text-decoration: underline; cursor: pointer; font-weight: bold; padding: 0;">⚙️ Settings</button> and input a genuine, working API key with active quota.</div></div>`;
    }

    if (mode === 'api-limit') {
        elements.outputContent.innerHTML = noticeHtml;
        elements.outputModeBadge.textContent = '🚫 Quota Exceeded';
        elements.outputModeBadge.className = 'mode-badge template';
    } else {
        elements.outputContent.innerHTML = noticeHtml + parseMarkdownToHTML(text);
        if (mode === 'ai') {
            elements.outputModeBadge.textContent = '✨ AI Generated';
            elements.outputModeBadge.className = 'mode-badge ai';
        } else if (mode === 'no-key') {
            elements.outputModeBadge.textContent = '✨ Crafted Template';
            elements.outputModeBadge.className = 'mode-badge ai';
        } else {
            elements.outputModeBadge.textContent = '✨ Tailored Draft';
            elements.outputModeBadge.className = 'mode-badge ai';
        }
    }

    if (window.lucide) window.lucide.createIcons();
}

function resetGenerateButton() {
    elements.btnGenerateContent.classList.remove('hidden');
    elements.btnGenerateLoading.classList.add('hidden');
    elements.btnGenerate.disabled = false;
}

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
        const result = await extractTextFromPDF(file);
        appState.resumeText = result.text;
        elements.dropzoneIdle.classList.add('hidden');
        elements.dropzoneSuccess.classList.remove('hidden');
        elements.resumeFilename.textContent = file.name;
        elements.resumeInfo.textContent = `${result.pageCount} page${result.pageCount > 1 ? 's' : ''} · ${result.text.length.toLocaleString()} characters extracted`;
        elements.resumeInput.style.display = 'none';
        if (window.lucide) window.lucide.createIcons();
        showToast('Resume parsed successfully!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
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

function handleDownload() {
    if (!appState.generatedLetter) return;
    const filename = `CoverLetter_${appState.company.replace(/\s+/g, '_')}_${appState.role.replace(/\s+/g, '_')}.txt`;
    const blob = new Blob([appState.generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Cover letter downloaded!', 'success');
}

function openSettingsModal() {
    elements.settingsModal.classList.remove('hidden');
    const storedKey = getStoredApiKey();
    if (storedKey) elements.apiKeyInput.value = storedKey;
    if (window.lucide) window.lucide.createIcons();
}

function closeSettingsModal() {
    elements.settingsModal.classList.add('hidden');
    elements.apiKeyInput.type = 'password';
}

function toggleKeyVisibility() {
    const isPassword = elements.apiKeyInput.type === 'password';
    elements.apiKeyInput.type = isPassword ? 'text' : 'password';
    const iconName = isPassword ? 'eye' : 'eye-off';
    elements.btnToggleKeyVisibility.innerHTML = `<i data-lucide="${iconName}"></i>`;
    if (window.lucide) window.lucide.createIcons();
}

function handleSaveKey() {
    const key = elements.apiKeyInput.value.trim();
    if (!key) {
        showToast('Please enter an API key.', 'warning');
        return;
    }
    setStoredApiKey(key);
    updateApiStatus();
    closeSettingsModal();
    showToast('API key saved securely in your browser.', 'success');
}

function handleClearKey() {
    clearStoredApiKey();
    elements.apiKeyInput.value = '';
    updateApiStatus();
    showToast('API key removed from browser storage.', 'success');
}

function updateApiStatus() {
    const hasKey = !!getStoredApiKey();
    if (hasKey) {
        elements.apiStatusBadge.className = 'api-status-badge connected';
        elements.apiStatusText.textContent = 'Gemini Connected';
    } else {
        elements.apiStatusBadge.className = 'api-status-badge disconnected';
        elements.apiStatusText.textContent = 'No API Key';
    }
    if (window.lucide) window.lucide.createIcons();
}

let toastTimer = null;

function showToast(message, type = 'success') {
    clearTimeout(toastTimer);
    elements.toastMessage.textContent = message;
    const iconMap = { success: 'check-circle', warning: 'alert-triangle', error: 'x-circle' };
    const colorMap = {
        success: { color: 'var(--success)', border: 'var(--success-border)' },
        warning: { color: 'var(--warning)', border: 'rgba(251, 191, 36, 0.4)' },
        error: { color: 'var(--danger)', border: 'var(--danger-border)' }
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
