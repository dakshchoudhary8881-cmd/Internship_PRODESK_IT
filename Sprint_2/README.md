<div align="center">

# 📊 Cash-Flow Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
</p>

<p align="center">
  <strong>A modern, responsive, and robust personal finance management web application.</strong>
</p>

</div>

<br />

## 📖 Overview

**Cash-Flow Dashboard** is a comprehensive, client-side personal finance management tool built to help users take control of their finances with ease. It features an intuitive, modern interface for tracking income and expenses, visualizing spending habits, and generating professional reports. With multi-currency support and local data persistence, it offers a secure and seamless experience directly in the browser, without the need for complex backend setups.

## ✨ Key Features

- **💰 Income & Expense Management**: Easily log, categorize, and track your financial transactions.
- **📈 Real-Time Balance**: Instantly view your current balance with automatic calculations.
- **🗑️ Expense Deletion**: Flexibly remove entries to keep your records accurate.
- **📊 Interactive Visualizations**: Gain deep insights into your spending patterns with dynamic `Chart.js` integration.
- **📄 PDF Reporting**: Export professional-grade financial reports in a single click using `jsPDF`.
- **💱 Multi-Currency Support**: Convert values on-the-fly between major currencies (INR, USD, EUR, GBP, JPY) using the Frankfurter API.
- **⚠️ Smart Alerts**: Get low balance threshold alerts to stay on top of your financial health.
- **💾 LocalStorage Persistence**: Your data stays securely on your device, persisting across sessions.
- **📱 Fully Responsive**: A flawless, app-like experience across desktop, tablet, and mobile devices.

---

## 📸 Screenshots

> **Note:** Placeholders for screenshots. Add your actual application screenshots to the `assets` folder and update the links below.

<details>
<summary><b>Click to expand and view screenshots</b></summary>
<br>

| Dashboard Overview | Interactive Analytics |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350.png?text=Dashboard+Overview" alt="Dashboard View" width="100%"> | <img src="https://via.placeholder.com/600x350.png?text=Expense+Charts" alt="Analytics View" width="100%"> |

| PDF Report Generation | Multi-Currency Converter |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350.png?text=PDF+Report" alt="PDF Generation" width="100%"> | <img src="https://via.placeholder.com/600x350.png?text=Currency+Converter" alt="Currency Converter" width="100%"> |

</details>

---

## 🛠️ Tech Stack

- **Frontend Core**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **Document Generation**: [jsPDF](https://parall.ax/products/jspdf)
- **Data Persistence**: Web Storage API (LocalStorage)
- **External API**: [Frankfurter Exchange Rate API](https://www.frankfurter.app/)

---

## 🚀 Installation & Setup

Running the Cash-Flow Dashboard locally is incredibly simple as it requires no backend or build steps.

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cash-flow-dashboard.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd cash-flow-dashboard
   ```

3. **Open the application**
   Simply double-click the `index.html` file to open it in your preferred modern web browser.
   
   *Optional: For the best development experience, use a local server like VS Code's "Live Server" extension.*
   ```bash
   # If you have live-server installed via npm
   npx live-server
   ```

---

## 📁 Folder Structure

```text
cash-flow-dashboard/
├── index.html          # Main application structure
├── style.css           # UI styling and responsive layouts
├── script.js           # Core application logic, Chart.js, and API integration
├── assets/             # Directory for images, icons, and screenshots
└── README.md           # Project documentation
```

*(Note: Depending on your exact structure, adjust the filenames above if you split your CSS/JS into multiple files)*

---

## 🌐 Deployment

Since this project is purely frontend, it can be deployed for free on platforms like **GitHub Pages**, **Vercel**, or **Netlify** in seconds.

**Deploying on GitHub Pages:**
1. Push your code to a public GitHub repository.
2. Go to your repository **Settings** > **Pages**.
3. Select the `main` branch as the source and click **Save**.
4. Your dashboard will be live and accessible via a public URL shortly!

---

## 🔮 Future Improvements

- [ ] **Cloud Sync:** Integrate Firebase or Supabase to allow users to sync data across multiple devices.
- [ ] **Custom Categories:** Allow users to create and manage their own expense/income categories.
- [ ] **Data Export/Import:** Add support for exporting and importing data in CSV format.
- [ ] **Budget Goals:** Implement a feature to set monthly budgets and track progress.
- [ ] **Dark Mode Toggle:** Add a sleek dark mode theme for better nighttime viewing.

---

## 👨‍💻 Author

**Daksh Choudhary**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Daksh Choudhary](https://linkedin.com/in/yourprofile)

---

<p align="center">
  <i>Made with ❤️ for better personal finance management.</i>
</p>
