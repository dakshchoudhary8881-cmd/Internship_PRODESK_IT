document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSidebarToggle();
    initFormValidation();
    initGalleryFiltering();
    initGlobalSearch();
    initSkeletonToggle();
    initThemeToggle();
    initNotifications();
    loadAllDataFromStorage();
    console.log('[System] LUMEN Studio Internal UI Templates Initialized Successfully.');
});

function getStorage(key) {
    const raw = localStorage.getItem('lumen_' + key);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function setStorage(key, data) {
    localStorage.setItem('lumen_' + key, JSON.stringify(data));
}

function loadAllDataFromStorage() {
    renderDashboard();
    renderBookingsTable();
    renderClientsTable();
    renderSchedule();
    renderGallery();
    renderPayments();
    renderTestimonials();
    renderNotificationsList();
    applySettings();
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetViewId = link.getAttribute('data-view');
            if (targetViewId) switchView(targetViewId);
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
        openBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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

    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('open') && window.innerWidth <= 900) {
            if (!sidebar.contains(e.target) && (!openBtn || !openBtn.contains(e.target))) {
                sidebar.classList.remove('open');
                if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
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
            id: '#BK-' + Math.floor(1000 + Math.random() * 9000),
            name: sanitizeInput(nameInput.value.trim()),
            phone: sanitizeInput(phoneInput.value.trim()),
            email: sanitizeInput(emailInput.value.trim()),
            type: sanitizeInput(typeSelect.value),
            pkg: sanitizeInput(pkgSelect.value),
            photographer: sanitizeInput(photoSelect.value),
            date: sanitizeInput(dateInput.value),
            time: sanitizeInput(timeInput.value),
            location: sanitizeInput(locInput.value.trim()),
            notes: sanitizeInput(notesInput.value.trim()),
            status: 'Confirmed',
            created: new Date().toISOString()
        };

        console.log('[Analytics] User interacted with UI Templates');
        console.log('[Telemetry Payload - Sanitized]:', cleanData);

        const bookings = getStorage('bookings');
        bookings.unshift(cleanData);
        setStorage('bookings', bookings);

        const clients = getStorage('clients');
        const existingClient = clients.find(c => c.email.toLowerCase() === cleanData.email.toLowerCase());
        if (existingClient) {
            existingClient.shoots = (parseInt(existingClient.shoots) || 0) + 1;
            existingClient.lastVisit = cleanData.date;
        } else {
            clients.unshift({
                name: cleanData.name,
                phone: cleanData.phone,
                email: cleanData.email,
                shoots: 1,
                lastVisit: cleanData.date,
                status: 'New Client'
            });
        }
        setStorage('clients', clients);

        let amount = 1200;
        if (cleanData.pkg === 'Standard') amount = 2500;
        if (cleanData.pkg === 'Premium') amount = 4800;

        const invoices = getStorage('invoices');
        invoices.unshift({
            id: '#INV-' + Math.floor(1000 + Math.random() * 9000),
            clientName: cleanData.name + ' (' + cleanData.type + ')',
            amount: '$' + amount.toLocaleString() + '.00',
            rawAmount: amount,
            date: cleanData.date,
            method: 'Bank Wire / Credit Card',
            status: 'Pending'
        });
        setStorage('invoices', invoices);

        addActivityLog(`New booking ${cleanData.id} confirmed for <strong>${cleanData.name}</strong>`);
        addNotification(`New Booking: ${cleanData.name} booked a ${cleanData.pkg} session.`);

        const feedbackEl = document.getElementById('booking-form-feedback');
        if (feedbackEl) {
            feedbackEl.innerHTML = `<strong>✓ Booking Confirmed!</strong> Record ${cleanData.id} created for client <em>${cleanData.name}</em>.`;
            feedbackEl.className = 'form-status success';
            feedbackEl.classList.remove('hidden');
        }

        loadAllDataFromStorage();

        setTimeout(() => {
            form.reset();
            if (feedbackEl) feedbackEl.classList.add('hidden');
            switchView('view-bookings');
        }, 1500);
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

function renderDashboard() {
    const bookings = getStorage('bookings');
    const clients = getStorage('clients');
    const invoices = getStorage('invoices');
    const activities = getStorage('activities');

    const totalBookingsEl = document.getElementById('stat-total-bookings');
    const todayShootsEl = document.getElementById('stat-today-shoots');
    const completedProjectsEl = document.getElementById('stat-completed-projects');
    const pendingPaymentsEl = document.getElementById('stat-pending-payments');

    if (totalBookingsEl) totalBookingsEl.textContent = bookings.length;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = bookings.filter(b => b.date === todayStr).length;
    if (todayShootsEl) todayShootsEl.textContent = todayCount;

    const completedCount = bookings.filter(b => b.status === 'Completed').length;
    if (completedProjectsEl) completedProjectsEl.textContent = completedCount;

    let pendingSum = 0;
    let pendingCount = 0;
    invoices.forEach(inv => {
        if (inv.status === 'Pending' || inv.status === 'Overdue') {
            pendingSum += inv.rawAmount || 0;
            pendingCount++;
        }
    });
    if (pendingPaymentsEl) pendingPaymentsEl.textContent = '$' + pendingSum.toLocaleString();

    const upcomingTbody = document.getElementById('dashboard-upcoming-tbody');
    const upcomingEmpty = document.getElementById('upcoming-empty-state');
    if (upcomingTbody && upcomingEmpty) {
        upcomingTbody.innerHTML = '';
        if (bookings.length === 0) {
            upcomingTbody.style.display = 'none';
            upcomingEmpty.classList.remove('hidden');
        } else {
            upcomingTbody.style.display = '';
            upcomingEmpty.classList.add('hidden');
            bookings.slice(0, 5).forEach(b => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${b.time}</td>
                    <td><strong>${b.name}</strong></td>
                    <td><span class="tag">${b.type}</span></td>
                    <td>${b.photographer}</td>
                    <td><span class="status status-${b.status.toLowerCase()}">${b.status}</span></td>
                `;
                upcomingTbody.appendChild(tr);
            });
        }
    }

    const activityFeed = document.getElementById('dashboard-activity-feed');
    const activityEmpty = document.getElementById('activity-empty-state');
    if (activityFeed && activityEmpty) {
        activityFeed.innerHTML = '';
        if (activities.length === 0) {
            activityFeed.style.display = 'none';
            activityEmpty.classList.remove('hidden');
        } else {
            activityFeed.style.display = '';
            activityEmpty.classList.add('hidden');
            activities.slice(0, 6).forEach(act => {
                const div = document.createElement('div');
                div.className = 'activity-item';
                div.innerHTML = `
                    <div class="activity-dot dot-${act.type || 'primary'}"></div>
                    <div class="activity-content">
                        <p>${act.text}</p>
                        <span class="activity-time">${act.time}</span>
                    </div>
                `;
                activityFeed.appendChild(div);
            });
        }
    }
}

function renderBookingsTable() {
    const bookings = getStorage('bookings');
    const tbody = document.getElementById('bookings-table-body');
    const emptyState = document.getElementById('bookings-empty-state');
    const pageInfo = document.getElementById('bookings-page-info');

    if (!tbody || !emptyState) return;
    tbody.innerHTML = '';

    if (bookings.length === 0) {
        tbody.style.display = 'none';
        emptyState.classList.remove('hidden');
        if (pageInfo) pageInfo.innerHTML = 'Showing <strong>0</strong> entries';
    } else {
        tbody.style.display = '';
        emptyState.classList.add('hidden');
        if (pageInfo) pageInfo.innerHTML = `Showing <strong>1 to ${bookings.length}</strong> of <strong>${bookings.length}</strong> entries`;

        bookings.forEach((b, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${b.id}</strong></td>
                <td>${b.name}</td>
                <td>${b.type}</td>
                <td>${b.date}</td>
                <td>${b.photographer}</td>
                <td><span class="status status-${b.status.toLowerCase()}">${b.status}</span></td>
                <td class="text-right">
                    <button class="btn-action" title="Mark Completed" onclick="toggleBookingStatus(${index})">✓</button>
                    <button class="btn-action text-error" title="Delete Booking" onclick="deleteBookingRecord(${index})">🗑️</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function toggleBookingStatus(index) {
    const bookings = getStorage('bookings');
    if (bookings[index]) {
        bookings[index].status = bookings[index].status === 'Confirmed' ? 'Completed' : 'Confirmed';
        setStorage('bookings', bookings);
        addActivityLog(`Booking ${bookings[index].id} marked as <strong>${bookings[index].status}</strong>`);
        loadAllDataFromStorage();
    }
}

function deleteBookingRecord(index) {
    if (confirm('Are you sure you want to permanently delete this booking record?')) {
        const bookings = getStorage('bookings');
        const removed = bookings.splice(index, 1)[0];
        setStorage('bookings', bookings);
        if (removed) {
            addActivityLog(`Booking ${removed.id} for <strong>${removed.name}</strong> was deleted.`);
            addNotification(`Booking Deleted: ${removed.id} removed from system.`);
        }
        loadAllDataFromStorage();
    }
}

function renderClientsTable() {
    const clients = getStorage('clients');
    const tbody = document.getElementById('clients-table-body');
    const emptyState = document.getElementById('clients-empty-state');

    if (!tbody || !emptyState) return;
    tbody.innerHTML = '';

    if (clients.length === 0) {
        tbody.style.display = 'none';
        emptyState.classList.remove('hidden');
    } else {
        tbody.style.display = '';
        emptyState.classList.add('hidden');

        clients.forEach((c, index) => {
            const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="client-cell">
                        <span class="avatar-sm">${initials}</span>
                        <strong>${c.name}</strong>
                    </div>
                </td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td><strong>${c.shoots} Shoot(s)</strong></td>
                <td>${c.lastVisit || 'N/A'}</td>
                <td><span class="status status-${c.status === 'VIP Account' ? 'vip' : 'active'}">${c.status}</span></td>
                <td class="text-right">
                    <button class="btn-action" title="Toggle VIP" onclick="toggleClientVIP(${index})">👑</button>
                    <button class="btn-action text-error" title="Delete Client" onclick="deleteClientRecord(${index})">🗑️</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function toggleClientVIP(index) {
    const clients = getStorage('clients');
    if (clients[index]) {
        clients[index].status = clients[index].status === 'VIP Account' ? 'Active' : 'VIP Account';
        setStorage('clients', clients);
        loadAllDataFromStorage();
    }
}

function deleteClientRecord(index) {
    if (confirm('Are you sure you want to delete this client record?')) {
        const clients = getStorage('clients');
        const removed = clients.splice(index, 1)[0];
        setStorage('clients', clients);
        if (removed) addActivityLog(`Client record for <strong>${removed.name}</strong> was removed.`);
        loadAllDataFromStorage();
    }
}

function openAddClientModal() {
    const name = prompt('Enter Client Name:');
    if (!name || !name.trim()) return;
    const phone = prompt('Enter Phone Number:', '+1 (555) 000-0000') || 'N/A';
    const email = prompt('Enter Email Address:', 'client@example.com') || 'N/A';

    const clients = getStorage('clients');
    clients.unshift({
        name: sanitizeInput(name.trim()),
        phone: sanitizeInput(phone.trim()),
        email: sanitizeInput(email.trim()),
        shoots: 0,
        lastVisit: 'Manual Add',
        status: 'Active'
    });
    setStorage('clients', clients);
    addActivityLog(`New client <strong>${name}</strong> added manually.`);
    addNotification(`New Client Added: ${name} registered in database.`);
    loadAllDataFromStorage();
    switchView('view-clients');
}

function renderSchedule() {
    const bookings = getStorage('bookings');
    const daysGrid = document.getElementById('calendar-days-grid');
    const todayList = document.getElementById('calendar-today-list');
    const todayEmpty = document.getElementById('schedule-today-empty');
    const upcomingList = document.getElementById('calendar-upcoming-list');
    const upcomingEmpty = document.getElementById('schedule-upcoming-empty');

    if (!daysGrid) return;
    daysGrid.innerHTML = '';

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(dh => {
        const div = document.createElement('div');
        div.className = 'cal-day-header';
        div.textContent = dh;
        daysGrid.appendChild(div);
    });

    const now = new Date();
    const currentDay = now.getDate();

    for (let i = 1; i <= 31; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'cal-day' + (i === currentDay ? ' active-today' : '');
        dayDiv.innerHTML = `<span>${i}</span>`;

        const dayBookings = bookings.filter(b => {
            if (!b.date) return false;
            const bDay = parseInt(b.date.split('-')[2], 10);
            return bDay === i;
        });

        dayBookings.forEach(b => {
            const badge = document.createElement('span');
            badge.className = 'cal-badge badge-' + (b.type.toLowerCase().includes('wed') ? 'wed' : 'comm');
            badge.textContent = `${b.time} - ${b.name.split(' ')[0]}`;
            dayDiv.appendChild(badge);
        });

        daysGrid.appendChild(dayDiv);
    }

    if (todayList && todayEmpty) {
        todayList.innerHTML = '';
        const todayStr = now.toISOString().split('T')[0];
        const todayBookings = bookings.filter(b => b.date === todayStr);

        if (todayBookings.length === 0) {
            todayList.style.display = 'none';
            todayEmpty.style.display = 'block';
        } else {
            todayList.style.display = 'flex';
            todayEmpty.style.display = 'none';
            todayBookings.forEach(b => {
                const item = document.createElement('div');
                item.className = 'event-item';
                item.innerHTML = `
                    <div class="event-time">${b.time} • ${b.location}</div>
                    <strong>${b.name} // ${b.type}</strong>
                    <p class="text-muted">Photographer: ${b.photographer}</p>
                `;
                todayList.appendChild(item);
            });
        }
    }

    if (upcomingList && upcomingEmpty) {
        upcomingList.innerHTML = '';
        if (bookings.length === 0) {
            upcomingList.style.display = 'none';
            upcomingEmpty.style.display = 'block';
        } else {
            upcomingList.style.display = 'flex';
            upcomingEmpty.style.display = 'none';
            bookings.slice(0, 4).forEach(b => {
                const item = document.createElement('div');
                item.className = 'event-item';
                item.innerHTML = `
                    <div class="event-time">${b.date} at ${b.time}</div>
                    <strong>${b.name} // ${b.pkg} Tier</strong>
                    <p class="text-muted">${b.location}</p>
                `;
                upcomingList.appendChild(item);
            });
        }
    }
}

function changeCalendarMonth(delta) {
    alert('Monthly view navigation: Currently displaying live schedule for July 2026.');
}

function resetCalendarMonth() {
    loadAllDataFromStorage();
}

function renderGallery() {
    const photos = getStorage('photos');
    const grid = document.getElementById('gallery-admin-grid');
    const emptyState = document.getElementById('gallery-empty-state');

    if (!grid || !emptyState) return;
    grid.innerHTML = '';

    const activeBtn = document.querySelector('#view-gallery .filter-btn.active');
    const filterCat = activeBtn ? activeBtn.getAttribute('data-cat') : 'all';

    if (filterCat === 'empty-test') {
        emptyState.classList.remove('hidden');
        return;
    }

    const filtered = photos.filter(p => filterCat === 'all' || p.category === filterCat);

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        filtered.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'gallery-card card';
            card.setAttribute('data-cat', p.category);
            card.innerHTML = `
                <div class="photo-placeholder photo-${p.bgStyle || 'wed-1'}" style="background: ${p.bgGradient || '#222'};">
                    <span class="photo-cat-badge">${p.category}</span>
                    <button class="photo-delete-btn" title="Delete Photo" onclick="deletePhotoRecord(${index})">✕</button>
                </div>
                <div class="photo-meta">
                    <strong>${p.title}</strong>
                    <span class="text-muted">Uploaded by ${p.uploader} • ${p.size}</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

function openUploadPhotoModal() {
    const title = prompt('Enter Photo / Session Title:', 'Editorial Master Study #01');
    if (!title || !title.trim()) return;
    const catInput = prompt('Enter Category (wedding, portrait, fashion, events, commercial, nature):', 'fashion') || 'portrait';
    const category = catInput.toLowerCase().trim();

    const photos = getStorage('photos');
    photos.unshift({
        title: sanitizeInput(title.trim()),
        category: category,
        uploader: 'Sarah Jenkins',
        size: (Math.floor(200 + Math.random() * 500) / 10) + ' MB',
        bgGradient: 'radial-gradient(circle at center, #3a3a3a 0%, #0a0a0a 100%)',
        bgStyle: 'wed-1'
    });
    setStorage('photos', photos);
    addActivityLog(`New photo master <strong>${title}</strong> uploaded to gallery.`);
    addNotification(`Gallery Upload: New master file added to ${category} archive.`);
    loadAllDataFromStorage();
}

function deletePhotoRecord(index) {
    if (confirm('Delete this photo master from the archive?')) {
        const photos = getStorage('photos');
        const removed = photos.splice(index, 1)[0];
        setStorage('photos', photos);
        if (removed) addActivityLog(`Photo master <strong>${removed.title}</strong> deleted.`);
        loadAllDataFromStorage();
    }
}

function initGalleryFiltering() {
    const filterBtns = document.querySelectorAll('#view-gallery .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery();
        });
    });
}

function renderPayments() {
    const invoices = getStorage('invoices');
    const tbody = document.getElementById('payments-table-body');
    const emptyState = document.getElementById('payments-empty-state');
    const totalRevEl = document.getElementById('pay-total-revenue');
    const pendingAmtEl = document.getElementById('pay-pending-amount');
    const pendingCntEl = document.getElementById('pay-pending-count');
    const completedAmtEl = document.getElementById('pay-completed-amount');
    const completedCntEl = document.getElementById('pay-completed-count');
    const totalInvEl = document.getElementById('pay-total-invoices');

    if (!tbody || !emptyState) return;
    tbody.innerHTML = '';

    let totalRev = 0;
    let pendingRev = 0;
    let pendingCount = 0;
    let completedRev = 0;
    let completedCount = 0;

    invoices.forEach(inv => {
        const val = inv.rawAmount || 0;
        if (inv.status === 'Paid' || inv.status === 'Completed') {
            totalRev += val;
            completedRev += val;
            completedCount++;
        } else {
            pendingRev += val;
            pendingCount++;
        }
    });

    if (totalRevEl) totalRevEl.textContent = '$' + totalRev.toLocaleString();
    if (pendingAmtEl) pendingAmtEl.textContent = '$' + pendingRev.toLocaleString();
    if (pendingCntEl) pendingCntEl.textContent = `${pendingCount} Open Invoices`;
    if (completedAmtEl) completedAmtEl.textContent = '$' + completedRev.toLocaleString();
    if (completedCntEl) completedCntEl.textContent = `${completedCount} Settled Invoices`;
    if (totalInvEl) totalInvEl.textContent = invoices.length;

    if (invoices.length === 0) {
        tbody.style.display = 'none';
        emptyState.classList.remove('hidden');
    } else {
        tbody.style.display = '';
        emptyState.classList.add('hidden');
        invoices.forEach((inv, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${inv.id}</strong></td>
                <td>${inv.clientName}</td>
                <td><strong>${inv.amount}</strong></td>
                <td>${inv.date}</td>
                <td>${inv.method}</td>
                <td><span class="status status-${inv.status === 'Paid' ? 'completed' : 'pending'}">${inv.status}</span></td>
                <td class="text-right">
                    <button class="btn-action" title="Mark Paid" onclick="toggleInvoiceStatus(${index})">💰</button>
                    <button class="btn-action text-error" title="Delete Invoice" onclick="deleteInvoiceRecord(${index})">🗑️</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function toggleInvoiceStatus(index) {
    const invoices = getStorage('invoices');
    if (invoices[index]) {
        invoices[index].status = invoices[index].status === 'Paid' ? 'Pending' : 'Paid';
        setStorage('invoices', invoices);
        addActivityLog(`Invoice ${invoices[index].id} marked as <strong>${invoices[index].status}</strong>`);
        loadAllDataFromStorage();
    }
}

function deleteInvoiceRecord(index) {
    if (confirm('Delete this billing invoice record?')) {
        const invoices = getStorage('invoices');
        invoices.splice(index, 1);
        setStorage('invoices', invoices);
        loadAllDataFromStorage();
    }
}

function openCreateInvoiceModal() {
    const clientName = prompt('Enter Client Name:', 'Chronos Horology Group');
    if (!clientName || !clientName.trim()) return;
    const amountStr = prompt('Enter Invoice Amount in USD (numbers only):', '3500');
    const amountVal = parseFloat(amountStr) || 1000;

    const invoices = getStorage('invoices');
    invoices.unshift({
        id: '#INV-' + Math.floor(1000 + Math.random() * 9000),
        clientName: sanitizeInput(clientName.trim()),
        amount: '$' + amountVal.toLocaleString() + '.00',
        rawAmount: amountVal,
        date: new Date().toISOString().split('T')[0],
        method: 'Bank Wire Transfer',
        status: 'Pending'
    });
    setStorage('invoices', invoices);
    addActivityLog(`New manual invoice created for <strong>${clientName}</strong> ($${amountVal})`);
    addNotification(`Invoice Generated: New billing sent to ${clientName}.`);
    loadAllDataFromStorage();
}

function renderTestimonials() {
    const reviews = getStorage('testimonials');
    const grid = document.getElementById('testimonials-grid-container');
    const emptyState = document.getElementById('testimonials-empty-state');

    if (!grid || !emptyState) return;
    grid.innerHTML = '';

    if (reviews.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        reviews.forEach((r, index) => {
            const initials = r.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            const card = document.createElement('div');
            card.className = 'testimonial-card card';
            card.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-profile">
                        <div class="avatar-md">${initials}</div>
                        <div>
                            <h3 class="reviewer-name">${r.name}</h3>
                            <span class="reviewer-role">${r.role}</span>
                        </div>
                    </div>
                    <div class="review-stars">★ ★ ★ ★ ★</div>
                </div>
                <blockquote class="review-body">"${r.quote}"</blockquote>
                <div class="review-footer">
                    <span class="tag">Verified • ${r.category}</span>
                    <button class="btn btn-sm btn-outline text-error" onclick="deleteReviewRecord(${index})">Delete</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

function openAddReviewModal() {
    const name = prompt('Enter Client Name for Review:', 'Victoria Sterling');
    if (!name || !name.trim()) return;
    const role = prompt('Enter Client Title / Company:', 'Vogue Editorial Director') || 'Private Client';
    const quote = prompt('Enter Testimonial Quote:', 'LUMEN Studio transformed our production into a timeless masterpiece.');
    if (!quote || !quote.trim()) return;

    const reviews = getStorage('testimonials');
    reviews.unshift({
        name: sanitizeInput(name.trim()),
        role: sanitizeInput(role.trim()),
        quote: sanitizeInput(quote.trim()),
        category: 'Editorial'
    });
    setStorage('testimonials', reviews);
    addActivityLog(`New client testimonial added from <strong>${name}</strong>`);
    addNotification(`New Review: Testimonial submitted by ${name}.`);
    loadAllDataFromStorage();
}

function deleteReviewRecord(index) {
    if (confirm('Remove this testimonial from the repository?')) {
        const reviews = getStorage('testimonials');
        reviews.splice(index, 1);
        setStorage('testimonials', reviews);
        loadAllDataFromStorage();
    }
}

function initNotifications() {
    const toggleBtn = document.getElementById('notif-toggle-btn');
    const panel = document.getElementById('notification-panel');
    const clearBtn = document.getElementById('clear-notif-btn');

    if (toggleBtn && panel) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = panel.classList.toggle('hidden');
            toggleBtn.setAttribute('aria-expanded', !isHidden);
        });

        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                panel.classList.add('hidden');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            setStorage('notifications', []);
            renderNotificationsList();
        });
    }
}

function renderNotificationsList() {
    const notifs = getStorage('notifications');
    const container = document.getElementById('notif-list-container');
    const emptyState = document.getElementById('notif-empty-state');
    const badge = document.getElementById('notif-count-badge');

    if (!container || !emptyState || !badge) return;
    container.innerHTML = '';

    if (notifs.length === 0) {
        container.style.display = 'none';
        emptyState.classList.remove('hidden');
        badge.textContent = '0';
        badge.style.display = 'none';
    } else {
        container.style.display = 'flex';
        emptyState.classList.add('hidden');
        badge.textContent = notifs.length > 9 ? '9+' : notifs.length;
        badge.style.display = 'flex';

        notifs.forEach(n => {
            const item = document.createElement('div');
            item.className = 'notif-item';
            item.innerHTML = `
                <span>${n.text}</span>
                <span class="notif-item-time">${n.time}</span>
            `;
            container.appendChild(item);
        });
    }
}

function addNotification(text) {
    const notifs = getStorage('notifications');
    notifs.unshift({
        text: text,
        time: 'Just now'
    });
    setStorage('notifications', notifs);
    renderNotificationsList();
}

function addActivityLog(text) {
    const activities = getStorage('activities');
    activities.unshift({
        text: text,
        time: 'Just now',
        type: 'success'
    });
    setStorage('activities', activities);
}

function clearAllLocalStorage() {
    if (confirm('WARNING: Are you sure you want to wipe ALL studio data from localStorage and reset to zero state?')) {
        localStorage.clear();
        loadAllDataFromStorage();
        alert('All localStorage data cleared! Studio system reset to zero state.');
    }
}

function applySettings() {
    const settings = getStorage('settings') || {};
    if (settings.studioName) {
        const brandName = document.getElementById('sidebar-brand-name');
        const infoName = document.getElementById('info-studio-name');
        const pinName = document.getElementById('map-pin-name');
        const inputName = document.getElementById('set-studio-name');
        if (brandName) brandName.innerHTML = `${settings.studioName} <span>//</span> STUDIO`;
        if (infoName) infoName.innerHTML = `<strong>${settings.studioName} FLAGSHIP</strong>`;
        if (pinName) pinName.textContent = settings.studioName;
        if (inputName) inputName.value = settings.studioName;
    }
}

function saveStudioSettings(e) {
    e.preventDefault();
    const inputName = document.getElementById('set-studio-name');
    const settings = getStorage('settings') || {};
    if (inputName) settings.studioName = sanitizeInput(inputName.value.trim());
    setStorage('settings', settings);

    addNotification('Settings Saved: Studio preferences updated.');
    applySettings();

    const statusEl = document.getElementById('settings-status');
    if (statusEl) {
        statusEl.textContent = '✓ Studio configuration saved to localStorage.';
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

function initSkeletonToggle() {
    const skeletonBtn = document.getElementById('toggle-skeleton-btn');
    const mainContent = document.getElementById('main-content');
    if (skeletonBtn && mainContent) {
        skeletonBtn.addEventListener('click', () => {
            const isSkeleton = mainContent.classList.toggle('loading-skeleton');
            skeletonBtn.setAttribute('aria-pressed', isSkeleton);
            const btnText = skeletonBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = isSkeleton ? 'Disable Loading State' : 'Simulate Loading State';
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
