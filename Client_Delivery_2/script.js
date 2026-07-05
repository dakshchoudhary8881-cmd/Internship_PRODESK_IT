document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSidebarToggle();
    initFormValidation();
    initGalleryFiltering();
    initGlobalSearch();
    initSkeletonToggle();
    initThemeToggle();
    console.log('[System] LUMEN Studio Internal UI Templates Initialized Successfully.');
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetViewId = link.getAttribute('data-view');
            if (targetViewId) {
                switchView(targetViewId);
            }
        });
    });
}

function switchView(viewId) {
    const allViews = document.querySelectorAll('.template-view');
    allViews.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('active');
    });

    const allNavLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-selected', 'false');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
        targetView.classList.add('active');
    }

    const matchingLink = document.querySelector(`.sidebar-nav .nav-link[data-view="${viewId}"]`);
    if (matchingLink) {
        matchingLink.classList.add('active');
        matchingLink.setAttribute('aria-selected', 'true');
        
        const label = matchingLink.querySelector('.nav-label')?.textContent || 'Dashboard';
        const pageTitleEl = document.getElementById('page-title');
        if (pageTitleEl) pageTitleEl.textContent = label;
    }

    const sidebar = document.getElementById('sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        const openBtn = document.getElementById('open-sidebar-btn');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-sidebar-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');

    if (openBtn && sidebar) {
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            openBtn.setAttribute('aria-expanded', 'true');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
            if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
        });
    }
}

function sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function initFormValidation() {
    const form = document.getElementById('add-booking-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        clearFormErrors();

        let isValid = true;
        const nameInput = document.getElementById('book-name');
        const phoneInput = document.getElementById('book-phone');
        const emailInput = document.getElementById('book-email');
        const typeSelect = document.getElementById('book-type');
        const pkgSelect = document.getElementById('book-package');
        const photoSelect = document.getElementById('book-photographer');
        const dateInput = document.getElementById('book-date');
        const timeInput = document.getElementById('book-time');
        const locInput = document.getElementById('book-location');
        const notesInput = document.getElementById('book-notes');

        if (!nameInput.value.trim()) {
            showFieldError(nameInput, 'err-name', 'Customer name is required.');
            isValid = false;
        }

        if (!phoneInput.value.trim()) {
            showFieldError(phoneInput, 'err-phone', 'Phone number cannot be empty.');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showFieldError(emailInput, 'err-email', 'Email address is required.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showFieldError(emailInput, 'err-email', 'Please enter a valid email address.');
            isValid = false;
        }

        if (!typeSelect.value) {
            showFieldError(typeSelect, 'err-type', 'Please select a photography type.');
            isValid = false;
        }
        if (!pkgSelect.value) {
            showFieldError(pkgSelect, 'err-package', 'Please select a package tier.');
            isValid = false;
        }
        if (!photoSelect.value) {
            showFieldError(photoSelect, 'err-photographer', 'Please assign a photographer.');
            isValid = false;
        }

        if (!dateInput.value) {
            showFieldError(dateInput, 'err-date', 'Shoot date is required.');
            isValid = false;
        }
        if (!timeInput.value) {
            showFieldError(timeInput, 'err-time', 'Shoot time is required.');
            isValid = false;
        }

        if (!locInput.value.trim()) {
            showFieldError(locInput, 'err-location', 'Location or studio lounge is required.');
            isValid = false;
        }

        if (!isValid) {
            const feedbackEl = document.getElementById('booking-form-feedback');
            if (feedbackEl) {
                feedbackEl.textContent = 'Please correct the highlighted errors before submitting.';
                feedbackEl.className = 'form-status error';
                feedbackEl.classList.remove('hidden');
            }
            return;
        }

        const cleanData = {
            name: sanitizeInput(nameInput.value.trim()),
            phone: sanitizeInput(phoneInput.value.trim()),
            email: sanitizeInput(emailInput.value.trim()),
            type: sanitizeInput(typeSelect.value),
            pkg: sanitizeInput(pkgSelect.value),
            photographer: sanitizeInput(photoSelect.value),
            date: sanitizeInput(dateInput.value),
            time: sanitizeInput(timeInput.value),
            location: sanitizeInput(locInput.value.trim()),
            notes: sanitizeInput(notesInput.value.trim())
        };

        console.log('[Analytics] User interacted with UI Templates');
        console.log('[Telemetry Payload - Sanitized]:', cleanData);

        const feedbackEl = document.getElementById('booking-form-feedback');
        if (feedbackEl) {
            feedbackEl.innerHTML = `<strong>✓ Booking Confirmed!</strong> Record #BK-9042 created for client <em>${cleanData.name}</em>.`;
            feedbackEl.className = 'form-status success';
            feedbackEl.classList.remove('hidden');
        }

        addNewBookingRow(cleanData);

        setTimeout(() => {
            form.reset();
            if (feedbackEl) feedbackEl.classList.add('hidden');
            switchView('view-bookings');
        }, 1800);
    });
}

