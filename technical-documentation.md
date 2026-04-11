# Technical Documentation - Assignment 2

**Author**: Hussain Albaggal  
**Student ID**: s202253340  
**Assignment**: SWE363 - Assignment 2 (Interactive Features)  
**Date**: March 28, 2026
 
---

## Architecture Overview

The portfolio is built as a **responsive single-page application (SPA)** with a two-column layout:
- **Sidebar (Left)**: Fixed navigation, profile, and theme toggle
- **Main Content (Right)**: Scrollable container with all portfolio sections

### Design Pattern: Component-Based Architecture
- **CSS Variables**: Global theme management for light/dark modes
- **Semantic HTML5**: Proper accessibility (aria-labels, label elements, semantic tags)
- **Vanilla JavaScript**: No frameworks; pure DOM manipulation for filtering, validation, and theme persistence

---

## Assignment 2 Features - Technical Implementation

### 1. Dynamic Content & User Interaction

#### Dynamic Greeting
- **Location**: `#dynamicGreeting` span in About section
- **Logic**: `updateGreeting()` function calculates local hour and sets text
  - 5am-12pm: "Good Morning"
  - 12pm-6pm: "Good Afternoon"  
  - 6pm-5am: "Good Evening"
- **Trigger**: Runs on page load; updates hourly if user visits long sessions

#### Project Filtering System
- **HTML Structure**: Filter buttons above projects with `data-filter` attributes ("all", "web", "ml")
- **Project Categorization**: Each `.project-item` has `data-category` ("web" or "ml")
- **JavaScript Logic**:
  - Clicking a filter button triggers `updateProjectVisibility(category)`
  - Adds/removes `.project-hidden` class for smooth CSS transitions
  - Shows "No projects found" message if category is empty
  - Active button state maintained with `.active` class
- **CSS Animation**: `.project-hidden` uses opacity and max-height transitions (0.35s ease)

#### Theme Toggle
- **HTML**: Button in sidebar with id="themeToggle" and aria-label for accessibility
- **Stored State**: localStorage key "portfolioTheme" (values: "light" or "dark")
- **Button Text**: Toggles between "🌙 Dark Mode" and "☀️ Light Mode"
- **CSS Approach**: Uses `:root` CSS variables that change in `body.dark-mode` state
- **Error Handling**: try/catch block prevents crashes if localStorage is disabled

---

### 2. Data Handling & Storage

#### localStorage Implementation
```javascript
function loadTheme() {
    try {
        const saved = localStorage.getItem('portfolioTheme');
        if (saved === 'dark' || saved === 'light') {
            currentTheme = saved;
        }
    } catch (error) {
        console.warn('localStorage unavailable:', error);
        currentTheme = 'light';
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem('portfolioTheme', theme);
    } catch (error) {
        console.warn('Could not save theme:', error);
    }
}
```
- **Graceful Degradation**: Falls back to light mode if storage fails
- **No Application Crash**: try/catch prevents breaking the app if storage is blocked

#### Form Data Validation
- **Validation Rules**:
  - Name: Non-empty string
  - Email: Regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Message: Non-empty string
- **Real-Time Feedback**: Displays inline error/success messages below the form
- **Message Clearing**: Errors clear when user types in form fields (input/change events)

---

### 3. Animations & Transitions

#### CSS Transitions Applied
1. **Theme Switch**: `body` background and text color transition (0.3s ease)
2. **Button Interactions**: 
   - Hover scale: `transform: scale(1.02)` (cards)
   - Filter buttons: `transform: translateY(-2px)` on hover
   - Submit button: `transform: translateY(-2px)` on hover
3. **Project Filtering**: Smooth fade out/in (opacity) with height collapse (0.35s ease)
4. **Form Validation**: Error/success boxes appear with background color transitions

#### JavaScript Animation Support
- Used Intersection Observer API for scroll-triggered section animations
- Smooth CSS classes applied to elements as they enter viewport
- No heavy JavaScript animations; CSS handles all transitions for performance

---

### 4. Error Handling & User Feedback

#### Form Validation Feedback
- **Invalid Fields**: Red background with error message
- **Success Message**: Green background with success confirmation
- **Empty State**: "No projects found" message when filter returns no results

#### User Communication Strategy
- **Always Provide Context**: Error messages explain what's wrong
- **Clear Next Steps**: Form clears on success; messages clear when typing resumes
- **Accessible Design**: All interactive elements have aria-labels; form labels are semantic

---

## Color Palette & Accessibility

### Light Mode
- **Background**: `#ffffff` (white)
- **Text**: `#1f2937` (dark gray-blue)
- **Primary Accent**: `#3b82f6` (blue)
- **Secondary Accent**: `#f59e0b` (amber/orange)
- **Contrast Ratio**: 14.5:1 (AAA level)

### Dark Mode
- **Background**: `#0f172a` (deep navy)
- **Text**: `#f1f5f9` (light slate)
- **Primary Accent**: `#60a5fa` (light blue)
- **Secondary Accent**: `#fbbf24` (light amber)
- **Contrast Ratio**: 14:1 (AAA level)

**Accessibility**: All color pairs meet WCAG AA and AAA contrast standards.

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Metrics

- **HTML**: ~5KB
- **CSS**: ~15KB
- **JavaScript**: ~4KB
- **Total**: ~24KB (fast load time)
