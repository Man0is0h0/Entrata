# AI Prompt Documentation: Broken Calculator

This file documents the chronological sequence of AI prompts used to generate and refine the **Broken Calculator** project. The prompts have been crafted to guide the AI through a structured software development lifecycle, moving from core logic implementation to security auditing and final UI polish.

---

## Phase 1: Project Architecture and Core Logic
**Prompt:**
> I need to build a small project called "Broken Calculator" for an AI coding challenge. The goal is to create a simple discount and tax calculator that contains an intentional logic bug where tax is calculated on the subtotal instead of the discounted amount.
> 
> Core requirements:
> - Calculate Subtotal, Discount Amount, Discounted Amount, Tax Amount, and Final Price.
> - Ensure the bug is isolated in a pure JS module so it can be debugged later without UI interference.
> - Write comprehensive Jest unit tests that verify mathematical edge cases and explicitly reproduce the bug.
> 
> Please recommend the simplest technology stack for this (avoiding overengineering) and provide a phased implementation plan for my approval before writing code.

---

## Phase 2: UI Implementation and DOM Wiring
**Prompt:**
> I approve the Vanilla JS + Jest technology stack. Please execute Phase 2: UI Implementation.
> 
> Build the interface (`index.html` and `style.css`) and the DOM logic (`script.js`). The UI should be professional, clean, and not rely on bulky CSS frameworks. Wire the form directly to the calculator logic module. 
> 
> Implement strict input validation (preventing negative values, empty fields, or zero quantities) and ensure the results are formatted properly as currency. Do not reveal the logic bug in the UI.

---

## Phase 3: Security-Focused Code Audit
**Prompt:**
> Before the final project review, perform a security-focused audit of the entire codebase.
> 
> Specifically, verify:
> 1. XSS protection (ensure we use safe DOM APIs like `textContent`).
> 2. Numeric calculation safety (protect against numeric overflow or `Infinity` from excessively large inputs).
> 3. Version control hygiene (ensure `.gitignore` excludes `node_modules`).
> 
> Apply any necessary practical fixes (e.g., adding HTML `max` limits and JS bounds checking) without altering the intentional calculation bug.

---

## Phase 4: Final Challenge Guidelines Review
**Prompt:**
> Now perform a final review of the entire project against the general AI Coding Challenge Guidelines. 
> 
> Verify functional completeness, code quality, test coverage, and repository hygiene. After inspecting the codebase, generate the final `README.md` containing setup instructions and the exact bug reproduction scenario. Finally, suggest a clean, atomic Git commit history for my final submission.

---

## Phase 5: Local Testing Deployment
**Prompt:**
> Spin up a local development server for the website in the background (e.g., using `npx serve`) so I can manually test the UI and validation rules in my browser.

---

## Phase 6: Aesthetic UI Overhaul
**Prompt:**
> Let's change the UI of the website to make it significantly more aesthetic and engaging. 
> 
> Please apply this exact custom color palette:
> - Red: `#DF301C`
> - Orange: `#FF9100`
> - Light Yellow: `#FFF1D1`
> - Cyan: `#00B7CD`
> 
> Integrate these colors cleanly, utilizing the yellow as the background and the cyan/orange as primary interactive accents. Add subtle CSS micro-animations to make the interface feel modern and alive.

---

## Phase 7: Final UI/UX Polish and Typography
**Prompt:**
> I am happy with the current functionality and the new color palette. Let's make a few final UI/UX improvements based on the current design:
> 
> 1. **Context Hint**: Add a subtle hint below the calculation breakdown reading: *"Try the sample values and inspect the calculation carefully."*
> 2. **Layout Sizing**: Slightly increase the maximum width of the main container on desktop screens so it feels less constrained, while ensuring mobile responsiveness remains intact.
> 3. **Visual Hierarchy**: Make the final payable total stand out clearly using a larger font, subtle background tint, and an accent border.
> 4. **Interaction Polish**: Refine the hover and focus states for the inputs and buttons to ensure the application feels highly responsive and professional.
> 
> Do not touch the calculation logic or intentional bug during these CSS updates.
