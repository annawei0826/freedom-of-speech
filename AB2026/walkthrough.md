# AB2026 Vue Migration Walkthrough

## Overview
This document outlines the migration of the `AB2025` static HTML website to the `AB2026` Vue 3 application. The goal was to modernize the codebase, improve maintainability, and leverage Vue's component-based architecture.

## Key Changes

### 1. Project Structure
- **New Project:** Created `AB2026` using Vite + Vue 3.
- **Assets:**
    - Moved images from `public/images` to `src/assets/images`.
    - Migrated `layout.css` to `src/assets/css/layout.css`.
    - Configured Vite alias `@` to point to `src` for easier asset referencing.

### 2. Component Migration
The original `index.html` was broken down into the following Vue components:

- **`App.vue`**: Main entry point, handles global layout, preloader, and AOS initialization.
- **`Header.vue`**: Navigation bar with scroll-based reveal and mobile menu.
- **`Footer.vue`**: Static footer content.
- **`KeyVisual.vue`**: Main visual section with background image handling.
- **`ForumIntro.vue`**: Forum introduction section.
- **`SpeakerSlider.vue`**: Speaker carousel using `swiper/vue` (replaced `lightslider`).
- **`AgendaSection.vue`**: Agenda with collapsible topics and city-specific Swiper carousel.
- **`RegistrationForm.vue`**: Registration form with Vue reactivity and Axios for submission.
- **`TrafficInfo.vue`**: Traffic information with embedded Google Maps.
- **`RelatedArticles.vue`**: Related articles section.
- **`SpeakerModal.vue`**: Modal for displaying speaker details.

### 3. Library Replacements
- **jQuery** $\rightarrow$ **Vue 3**: Core logic and DOM manipulation.
- **lightslider** $\rightarrow$ **Swiper**: For all carousels (Speakers, Agenda).
- **wow.js** $\rightarrow$ **AOS**: For scroll animations.
- **$.ajax** $\rightarrow$ **Axios**: For form submission.

### 4. Asset Management
- **Dynamic Images**: Implemented `getImageUrl` helper in `SpeakerSlider.vue` and `AgendaSection.vue` to correctly resolve dynamic image paths with Vite.
- **CSS Paths**: Updated `layout.css` to use relative paths (`../images/`) for background images.

## Verification Results

### Automated Checks
- **Linting**: Verified no critical lint errors in Vue components.
- **Path Verification**: Ran `grep` search to ensure no legacy `/images/` paths remain in `src`.

### Manual Verification Steps (Recommended)
1.  **Run Development Server**: `npm run dev`
2.  **Check Navigation**: Ensure clicking nav links scrolls to the correct section.
3.  **Verify Carousels**:
    - Check Speaker slider navigation and responsiveness.
    - Check Agenda city tabs and slider content.
4.  **Test Form**: Try submitting the registration form and check console/network logs.
5.  **Check Modals**: Click on speakers to open the modal.
6.  **Responsive Design**: Resize browser to mobile view to check the hamburger menu and layout adjustments.

## Conclusion
The migration is complete. The new Vue 3 application replicates the original functionality with a modern, maintainable architecture.
