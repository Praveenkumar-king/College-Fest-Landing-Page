# 🎉 Vortex College Fest Landing Page

> A modern, responsive College Fest Landing Page named **Vortex '26**, built using HTML5, CSS3, and JavaScript (ES6). Features a glowing dark-theme design, canvas particle-trail cursor trackers (emitting royal-blue and gold sparks), active scroll progress indicators, timelines, countdown clocks, and custom coordinate locator map panels.

---

## 📌 Project Overview

This project promotes a college cultural and technical festival through an interactive, premium web experience.

The project highlights:
* **Custom Cursor Particle Trail**: Programmatically overlays an HTML5 Canvas that releases glowing trail sparks (in royal blue and gold) following the user's cursor.
* **Moving Background Blobs**: Multi-layered background blur particles that drift dynamically based on mouse movements.
* **Back to Top Control**: Floating action button that animates into view on scroll and smooth-slides the user back to coordinate 0,0.
* **Scroll Reveal Animations**: Light-weight, native `IntersectionObserver` script that triggers fade-in/up translations as the elements scroll into view.
* **Event Countdown Timer**: JavaScript real-time countdown decrementing days, hours, minutes, and seconds until the festival start.
* **Event Timeline / Schedule**: Alternating timeline cards for Day 1 and Day 2 events, adapting to a left-aligned vertical line on mobile screens.

---

## 📂 Project Structure

```text
college-fest-landing-page/
│
├── index.html                  # Landing page (hero countdown, arenas, schedule, competitions, gallery, contact)
│
├── css/
│   ├── style.css               # Core styling variables, design system tokens, custom cursors, forms
│   ├── responsive.css          # Screen alignments and mobile drawer rules for widths 360px - 1440px
│   └── animation.css           # Entrance scroll reveals, neon highlights, and keyframe definitions
│
├── js/
│   ├── app.js                  # Particle Canvas loop, background parallax tracker, countdown clocks, toasts
│   ├── scroll.js               # Sticky navigation states, progress indicator bar, active tab scroll spy
│   └── animation.js            # IntersectionObserver hooks for scroll fade-ins
│
└── images/
    ├── vortex_logo.jpg         # Fest logo (glowing neon vortex spiral)
    ├── vortex_hero.jpg         # Hero banner (college festival concert spotlights)
    └── vortex_hackathon.jpg    # Hackathon competition card image
```

---

## ✨ Features Implemented

* **Default Dark Theme**: Clean slate background with glowing royal blue (`#0072ff`) and metallic gold (`#ffd700`) highlights.
* **Canvas Particles Cursor**: Custom ring follower leaving a trail of drifting glowing sparks on the screen (automatically disabled on mobile touch devices).
* **Back to Top Button**: Floating action button that appears when scrolling down past 400px.
* **Sticky Scroll Progress**: Colored bar indicating scroll depth at the top of the browser tab.
* **Interactive Accordion FAQ**: Click-toggled details panels with smooth height transitions.
* **Event Countdown Clocks**: Days, Hours, Minutes, and Seconds decrementing dynamically.
* **Candidate Admission Inquiry**: Input form supporting toast alert popups on submit events.

---

## 🛠️ Tech Stack

* **Structure**: HTML5 Semantic markup
* **Styling**: CSS3 (Variables, Flexbox, CSS Grid, Backdrop Filters, Keyframe Animations)
* **Scripting**: Vanilla JavaScript (Canvas Rendering Context 2D, Intersection Observer, Scroll Tracking)
* **Visuals**: AI-generated high-fidelity logo/banner + high-res Unsplash college event shots

---

## 🚀 Installation & Running

1. **Locate the project folder**:
   ```bash
   cd D:\college-fest-landing-page
   ```

2. **Run locally**:
   * Open `index.html` directly in your web browser.
   * Or use VS Code's **Live Server** extension.

---

## 📱 Responsive Testing

Optimized for:
* **360px & 375px** (Compact Mobile Screens)
* **425px** (Regular Mobile Devices)
* **768px** (Tablets - hides custom cursor to preserve standard touch interface)
* **1024px** (Laptops & iPads)
* **1440px+** (Wide Monitor Desktops)

---

## 👨‍💻 Author

**Praveen Kumar B**  
Frontend Developer  
*TAP Academy Frontend Assignment*
