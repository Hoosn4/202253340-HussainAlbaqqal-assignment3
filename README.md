
# Hussain Albaggal - Software Engineering Portfolio
## **Assignment 2: Interactive Features**

> A responsive and interactive personal portfolio showcasing dynamic content and modern web development practices.

---

##  Project Overview
This project is an evolution of my foundation portfolio (Assignment 1), now enhanced with interactive features and robust data handling. It serves as a professional showcase of my work as a Software Engineering student at King Fahd University of Petroleum and Minerals (KFUPM).

##  Assignment 2 Requirements Checklist
This project fulfills all criteria for Assignment 2 as follows:

| Requirement | Implementation Status | Features Added |
| :--- | :---: | :--- |
| **Dynamic Content** | ✅ | Time-based greeting & Real-time project category filtering |
| **Data Handling** | ✅ | Persistent Dark/Light mode via `localStorage` & Regex form validation |
| **Animations** | ✅ | Smooth section transitions, interactive card hovers, and theme fading |
| **Error Handling** | ✅ | Inline form feedback & "No projects found" empty state for filtering |
| **AI Integration** | ✅ | Documented workflow with GitHub Copilot and Claude AI |

---

##  Tech Stack
* **Structure:** Semantic HTML5 for improved accessibility and SEO
* **Styling:** CSS3 Custom Properties (Variables) for the global theme engine and Flexbox for responsive design
---

##  Project Structure
```text
202253340-HussainAlbaggal-assignment2/
├── README.md                      # Project documentation and guide
├── index.html                     # Main entry point with semantic HTML5
├── css/
│   └── styles.css                 # Custom properties and responsive layout
├── js/
│   └── script.js                  # Filtering, theme, and validation logic
├── docs/
│   ├── ai-usage-report.md         # AI integration details
│   └── technical-documentation.md # Feature logic and architecture
└── .gitignore                     # Git exclusion rules
````

-----

##  Installation & Running Locally

### Prerequisites

  * A modern web browser (Chrome, Firefox, Safari, or Edge).

### Steps to Run

**1. Clone the repository**

```bash
git clone [https://github.com/Hoosn4/s202253340-HussainAlbaggal-assignment2.git](https://github.com/Hoosn4/s202253340-HussainAlbaggal-assignment2.git)
cd s202253340-HussainAlbaggal-assignment2
```

**2. Open the project**

  * **Directly:** Double-click `index.html` in your file explorer.
  * **Local Server (Recommended):** Use a local server to ensure scripts load optimally:

<!-- end list -->

```bash
# If you have Python installed:
python -m http.server 8000
```

Then visit: `http://localhost:8000`

-----

##  Interactive Features & User Guide

### 1\. Persistent Theme Engine

  * **How to use:** Click the "🌙 Dark Mode" button in the sidebar.
  * **Technical Detail:** Your preference is saved via the `localStorage` API. The site uses `try/catch` logic to prevent crashes if browser storage is restricted.
    - This will let the browser save your theme preference

### 2\. Real-Time Project Filtering

  * **How to use:** Scroll to the Projects section and select "Web Development" or "Machine Learning."
  * **UX Feedback:** Cards filter with a smooth fade animation.

### 3\. Smart Contact Form

  * **Validation:** The form uses Regex to verify email formats and ensures no fields are left empty.
  * **User Feedback:** Provides immediate red error messages for invalid inputs and a green success message upon valid submission. Feedback clears automatically when you resume typing.

### 4\. Time-Aware Greeting

  * **Interaction:** The header dynamically greets visitors (Morning / Afternoon / Evening) based on your system's current time.

-----

## 🤖 AI Integration Summary

AI tools were used as productivity amplifiers for code optimization and accessibility audits:
- For a full breakdown, see the `docs/ai-usage-report.md` and the `docs/technical-documentation.md`.

-----

## 👤 Contact Information

  * **Name:** Hussain Albaggal
  * **Email:** [s202253340@kfupm.edu.sa](mailto:s202253340@kfupm.edu.sa)
  * **LinkedIn:** [Hussain Albaggal](https://www.google.com/search?q=https://www.linkedin.com/in/hussain-albaggal)
  * **GitHub:** [Hoosn4](https://www.google.com/search?q=https://github.com/Hoosn4)

<!-- end list -->

