
# Hussain Albaggal - Software Engineering Portfolio

A responsive single-page portfolio for SWE363 Assignment 2. The site presents my profile, experience, projects, certifications, skills, and contact form while demonstrating interactive front-end features such as API integration, state management, complex client-side logic, and performance-minded UI behavior.

## Project Description

This project extends my earlier portfolio into a more interactive web application using HTML, CSS, and vanilla JavaScript. It includes:

- A live weather section powered by the Open-Meteo API
- Project filtering, sorting, and visitor-level based display
- Persistent light/dark mode using `localStorage`
- Show/hide section controls for state management
- A visit timer and dynamic greeting
- A contact form with stronger validation and user-friendly feedback

## Assignment Coverage

This portfolio now covers the main Assignment 2 areas through visible and testable features:

- Dynamic content and API integration: live weather data and time-based greeting
- Complex logic: project filtering, sorting, visitor-level selection, and timer updates
- State management: persistent theme mode and show/hide section buttons
- Error handling: API fallback message, empty project state, and form validation feedback
- Performance: reduced repeated DOM lookups, CSS-based section reveal, and lighter runtime updates

## Setup Instructions

### Option 1: Open directly

Open `index.html` in a modern browser.

### Option 2: Run with a local server

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project Structure

```text
202253340-HussainAlbaggal-assignment2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── README.md
```

## Main Features

- Dynamic content: time-based greeting, live temperature, and visit timer
- API integration: current weather for Dhahran from Open-Meteo
- Complex logic: project filtering, sorting, and visitor-level selection
- State management: theme persistence and show/hide section controls
- Error handling: weather fallback message, empty-state project message, and contact form validation
- Performance: reduced repeated DOM lookups, CSS-based reveal animations, and section rendering optimization

## How To Test

- Theme toggle: switch between light and dark mode, then refresh the page to confirm the theme stays saved
- Weather section: check that the temperature appears, or a friendly fallback message appears if the API fails
- Projects section: choose `Beginner` or `Advanced`, apply a category filter, and then change the sort option
- Section visibility: click `Hide Weather Section` or `Hide Projects Section`, then show them again
- Contact form: submit empty or invalid fields to see validation errors, then submit valid input to see the success message

## AI Use Summary

AI tools were used to speed up implementation, improve validation logic, refine UI messaging, and support documentation. All generated suggestions were reviewed and adjusted manually before being kept in the project.

For the full explanation, see [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Live Deployment

No live deployment link is included yet.

## Contact

- Email: [s202253340@kfupm.edu.sa](mailto:s202253340@kfupm.edu.sa)
- LinkedIn: [Hussain Albaggal](https://www.linkedin.com/in/hussain-albaggal)
- GitHub: [Hoosn4](https://github.com/Hoosn4)
