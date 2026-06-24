"use strict";
const CashFlowApp = (function () {
  const LS_SALARY = "cf_salary", LS_EXPENSES = "cf_expenses", LS_CURRENCY = "cf_currency";
  let AppState = { salary: 0, expenses: [], currency: "INR", exchangeRate: 1, currencySymbol: "₹", sortMode: "date", bannerDismissed: false };
  const EXPENSE_ICONS = { rent: "🏠", home: "🏠", house: "🏠", food: "🍔", eat: "🍔", groceries: "🛒", grocery: "🛒", travel: "✈️", flight: "✈️", hotel: "🏨", transport: "🚗", taxi: "🚕", uber: "🚗", car: "🚗", petrol: "⛽", health: "💊", medicine: "💊", hospital: "🏥", gym: "💪", shop: "🛍️", shopping: "🛍️", clothes: "👗", phone: "📱", mobile: "📱", internet: "🌐", wifi: "📶", education: "📚", course: "📚", book: "📖", tuition: "📚", movie: "🎬", entertainment: "🎮", gaming: "🎮", coffee: "☕", cafe: "☕", utilities: "💡", electricity: "💡", water: "💧", emi: "🏦", loan: "🏦", bank: "🏦", default: "💸" };
  const CURRENCY_SYMBOLS = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥" };
  let _toastTimer = null, DOM = {};

  const $ = id => document.getElementById(id);
  function cacheElements() {
    DOM = {
      currencySelect: $("currency-select"), rateBadge: $("rate-badge"), downloadBtn: $("download-btn"), resetBtn: $("reset-btn"),
      thresholdBanner: $("threshold-banner"), bannerMessage: $("banner-message"), bannerClose: $("banner-close"),
      salaryDisplayMode: $("salary-display-mode"), salaryHugeDisplay: $("salary-huge-display"), showAddIncomeBtn: $("show-add-income-btn"),
      salaryInputMode: $("salary-input-mode"), cancelIncomeBtn: $("cancel-income-btn"),
      salaryInput: $("salary-input"), setSalaryBtn: $("set-salary-btn"), salaryError: $("salary-error"), salaryPrefix: $("salary-prefix"),
      statSalary: $("stat-salary"), statSpent: $("stat-spent"), balanceCard: $("balance-card"), balanceDisplay: $("balance-display"),
      balanceBar: $("balance-bar"), balancePct: $("balance-pct"), expenseName: $("expense-name"), expenseAmount: $("expense-amount"),
      expensePrefix: $("expense-prefix"), expenseError: $("expense-error"), addExpenseBtn: $("add-expense-btn"), expenseList: $("expense-list"),
      emptyState: $("empty-state"), expensesCount: $("expenses-count"), sortBtns: document.querySelectorAll(".sort-btn"),
      pieChart: $("pie-chart"), chartEmpty: $("chart-empty"), toast: $("toast"), resetModal: $("reset-modal"),
      modalCancelBtn: $("modal-cancel-btn"), modalConfirmBtn: $("modal-confirm-btn")
    };
  }

  function setupListeners() {
    DOM.currencySelect.addEventListener("change", e => handleCurrencyChange(e.target.value));
    DOM.downloadBtn.addEventListener("click", downloadReport);
    DOM.resetBtn.addEventListener("click", () => DOM.resetModal.classList.remove("hidden"));
    DOM.bannerClose.addEventListener("click", () => { AppState.bannerDismissed = true; DOM.thresholdBanner.classList.add("hidden"); });
    DOM.showAddIncomeBtn.addEventListener("click", () => { DOM.salaryDisplayMode.classList.add("hidden"); DOM.salaryInputMode.classList.remove("hidden"); DOM.cancelIncomeBtn.classList.remove("hidden"); DOM.salaryInput.focus(); });
    DOM.cancelIncomeBtn.addEventListener("click", () => { DOM.salaryInputMode.classList.add("hidden"); DOM.salaryDisplayMode.classList.remove("hidden"); DOM.salaryInput.value = ""; clearError(DOM.salaryError, DOM.salaryInput); });
    DOM.setSalaryBtn.addEventListener("click", setSalary);
    DOM.salaryInput.addEventListener("keydown", e => { if (e.key === "Enter") setSalary(); });
    DOM.salaryInput.addEventListener("input", () => clearError(DOM.salaryError, DOM.salaryInput));
    DOM.addExpenseBtn.addEventListener("click", addExpense);
    DOM.expenseName.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); DOM.expenseAmount.focus(); } });
    DOM.expenseAmount.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addExpense(); } });
    DOM.expenseName.addEventListener("input", () => clearError(DOM.expenseError, DOM.expenseName));
    DOM.expenseAmount.addEventListener("input", () => clearError(DOM.expenseError, DOM.expenseAmount));
    DOM.sortBtns.forEach(btn => btn.addEventListener("click", e => setSortMode(e.target.dataset.sort, e.target)));
    DOM.expenseList.addEventListener("click", e => {
      const btn = e.target.closest(".expense-delete");
      if (btn) deleteExpense(btn.closest(".expense-item").dataset.id);
    });
    DOM.modalCancelBtn.addEventListener("click", () => DOM.resetModal.classList.add("hidden"));
    DOM.modalConfirmBtn.addEventListener("click", confirmReset);
  }

  function saveState() {
    localStorage.setItem(LS_SALARY, JSON.stringify(AppState.salary));
    localStorage.setItem(LS_EXPENSES, JSON.stringify(AppState.expenses));
    localStorage.setItem(LS_CURRENCY, AppState.currency);
  }
  function loadState() {
    const s = localStorage.getItem(LS_SALARY), e = localStorage.getItem(LS_EXPENSES), c = localStorage.getItem(LS_CURRENCY);
    if (s !== null) AppState.salary = JSON.parse(s);
    if (e !== null) AppState.expenses = JSON.parse(e);
    if (c !== null) AppState.currency = c;
  }

  const getExpenseIcon = name => {
    const l = name.toLowerCase();
    for (const [k, i] of Object.entries(EXPENSE_ICONS)) if (l.includes(k)) return i;
    return EXPENSE_ICONS.default;
  };
  const fmt = amt => {
    const cv = amt * AppState.exchangeRate, sym = AppState.currencySymbol;
    return AppState.currency === "JPY" ? `${sym}${Math.round(cv).toLocaleString("en-IN")}` : `${sym}${cv.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  const escapeHTML = str => { const div = document.createElement("div"); div.textContent = str; return div.innerHTML; };
  const generateId = () => `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const getTotalExpenses = () => AppState.expenses.reduce((s, e) => s + e.amount, 0);
  const getRemainingBalance = () => AppState.salary - getTotalExpenses();
  const getBalancePct = () => AppState.salary === 0 ? 100 : Math.max(0, (getRemainingBalance() / AppState.salary) * 100);

  function showToast(msg, type = "info") {
    DOM.toast.textContent = msg; DOM.toast.className = `toast ${type}`;
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => DOM.toast.classList.add("hidden"), 3000);
  }
  function showError(errEl, inpEl, msg) { errEl.textContent = msg; errEl.classList.remove("hidden"); if (inpEl) inpEl.classList.add("error"); }
  function clearError(errEl, inpEl) { errEl.textContent = ""; errEl.classList.add("hidden"); if (inpEl) inpEl.classList.remove("error"); }

  function setSalary() {
    const raw = DOM.salaryInput.value.trim(); clearError(DOM.salaryError, DOM.salaryInput);
    if (raw === "" || isNaN(raw) || parseFloat(raw) <= 0) return showError(DOM.salaryError, DOM.salaryInput, "Enter a valid positive income.");
    AppState.salary += parseFloat(raw); saveState(); renderAll(); showToast("Income added.", "success");
    DOM.salaryInput.value = ""; if ("ontouchstart" in window) document.activeElement?.blur();
  }
  function addExpense() {
    const name = DOM.expenseName.value.trim(), amt = parseFloat(DOM.expenseAmount.value.trim());
    clearError(DOM.expenseError, DOM.expenseName); clearError(DOM.expenseError, DOM.expenseAmount);
    if (!name) return showError(DOM.expenseError, DOM.expenseName, "Name cannot be empty."), DOM.expenseName.focus();
    if (isNaN(amt) || amt <= 0) return showError(DOM.expenseError, DOM.expenseAmount, "Enter a valid positive amount."), DOM.expenseAmount.focus();
    if (AppState.salary === 0) return showError(DOM.expenseError, null, "Set salary first.");
    AppState.expenses.push({ id: generateId(), name, amount: amt, date: new Date().toISOString(), icon: getExpenseIcon(name) });
    saveState(); renderAll(); checkThreshold();
    DOM.expenseName.value = ""; DOM.expenseAmount.value = "";
    "ontouchstart" in window ? document.activeElement?.blur() : DOM.expenseName.focus();
    showToast(`"${name}" added.`, "success");
  }
  function deleteExpense(id) {
    const exp = AppState.expenses.find(e => e.id === id); if (!exp) return;
    AppState.expenses = AppState.expenses.filter(e => e.id !== id);
    saveState(); renderAll(); checkThreshold(); showToast(`"${exp.name}" removed.`, "info");
  }
  function confirmReset() {
    AppState.salary = 0; AppState.expenses = []; AppState.bannerDismissed = false;
    localStorage.removeItem(LS_SALARY); localStorage.removeItem(LS_EXPENSES);
    DOM.thresholdBanner.classList.add("hidden"); DOM.balanceCard.classList.remove("warn", "danger"); DOM.rateBadge.classList.add("hidden");
    renderAll(); DOM.resetModal.classList.add("hidden"); showToast("All data cleared.", "info");
  }

  function checkThreshold() {
    const pct = getBalancePct(), spent = getTotalExpenses(), isOverspent = spent > AppState.salary;
    DOM.balanceCard.classList.remove("warn", "danger");
    if (AppState.salary === 0 || AppState.expenses.length === 0) return DOM.thresholdBanner.classList.add("hidden");
    if (isOverspent || pct <= 10) {
      DOM.balanceCard.classList.add("danger");
      if (!AppState.bannerDismissed) {
        DOM.bannerMessage.textContent = isOverspent ? `Critical: You have overspent your budget by ${fmt(spent - AppState.salary)}.` : `Critical: Only ${pct.toFixed(1)}% of your salary remains.`;
        DOM.thresholdBanner.classList.remove("hidden");
      }
    } else if (pct <= 25) {
      DOM.balanceCard.classList.add("warn"); DOM.thresholdBanner.classList.add("hidden"); AppState.bannerDismissed = false;
    } else { DOM.thresholdBanner.classList.add("hidden"); AppState.bannerDismissed = false; }
  }

  function setSortMode(mode, btn) {
    AppState.sortMode = mode; DOM.sortBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active"); renderExpenseList();
  }
  function getSortedExpenses() {
    const list = [...AppState.expenses];
    return AppState.sortMode === "amount" ? list.sort((a, b) => b.amount - a.amount) :
      AppState.sortMode === "name" ? list.sort((a, b) => a.name.localeCompare(b.name)) :
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function renderStats() {
    const sal = AppState.salary, spent = getTotalExpenses(), bal = getRemainingBalance(), pct = getBalancePct();
    DOM.statSalary.textContent = sal > 0 ? fmt(sal) : "—"; DOM.statSpent.textContent = AppState.expenses.length > 0 ? fmt(spent) : "—";
    DOM.balanceDisplay.textContent = sal > 0 ? fmt(bal) : "—"; DOM.balanceBar.style.width = sal > 0 ? `${Math.max(0, pct)}%` : "100%";
    if (sal > 0) {
      if (spent > sal) { DOM.balancePct.textContent = `Overspent by ${(((spent - sal) / sal) * 100).toFixed(1)}%`; DOM.balancePct.classList.add("danger-text"); }
      else { DOM.balancePct.textContent = `${pct.toFixed(1)}% remaining`; DOM.balancePct.classList.remove("danger-text"); }
      DOM.salaryHugeDisplay.textContent = fmt(sal);
      DOM.salaryInputMode.classList.add("hidden"); DOM.salaryDisplayMode.classList.remove("hidden");
    } else {
      DOM.balancePct.textContent = ""; DOM.balancePct.classList.remove("danger-text");
      DOM.salaryInputMode.classList.remove("hidden"); DOM.salaryDisplayMode.classList.add("hidden"); DOM.cancelIncomeBtn.classList.add("hidden");
    }
    DOM.salaryPrefix.textContent = DOM.expensePrefix.textContent = AppState.currencySymbol;
  }

  function renderExpenseList() {
    const sorted = getSortedExpenses(), n = sorted.length;
    DOM.expensesCount.textContent = `${n} entry${n === 1 ? "" : "s"}`;
    if (n === 0) { DOM.emptyState.classList.remove("hidden"); DOM.expenseList.innerHTML = ""; return; }
    DOM.emptyState.classList.add("hidden");
    DOM.expenseList.innerHTML = sorted.map(e => `
      <li class="expense-item" data-id="${e.id}">
        <div class="expense-icon">${e.icon || "💸"}</div>
        <div class="expense-meta"><div class="expense-name">${escapeHTML(e.name)}</div><div class="expense-date">${new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div></div>
        <div class="expense-amount">−${fmt(e.amount)}</div>
        <button class="expense-delete" aria-label="Delete" title="Remove"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,01-2,2H7a2,2,0,01-2-2V6m3,0V4a2,2,0,012-2h4a2,2,0,012,2v2"/></svg></button>
      </li>`).join("");
  }

  function renderChart() {
    const sal = AppState.salary, spent = getTotalExpenses();
    if (window._cfChart) { window._cfChart.destroy(); window._cfChart = null; }
    if (sal === 0) return DOM.pieChart.classList.add("hidden"), DOM.chartEmpty.classList.remove("hidden");
    DOM.pieChart.classList.remove("hidden"); DOM.chartEmpty.classList.add("hidden");
    window._cfChart = new Chart(DOM.pieChart, {
      type: "doughnut",
      data: { labels: ["Remaining", "Spent"], datasets: [{ data: spent > sal ? [0, sal] : [Math.max(0, sal - spent), spent], backgroundColor: ["#10B981", "#EF4444"], hoverBackgroundColor: ["#059669", "#DC2626"], borderWidth: 0, hoverOffset: 4 }] },
      options: { responsive: true, cutout: "68%", plugins: { legend: { position: "bottom", labels: { color: "#64748B", font: { family: "'Inter', sans-serif", size: 11 }, padding: 14, boxWidth: 10, boxHeight: 10 } }, tooltip: { backgroundColor: "#111E35", borderColor: "rgba(255,255,255,0.06)", borderWidth: 1, titleColor: "#F1F5F9", bodyColor: "#94A3B8", callbacks: { label: c => ` ${c.label}: ${fmt(c.raw)}` } } } }
    });
  }
  function renderAll() { renderStats(); renderExpenseList(); renderChart(); }

  async function handleCurrencyChange(newCurrency) {
    AppState.currency = newCurrency; AppState.currencySymbol = CURRENCY_SYMBOLS[newCurrency] || newCurrency; saveState();
    if (newCurrency === "INR") { AppState.exchangeRate = 1; DOM.rateBadge.classList.add("hidden"); return renderAll(); }
    DOM.rateBadge.textContent = "fetching…"; DOM.rateBadge.classList.remove("hidden");
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?from=INR&to=${newCurrency}`), rate = (await res.json()).rates[newCurrency];
      if (!rate) throw new Error("Rate err");
      AppState.exchangeRate = rate; DOM.rateBadge.textContent = `1 ₹ = ${rate.toFixed(4)} ${newCurrency}`; renderAll();
    } catch { AppState.exchangeRate = 1; DOM.rateBadge.textContent = "rate error"; showToast("Exchange rate error.", "error"); renderAll(); }
  }

  function downloadReport() {
    if (AppState.salary === 0) return showToast("Set salary first.", "error");
    const doc = new window.jspdf.jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("Prodesk IT - Cash-Flow Report", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, 14, 30);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Financial Summary", 14, 45);

    doc.setFontSize(11);
    doc.text(`Total Salary: ${fmt(AppState.salary)}`, 14, 53);
    doc.text(`Total Expenses: ${fmt(getTotalExpenses())}`, 14, 60);
    doc.text(`Remaining Balance: ${fmt(getRemainingBalance())}`, 14, 67);

    if (AppState.expenses.length > 0) {
      const tableData = getSortedExpenses().map((e, i) => [
        i + 1,
        e.name,
        new Date(e.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        `-${fmt(e.amount)}`
      ]);

      doc.autoTable({
        startY: 75,
        head: [["#", "Expense Name", "Date", "Amount"]],
        body: tableData,
        theme: "striped",
        headStyles: { fillColor: [99, 102, 241] },
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: { 3: { halign: "right", textColor: [239, 68, 68] } },
        foot: [["", "", "Total Expenses:", `-${fmt(getTotalExpenses())}`]],
        footStyles: { fillColor: [17, 30, 53], textColor: [241, 245, 249], fontStyle: "bold", halign: "right" }
      });
    }

    doc.save(`CashFlow-Report-${Date.now()}.pdf`);
    showToast("Report downloaded.", "success");
  }

  return {
    init: () => {
      cacheElements(); setupListeners(); loadState(); DOM.currencySelect.value = AppState.currency;
      if (AppState.currency !== "INR") { AppState.currencySymbol = CURRENCY_SYMBOLS[AppState.currency] || AppState.currency; handleCurrencyChange(AppState.currency); } else renderAll(); checkThreshold();
    }
  };
})();
document.addEventListener("DOMContentLoaded", CashFlowApp.init);
