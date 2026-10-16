# Portfolio design system

## Direction

The redesign uses a minimal technical-editorial direction: deep ink and a polished light mode, one electric teal accent, hairline structure, and plain-language outcomes. Teal is reserved for active states, links, CTAs, status, and section indices so it communicates signal and trust without becoming decorative noise.

The portrait treatment is a masked, grayscale/teal duotone layer. It sits behind the hero copy at 10–15% visual weight, with a slow scan line, breathing scale, and a few-pixel cursor parallax. It pauses off-screen and becomes static for reduced-motion users. Replace [`images/main_picture/kevin.JPG`](./images/main_picture/kevin.JPG) by changing `photo` in [`src/data/portfolio.ts`](./src/data/portfolio.ts); keep explicit image dimensions to avoid layout shift.

## Tokens, type, and layout

Tokens are defined in [`src/styles/globals.css`](./src/styles/globals.css). The system uses Geist Variable for display/body and a system monospace stack for metadata; mono is only used for labels, dates, indices, tags, status, and small captions. The spacing rhythm is based on 4/8px increments. Desktop content uses a 12-column-ready max-width grid and mobile collapses to a 4-column-friendly single stream. Surfaces use 1px borders and 10px radii instead of heavy shadows.

## IT language rules

- Use `01 / Selected work`, status lines, key/value facts, dates, tags, and `TOOLS / STACK` as structural metadata.
- Use the terminal cue exactly once as `> contact`; the contact form remains a conventional accessible form.
- Case studies are presented as engagement reports: role, stack, result, description, and a clear TODO where evidence is missing.
- Do not add a PGP key, certification, metric, client name, security header claim, or contribution unless it is verified.

## HCI and accessibility

- **Jakob / recognition:** familiar anchor navigation, standard form fields, and a command palette for quick navigation.
- **Hick / focus:** four nav items and one primary CTA keep decisions small.
- **Fitts / reach:** buttons and icon controls are at least 44px; the mobile sheet puts actions in a thumb-friendly vertical list.
- **Gestalt / Miller:** repeated card anatomy, proximity, and short grouped lists chunk information.
- **Nielsen:** scroll-spy indicates location, inline validation prevents errors, and the mail handoff has immediate feedback.
- **Doherty threshold:** interactions use 150–300ms transitions; form feedback is immediate.
- **Accessibility:** semantic sections/headings, visible focus rings, AA-conscious contrast, keyboard palette controls, explicit image dimensions, and `prefers-reduced-motion` support are included.

## Before / after and TODOs

Before, the site mixed services, projects, journey, and credentials into a general personal portfolio with a soft editorial blue treatment. After, the first screen states the role and outcome, work is framed as reports, expertise is scannable, and contact options are visible without requiring jargon.

Verified source facts retained and updated from the supplied 2026 CV/resume: name, location, email, CV, GitHub, LinkedIn, CSU education, Financial Management Services office role, Scale on Socials video-editor and social-media roles, OCID full-stack internship, CheckoutChamp e-commerce work, portfolio contract, software contractor work, PCCD technical role, certificates, and the DICT/CarSU competition results. TODOs intentionally remain for verified case-study metrics and links, a PGP public key/fingerprint, write-up/open-source links, and any additional security claims. The form opens the visitor's email client; it does not claim backend delivery or storage.

Vercel headers are configured in [`vercel.json`](./vercel.json): CSP, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`. Run `npm audit` before deployment and resolve any high-severity dependency findings; no third-party tracker is added by this project.

## GodUI implementation

GodUI is the motion language for the replacement pass. The implementation follows the documented principles of clarity, hierarchy, continuity, feedback, transform/opacity-first performance, and reduced-motion fallbacks:

- Header: resizes from 72px to 58px after scroll and exposes the Cmd/Ctrl+K command palette.
- Hero: the existing portrait remains the performance-safe dither/duotone layer; the blueprint grid is intentionally CSS-only and very low opacity. The title enters once and the portrait scan/breathing effect is the only continuous hero gesture.
- Work: the niche control uses a shared-layout fade/translate transition. Cards use a restrained spotlight beam and open a morphing case-study dialog. Security filtering correctly shows an explicit TODO state because no public security case study is currently verified.
- Expertise: GodUI animated SVG icons are sourced from `@svg-animated-icons/react`; the skills area uses three concrete capability groups (Development, Systems & Data, Security Practice) instead of an abstract diagram.
- Timeline: the experience line draws once. Contact keeps the terminal cue and standard accessible form.

No canvas, video, fluid cursor, confetti, or looping decorative effects were added. The requested ASCII Dither, Scroll Stack, and Terminal packages were deliberately represented with CSS/static equivalents where the repository has no verified GodUI implementation, avoiding a performance regression or invented dependency. `prefers-reduced-motion` disables the scan, beam, spotlight, and timeline motion.
