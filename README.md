# Nihal Johann Thomas - Portfolio

A modern, responsive portfolio web app for Nihal Johann Thomas, a FOSS advocate and CS enthusiast specializing in AI, cybersecurity, and system design. Built with React, Vite, and TailwindCSS, this project showcases skills, projects, achievements, and more.

## Features
- Animated hero section and interactive UI
- Project and achievement showcase
- Contact form powered by EmailJS
- Admin panel (password protected)
- Responsive design with TailwindCSS
- Particle and floating element backgrounds
- Analytics and local admin features

## Demo
[nihaljt.site](https://nihaljt.site)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/crazygamer9597/portfolio.git
   cd portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy the sample file and fill in your values:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` with your EmailJS and admin credentials (see below).

### Running the App
- **Development mode:**
  ```bash
  npm run dev
  ```
  The app will be available at [http://localhost:5173](http://localhost:5173) by default.

- **Production build:**
  ```bash
  npm run build
  ```
  The output will be in the `dist/` folder.

- **Preview production build locally:**
  ```bash
  npm run preview
  ```

## Environment Variables
This project uses the following environment variables (see `.env.example`):

- `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
- `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key
- `VITE_ADMIN_PASSWORD` - Password for accessing the admin panel

**Note:** All `VITE_` variables are exposed to the client (browser) by Vite.

## Folder Structure
```
portfolio/
  ├─ public/           # Static assets
  ├─ src/              # Source code
  │   ├─ components/   # React components
  │   ├─ data/         # Portfolio data (bio, projects, etc.)
  │   ├─ hooks/        # Custom React hooks
  │   ├─ utils/        # Utility functions
  │   └─ index.css     # TailwindCSS styles
  ├─ index.html        # Main HTML file
  ├─ package.json      # Project metadata and scripts
  └─ ...
```
**Author:** Nihal Johann Thomas  
[LinkedIn](https://linkedin.com/in/nihal-johann-thomas)  
[Email](mailto:nihaljohannthomas2003@gmail.com) 