# Portfolio design system

## Direction

The redesign uses a minimal technical-editorial direction: deep ink and a polished light mode, one electric teal accent, hairline structure, and plain-language outcomes. Teal is reserved for active states, links, CTAs, status, and section indices so it communicates signal and trust without becoming decorative noise.

The portrait treatment is a masked, grayscale/teal duotone layer. It sits behind the hero copy at 10–15% visual weight, with a slow scan line, breathing scale, and a few-pixel cursor parallax. It pauses off-screen and becomes static for reduced-motion users. Replace [`images/main_picture/kevin.JPG`](./images/main_picture/kevin.JPG) by changing `photo` in [`src/data/portfolio.ts`](./src/data/portfolio.ts); keep explicit image dimensions to avoid layout shift.

## Tokens, type, and layout

Tokens are defined in [`src/styles/globals.css`](./src/styles/globals.css). The system uses Geist Variable for display/body and a system monospace stack for metadata; mono is only used for labels, dates, indices, tags, status, and small captions. The spacing rhythm is based on 4/8px increments. Desktop content uses a 12-column-ready max-width grid and mobile collapses to a 4-column-friendly single stream. Surfaces use 1px borders and 10px radii instead of heavy shadows.

## IT language rules

- Use `01 / Selected work`, status lines, key/value facts, dates, tags, and `TOOLS / STACK` as structural metadata.
- Use the terminal cue exactly once as `> contact`; the contact form remains a conventional accessible form.
- Case studies use a story-led body: a short story, evidence-backed context, implementation decisions, architecture, and security/data notes. Do not repeat card content as labeled rows; use one compact `Role / Year / Type` strip under the title. Unsupported sections stay hidden through `caseStudy.confirmed` flags and are tracked in `CASE_STUDY_TODO.md`.
- Do not add a PGP key, certification, metric, client name, security header claim, or contribution unless it is verified.

## HCI and accessibility

- **Jakob / recognition:** familiar anchor navigation, standard form fields, and a command palette for quick navigation.
- **Hick / focus:** four nav items and one primary CTA keep decisions small; the stack wall uses six filter options maximum.
- **Fitts / reach:** buttons and icon controls are at least 44px; the mobile sheet puts actions in a thumb-friendly vertical list.
- **Gestalt / Miller:** repeated card anatomy, proximity, and short grouped lists chunk information.
- **Nielsen:** scroll-spy indicates location, inline validation prevents errors, and the mail handoff has immediate feedback.
- **Doherty threshold:** interactions use 150–300ms transitions; form feedback is immediate.
- **Accessibility:** semantic sections/headings, visible focus rings, AA-conscious contrast, keyboard palette controls, explicit image dimensions, and `prefers-reduced-motion` support are included.
- **Tech stack wall:** uniform 96px desktop / 72px mobile tiles use Gestalt similarity and proximity; preferred tools use the Von Restorff effect through accent stars and borders; all tiles meet Fitts's 44px touch target. The live count and pause control expose system status and satisfy WCAG 2.2.2. Filters persist in `?stack=` for shareable state, and reduced motion switches the marquee to a static grid. Monogram fallbacks are used for SQL, Visual Studio Code, Windows, PicoCTF, Adobe Premiere Pro, Adobe Photoshop, CapCut, Microsoft Office apps, Monday.com, and ChatGPT.

## Before / after and TODOs

Before, the site mixed services, projects, journey, and credentials into a general personal portfolio with a soft editorial blue treatment. After, the first screen states the role and outcome, work is framed as reports, expertise is scannable, and contact options are visible without requiring jargon.

Verified source facts retained and updated from the supplied 2026 CV/resume: name, location, email, CV, GitHub, LinkedIn, CSU education, Financial Management Services office role, Scale on Socials video-editor and social-media roles, OCID full-stack internship, CheckoutChamp e-commerce work, portfolio contract, software contractor work, PCCD technical role, certificates, and the DICT/CarSU competition results. TODOs intentionally remain for verified case-study metrics and links, a PGP public key/fingerprint, write-up/open-source links, and any additional security claims. The form opens the visitor's email client; it does not claim backend delivery or storage.

