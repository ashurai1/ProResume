# ProResume - Premium Resume Builder

![ProResume Banner](https://via.placeholder.com/1200x400?text=ProResume+Builder)

**ProResume** is a modern, premium, and fully client-side Resume Builder web application. Built with pure HTML, CSS, and JavaScript, it offers a seamless experience for creating ATS-friendly resumes with real-time preview, multiple templates, and high-quality PDF/Word exports.

## 🚀 Features

-   **Real-Time Live Preview**: See changes instantly as you type.
-   **Multiple ATS-Friendly Templates**:
    -   **Tech ATS**: Optimized for technical roles.
    -   **Modern Clean**: Balanced and professional.
    -   **Minimal**: Text-focused for maximum readability.
-   **Export Options**:
    -   **PDF Download**: High-quality A4 output using `html2pdf.js`.
    -   **Word Download**: Editable `.doc` format.
-   **Premium UI/UX**:
    -   Glassmorphism design with animated backgrounds.
    -   Smooth transitions and micro-interactions (GSAP).
    -   **Dark/Light Mode** with persistent state.
-   **Dynamic Sections**: Add unlimited Education, Experience, Projects, and Certifications.
-   **Custom Sections**: Create your own sections with custom titles.
-   **Auto-Save**: Your progress is automatically saved to LocalStorage.
-   **Privacy Focused**: No backend. All data stays in your browser.

## 🛠️ Technologies Used

-   **HTML5**: Semantic structure.
-   **CSS3**: Custom properties, Flexbox/Grid, Glassmorphism, Animations.
-   **JavaScript (ES6+)**: Modular architecture (State management, Template rendering).
-   **GSAP**: For smooth entrance animations.
-   **html2pdf.js**: For client-side PDF generation.
-   **FontAwesome**: For icons.
-   **Google Fonts**: Inter, Outfit, Lato.

## 📂 Project Structure

```
ResumeBuilder/
├── index.html          # Main application entry point
├── favicon.svg         # Professional SVG favicon
├── css/
│   └── style.css       # All styles (Theming, Layout, Components)
└── js/
    ├── main.js         # Core application logic & Event handling
    ├── templates.js    # HTML template rendering functions
    ├── pdf.js          # PDF and Word export logic
    └── utils.js        # Helper functions (Debounce, Storage, etc.)
```

## ⚡ How to Run

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ashurai1/ResumeBuilder.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd ResumeBuilder
    ```
3.  **Open `index.html`** in your web browser.
    -   You can simply double-click the file or use a live server extension (recommended for best experience).

## 👨‍💻 Developer

**Ashwani Rai**

-   [LinkedIn](https://www.linkedin.com/in/ashwani-rai2220/)
-   [GitHub](https://github.com/ashurai1)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Ashwani Rai*