function showFieldError(inputEl, errId, message) {
    inputEl.classList.add('error-border');
    inputEl.setAttribute('aria-invalid', 'true');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = message;
}

function clearFormErrors() {
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.classList.remove('error-border');
        input.removeAttribute('aria-invalid');
    });
    const errors = document.querySelectorAll('.error-msg');
    errors.forEach(err => err.textContent = '');
    const feedback = document.getElementById('booking-form-feedback');
    if (feedback) feedback.classList.add('hidden');
}

function addNewBookingRow(data) {
    const tbody = document.getElementById('bookings-table-body');
    const emptyState = document.getElementById('bookings-empty-state');
    if (!tbody) return;

    if (emptyState) emptyState.classList.add('hidden');

    const tr = document.createElement('tr');
    tr.style.backgroundColor = 'rgba(52, 199, 89, 0.1)';
    tr.innerHTML = `
        <td><strong>#BK-9042 (New)</strong></td>
        <td>${data.name}</td>
        <td>${data.type}</td>
        <td>${data.date}</td>
        <td>${data.photographer}</td>
        <td><span class="status status-confirmed">Confirmed</span></td>
        <td class="text-right">
            <button class="btn-action" title="Edit Booking">✏️</button>
            <button class="btn-action" title="View Details">👁️</button>
            <button class="btn-action text-error" title="Delete Booking" onclick="deleteRow(this)">🗑️</button>
        </td>
    `;
    tbody.prepend(tr);
    setTimeout(() => { tr.style.backgroundColor = ''; }, 2500);
}

function toggleTableEmptyState(tbodyId, emptyStateId) {
    const tbody = document.getElementById(tbodyId);
    const emptyState = document.getElementById(emptyStateId);
    if (!tbody || !emptyState) return;

    if (tbody.children.length > 0 && emptyState.classList.contains('hidden')) {
        tbody.style.display = 'none';
        emptyState.classList.remove('hidden');
    } else {
        tbody.style.display = '';
        emptyState.classList.add('hidden');
    }
}

function resetBookingFilters() {
    const tbody = document.getElementById('bookings-table-body');
    const emptyState = document.getElementById('bookings-empty-state');
    if (tbody) tbody.style.display = '';
    if (emptyState) emptyState.classList.add('hidden');
    const search = document.getElementById('booking-search');
    const filter = document.getElementById('booking-filter');
    if (search) search.value = '';
    if (filter) filter.value = 'all';
}

function deleteRow(btnEl) {
    if (confirm('Are you sure you want to delete this internal record?')) {
        const tr = btnEl.closest('tr');
        const tbody = tr.parentElement;
        tr.style.opacity = '0';
        tr.style.transform = 'translateX(20px)';
        tr.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            tr.remove();
            if (tbody && tbody.children.length === 0) {
                const tableCard = tbody.closest('.card');
                const emptyState = tableCard?.querySelector('.empty-state');
                if (emptyState) emptyState.classList.remove('hidden');
            }
        }, 300);
    }
}

function initGalleryFiltering() {
    const filterBtns = document.querySelectorAll('#view-gallery .filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const emptyState = document.getElementById('gallery-empty-state');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const cat = btn.getAttribute('data-cat');
            let visibleCount = 0;

            if (cat === 'empty-test') {
                galleryCards.forEach(card => card.style.display = 'none');
                if (emptyState) emptyState.classList.remove('hidden');
                return;
            }

            galleryCards.forEach(card => {
                const cardCat = card.getAttribute('data-cat');
                if (cat === 'all' || cardCat === cat) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0 && emptyState) {
                emptyState.classList.remove('hidden');
            } else if (emptyState) {
                emptyState.classList.add('hidden');
            }
        });
    });
}

function filterGalleryAdmin(catName) {
    const btn = document.querySelector(`#view-gallery .filter-btn[data-cat="${catName}"]`);
    if (btn) btn.click();
}