Vercel headers are configured in [`vercel.json`](./vercel.json): CSP, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`. Run `npm audit` before deployment and resolve any high-severity dependency findings; no third-party tracker is added by this project.

## GodUI implementation

GodUI is the motion language for the replacement pass. The implementation follows the documented principles of clarity, hierarchy, continuity, feedback, transform/opacity-first performance, and reduced-motion fallbacks:

- Header: resizes from 72px to 58px after scroll and exposes the Cmd/Ctrl+K command palette.
- Hero: the existing portrait remains the performance-safe dither/duotone layer; the blueprint grid is intentionally CSS-only and very low opacity. The title enters once and the portrait scan/breathing effect is the only continuous hero gesture.
- Work: the niche control uses a shared-layout fade/translate transition. Cards use a restrained spotlight beam and open a morphing case-study dialog. Security filtering correctly shows an explicit TODO state because no public security case study is currently verified.
- Stack: the Expertise section now uses a data-driven GodUI wall with self-hosted Simple Icons, documented monogram fallbacks, a slow three-row marquee, pause control, reduced-motion grid, URL-persisted filters, live counts, and keyboard-operable filter tabs.
- Timeline: the experience line draws once. Contact keeps the terminal cue and standard accessible form.

No canvas, video, fluid cursor, confetti, or looping decorative effects were added. The requested ASCII Dither, Scroll Stack, and Terminal packages were deliberately represented with CSS/static equivalents where the repository has no verified GodUI implementation, avoiding a performance regression or invented dependency. `prefers-reduced-motion` disables the scan, beam, spotlight, and timeline motion.

## Case study component rules

`CaseStudyBody` in [`src/App.tsx`](./src/App.tsx) renders every structured case
study from the typed `caseStudy` object in
[`src/data/portfolio.ts`](./src/data/portfolio.ts). It is intentionally
data-driven: do not duplicate the markup for individual projects. A project
without `caseStudy` keeps the legacy role/stack/scope fallback until its facts
are verified.

To add another case study:

1. Add a `caseStudy` object to the project in `src/data/portfolio.ts`.
2. Fill `story`, `problem`, `challenges`, `architecture`, and optional
   `security`, `next`, and approved `links` from repository or document
   evidence.
3. Set each `confirmed` field to `true` only when that section is traceable.
   Unsupported sections are hidden on the live page.
4. Add exact questions and evidence locations to `CASE_STUDY_TODO.md` for
   every unverified claim.
5. Keep `links.source` empty unless the public repository is approved for the
   case-study footer. Keep media dimensions explicit and keep the video poster
   as the layout-stable fallback.

The dialog traps keyboard focus, closes with Escape, restores focus to the
launching card, locks background scrolling, and keeps its own content
scrollable. The story and decision cards reveal once with transform/opacity
motion and become immediate static content under reduced motion.

### Case-study dialog layout and interactive blocks

The case-study dialog is a centered `min(920px, 92vw)` surface with an 88vh
maximum height on desktop. Its scroll container is the only scrolling region.
On small screens it becomes a bottom sheet with a 92dvh maximum height, rounded
top corners, and a drag handle. The media stays inside the dialog padding at a
16:9 ratio with a poster to prevent layout shift. The sticky action bar has an
opaque surface and the scroll content reserves space below it.

The chapter rail observes sections using the dialog scroll container as its
`IntersectionObserver` root. To add a chapter, add its stable section ID to
`caseStudyChapters` and render the matching section through `CaseStudySection`.
Chapter controls must scroll the dialog container, not the page.

Interactive case-study blocks should be local, self-contained React components.
Keep their state inside the block, expose native buttons and `aria-pressed` or
`aria-live` where appropriate, and do not add tracking or backend calls. A
project-specific block must be explicitly opted into through the case study
data (for example, `interactive: "planner"`); never render a project-specific
demo for every project by default. Add the block inside the relevant
case-study section, keep it readable without motion, and keep the data field
typed as a finite set of supported interactive variants.

Project thumbnails use the shared `ProjectThumbnail` component. It keeps every
frame at 16:10, applies a muted theme treatment at rest, and reveals the
source image or preview video on hover, keyboard focus, or touch viewport
entry. Add a `focus` object-position to a project only when its source image
needs a different crop; otherwise it defaults to `top center`.

The About portrait uses `AboutPortrait` with a 4:5 frame, a 1px border, and
data-driven focal points. The current focal values are 55% x / 80% y on
desktop and 55% x / 78% y on mobile; the image uses `object-fit: cover`
without scaling. At rest it uses 70% grayscale in light mode and 85%
grayscale in dark mode, with 0.16 accent tint opacity and a soft background
gradient. It reveals the original color on hover, keyboard focus, or touch
viewport entry. To swap it, change `portfolio.aboutPhoto` in
`src/data/portfolio.ts`; adjust `aboutPortrait.focal` and
`aboutPortrait.focalMobile` when the subject framing requires it.
