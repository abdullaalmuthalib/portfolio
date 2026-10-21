# Abdulla Al Muthalib — Personal Portfolio Website

A fast, responsive, 5-page static portfolio website inspired by the clean, vibrant, and tactile neo-brutalist tech-community aesthetic of [TinkerHub](https://tinkerhub.org/).

Built with semantic HTML5, modern vanilla CSS, and lightweight JavaScript. No external dependencies, heavy frameworks, or build steps required.

---

## 📁 Project Structure

```text
portfolio/
│
├── index.html          # Home Page (Hero, Core Pillars, Featured Work, Stats)
├── about.html          # About Page (Biography, Research Focus, Trajectory Timeline)
├── skills.html         # Skills Page (Python, AI, Cyber Security, PostgreSQL)
├── projects.html       # Projects Page (Live Repositories, Interactive Category Filter)
├── contact.html        # Contact Page (Direct Email, Form Generator, Copy-to-Clipboard)
│
├── css/
│   └── style.css       # Design System (TinkerHub Neo-Brutalist variables, responsive layout)
│
├── js/
│   └── script.js       # Interactivity (Mobile Menu, Project Filtering, Mailto actions)
│
├── assets/
│   ├── images/         # Profile photo and vector project artwork
│   │   ├── profile.jpg
│   │   ├── farmer-booking.svg
│   │   ├── question-solver.svg
│   │   ├── alita-robot.svg
│   │   └── auto-filter.svg
│   └── documents/
│       └── resume.html # Printable, clean resume document
│
└── README.md           # Documentation & Customization Guide
```

---

## 🚀 How to Run the Website Locally

You can run this portfolio on your computer in multiple easy ways:

### Option 1: Direct File Opening (No Installation Needed)
Simply double-click on `index.html` (or right-click → **Open With** → your preferred web browser like Chrome, Edge, Safari, or Firefox).

### Option 2: Using Python Local Server (Recommended)
If you have Python installed:
1. Open PowerShell or Terminal in this folder (`portfolio`).
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and visit:
   ```text
   http://localhost:8000
   ```

### Option 3: VS Code Live Server Extension
1. Open the `portfolio` folder in VS Code.
2. Right-click on `index.html`.
3. Click **"Open with Live Server"**.

---

## 🌐 How to Deploy to Static Hosting (100% Free)

Because this website uses pure HTML, CSS, and JS, it can be deployed for free in under two minutes:

### 1. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `abdullaalmuthalib/portfolio` or `abdullaalmuthalib.github.io`).
2. Go to the repository **Settings** tab.
3. Click on **Pages** in the left sidebar.
4. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**. Your site will be live at:
   `https://abdullaalmuthalib.github.io/`

### 2. Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New Project"** and select this repository.
3. Keep default settings and click **Deploy**.

### 3. Netlify
1. Go to [netlify.com](https://netlify.com).
2. Drag and drop the `portfolio` folder directly into the Netlify Drop dashboard.
3. Your site will instantly have a live URL with free SSL.

---

## ✏️ Beginner's Customization Guide (Where to Edit)

You don't need to be a professional programmer to edit your information. Here is the exact guide to customize every part of your website:

### 1. Name & Professional Title
* Open each HTML file (`index.html`, `about.html`, `skills.html`, `projects.html`, `contact.html`).
* Search for:
  ```html
  <span class="brand-name">Abdulla Al Muthalib</span>
  <span class="brand-role">Software Engineer</span>
  ```
* Replace with your desired name and title.

### 2. Profile Photo
* Replace the image file located at:
  `assets/images/profile.jpg`
* Keep the filename `profile.jpg`, or update the `src` attribute in `index.html` and `about.html`:
  ```html
  <img src="assets/images/profile.jpg" alt="Your Name">
  ```

### 3. About Section & Biography
* Open `about.html`.
* Search for the section labeled `<!-- Left Column: Photo Card & Quick Info -->` and `<!-- Right Column: Biography & Milestones -->`.
* Update the paragraphs inside the `<p>` tags with your own personal story, milestones, or education details.

### 4. Technical Skills
* Open `skills.html`.
* Search for the category you want to update (e.g. `Python Development`, `Artificial Intelligence`, `Cyber Security`, `PostgreSQL`).
* Each skill is organized inside a clean `<div class="skill-box">`:
  ```html
  <div class="skill-box">
    <div class="skill-box-top">
      <span class="skill-name">Your New Skill</span>
      <span class="skill-level-badge">Proficient</span>
    </div>
    <p class="skill-desc">Brief explanation of your experience with this tool.</p>
  </div>
  ```

### 5. Projects & Repositories
* Open `projects.html` (and the featured section in `index.html`).
* Find any `<article class="project-card">`.
* Change the project title, description, tags, and GitHub link:
  ```html
  <a href="https://github.com/yourusername/yourproject" target="_blank" class="project-link">
    View on GitHub ↗
  </a>
  ```

### 6. Contact Details & Email
* Open `contact.html` and `js/script.js`.
* In `contact.html`, search for `abdullaalmuthalib@gmail.com` and replace with your email.
* In `js/script.js`, line 88:
  ```javascript
  const emailAddress = 'abdullaalmuthalib@gmail.com';
  ```
  Update this to your email so the form submission and direct contact open your mailbox.

### 7. Colors & Theme
* Open `css/style.css`.
* Right at the top (lines 10–30), you will find the CSS color variables:
  ```css
  :root {
    --bg-primary: #FAF9F5;       /* Main canvas background */
    --accent-yellow: #FFE816;    /* Primary highlight yellow */
    --accent-lime: #C3FF16;      /* High-energy electric lime */
    --accent-mint: #97F8B7;      /* Clean mint green */
    --accent-purple: #C7AEE8;    /* Retro lavender/lilac */
    --accent-peach: #FEEDD2;     /* Warm peach */
  }
  ```
  Adjust any color code to change the theme across all five pages simultaneously!

### 8. Fonts
* Open `css/style.css` lines 37–42:
  ```css
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'Space Mono', monospace;
  ```
  You can import any Google Font in line 7 and change these variables.

### 9. Custom Flower Cursor & Android Butterflies 🌸🦋
* Built-in interactive cursor:
  - Cute 5-petal flower cursor that smoothly tracks mouse coordinates and blooms on interactive elements (`a, button, input`).
  - 3 trailing blue-and-black butterflies styled like the Android Blue Morpho emoji (🦋) with animated wing flapping, harmonic floating paths, and flight-direction orientation.
  - Generates cute micro-pollen sparkles on mouse clicks.
  - Automatically disabled on mobile/touch screens via `@media (pointer: coarse)` to ensure flawless touch usability.

### 10. Stalking & Hiding Minion Easter Egg 🍌👀
* Interactive Minion character:
  - Peeks out from different vantage points on the screen (bottom-right, bottom-left, side edges, etc.).
  - **Stalking Eye**: Pupil actively tracks and follows the user's cursor wherever it moves.
  - **Proximity Hiding**: When the cursor comes within 175px of the minion, he gets startled ("Uh-oh!", "Eek!"), ducks down out of sight, and re-emerges at a different screen location after a few seconds.
  - Periodically pops up friendly speech bubbles ("Bello!", "Banana? 🍌", "Hehehe!").

---

## 🛠️ Accessibility & Standards
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Fully accessible keyboard navigation with high-contrast skip links and ARIA attributes (`aria-expanded`, `aria-label`).
- Responsive across mobile smartphones, tablets, laptops, and ultra-wide screens.
- Zero external CSS libraries (Pure Vanilla CSS).