function deletePhotoCard(btnEl) {
    if (confirm('Remove this photo master from the studio archive?')) {
        const card = btnEl.closest('.gallery-card');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            card.remove();
            const remaining = document.querySelectorAll('.gallery-card');
            if (remaining.length === 0) {
                const emptyState = document.getElementById('gallery-empty-state');
                if (emptyState) emptyState.classList.remove('hidden');
            }
        }, 300);
    }
}

function uploadSimulatedPhoto() {
    const grid = document.getElementById('gallery-admin-grid');
    const emptyState = document.getElementById('gallery-empty-state');
    if (!grid) return;

    if (emptyState) emptyState.classList.add('hidden');

    const newCard = document.createElement('div');
    newCard.className = 'gallery-card card';
    newCard.setAttribute('data-cat', 'wedding');
    newCard.style.animation = 'fadeIn 0.4s ease';
    newCard.innerHTML = `
        <div class="photo-placeholder photo-wed-1" style="background: radial-gradient(circle at center, #444, #0a0a0a);">
            <span class="photo-cat-badge">Wedding (New Upload)</span>
            <button class="photo-delete-btn" title="Delete Photo" onclick="deletePhotoCard(this)">✕</button>
        </div>
        <div class="photo-meta">
            <strong>Studio Session Master #88</strong>
            <span class="text-muted">Uploaded Just Now • 52.0 MB</span>
        </div>
    `;
    grid.prepend(newCard);
}

function initSkeletonToggle() {
    const skeletonBtn = document.getElementById('toggle-skeleton-btn');
    const mainContent = document.getElementById('main-content');
    
    if (skeletonBtn && mainContent) {
        skeletonBtn.addEventListener('click', () => {
            const isSkeleton = mainContent.classList.toggle('loading-skeleton');
            skeletonBtn.setAttribute('aria-pressed', isSkeleton);
            
            const btnText = skeletonBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = isSkeleton ? 'Disable Loading State' : 'Simulate Loading State';
            }
            if (isSkeleton) {
                skeletonBtn.classList.add('btn-primary');
                skeletonBtn.classList.remove('btn-outline');
            } else {
                skeletonBtn.classList.add('btn-outline');
                skeletonBtn.classList.remove('btn-primary');
            }
        });
    }
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    const iconMoon = themeBtn.querySelector('.icon-moon');
    const iconSun = themeBtn.querySelector('.icon-sun');

    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('theme-light');
        if (iconMoon && iconSun) {
            iconMoon.classList.toggle('hidden', isLight);
            iconSun.classList.toggle('hidden', !isLight);
        }
        const switchChk = document.getElementById('theme-switch-chk');
        if (switchChk) switchChk.checked = !isLight;
    });
}

function toggleThemeMode(isDarkChecked) {
    document.body.classList.toggle('theme-light', !isDarkChecked);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        const iconMoon = themeBtn.querySelector('.icon-moon');
        const iconSun = themeBtn.querySelector('.icon-sun');
        if (iconMoon && iconSun) {
            iconMoon.classList.toggle('hidden', !isDarkChecked);
            iconSun.classList.toggle('hidden', isDarkChecked);
        }
    }
}

function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const activeView = document.querySelector('.template-view.active');
            if (activeView && activeView.id === 'view-bookings') {
                const rows = document.querySelectorAll('#bookings-table-body tr');
                let visible = 0;
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(query)) {
                        row.style.display = '';
                        visible++;
                    } else {
                        row.style.display = 'none';
                    }
                });
                const emptyState = document.getElementById('bookings-empty-state');
                if (visible === 0 && emptyState) emptyState.classList.remove('hidden');
                else if (emptyState) emptyState.classList.add('hidden');
            }
        });
    }
}

function saveStudioSettings(e) {
    e.preventDefault();
    const statusEl = document.getElementById('settings-status');
    if (statusEl) {
        statusEl.textContent = '✓ Studio configuration and notification triggers saved successfully.';
        statusEl.className = 'form-status success';
        statusEl.classList.remove('hidden');
        setTimeout(() => statusEl.classList.add('hidden'), 3500);
    }
}

function bookPackage(pkgName) {
    switchView('view-add-booking');
    const pkgSelect = document.getElementById('book-package');
    if (pkgSelect) {
        pkgSelect.value = pkgName;
        pkgSelect.style.borderColor = 'var(--accent-white)';
        setTimeout(() => { pkgSelect.style.borderColor = ''; }, 1500);
    }
}

function previewLogo(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const previewEl = document.getElementById('logo-preview');
            if (previewEl) {
                previewEl.innerHTML = `<img src="${event.target.result}" alt="Studio Logo Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">`;
            }
        };
        reader.readAsDataURL(file);
    }
}
