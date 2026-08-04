---
name: ¡Habla!
description: An adult study-room chalkboard — slate ground, bold architectural headlines, precise printed data.
colors:
  ground: "#242b26"
  ground-deep: "#1c221d"
  panel: "#313c33"
  panel-raised: "#38453a"
  panel-wood: "#3a2f28"
  frame: "#7c5a3a"
  frame-light: "#b3874f"
  chalk: "#f4efe2"
  chalk-dim: "#b7b29e"
  chalk-faint: "#7d8177"
  chalk-ochre: "#e5ac47"
  chalk-rust: "#e39469"
  chalk-sage: "#9ecb8c"
typography:
  display:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.015em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontWeight: 400
rounded:
  sm: "6px"
  md: "8px"
components:
  button-primary:
    backgroundColor: transparent
    textColor: "{colors.chalk-ochre}"
    rounded: "{rounded.sm}"
    padding: "11px 24px"
  button-primary-hover:
    backgroundColor: "{colors.chalk-ochre}"
    textColor: "{colors.ground-deep}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.chalk-rust}"
    rounded: "{rounded.sm}"
    padding: "11px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.chalk-rust}"
    textColor: "{colors.ground-deep}"
---

# Design System: ¡Habla!

## Overview

**Creative North Star: "La Pizarra" (The Chalkboard)**

¡Habla! is the board a serious adult learner works at, not another rounded-bubbly gamified app shell. The whole surface commits to one object: a well-used slate chalkboard in a study room, framed in wood and brass. Bold, architectural display type (Archivo, self-hosted) carries headlines and titles — read as block letters chalked onto the board rather than cursive handwriting; a plain workhorse system sans carries body copy and data, the "printed" register the learner reads. (An earlier pass used a hand-chalked script face, Kalam, for display type; it read as decorative rather than legible, so it was replaced — noted here so it isn't reintroduced. The chalkboard world, palette, and layout are unchanged; only the display face's *character* changed, from cursive to block-letter.) Wood-and-brass framing (a 3–4px warm-toned border) marks structural objects — the header's base rule, the flashcard's edge — rather than acting as decoration. Progress is never a generic bar or stat tile: it's chalk tally-dots per lesson and an inline chalk-ledger sentence on the home screen. Quiz feedback is a hand-specified chalk circle or chalk X that draws itself onto the chosen answer, not a flat color fill.

This direction was reached through Impeccable's grounded-direction roll (seed key `e370d7df`, assigned index 5 of 7 candidates derived from the audience's real self-study world: transit signage, the Leitner flashcard box, the pocket phrasebook, the passport-and-stamp system, the chalkboard, airmail correspondence, the vintage travel poster), then confirmed with the user before build.

**Key Characteristics:**
- Dark slate ground at all times — this is not a light/dark toggle, the ground *is* the chalkboard.
- One deliberate display face (Archivo, bold/extrabold) carries all personality; body/data text stays plain and gets out of the way.
- Every accent color is a literal chalk-pastel: ochre, rust, sage — never neon, never a saturated brand blue/red.
- Rectangular, chalk-outlined buttons that fill solid on hover — never pill-shaped.
- No glassmorphism, no gradients-as-decoration, no emoji standing in for icons.

## Colors

Every accent reads as a stick of chalk against slate — muted, warm, never neon.

### Primary
- **Chalk Ochre** (`#e5ac47`): the app's one true accent. Primary buttons, active nav state, brand mark, headline emphasis (`<em>` in quiz questions), filled progress marks on the ledger.

### Secondary
- **Chalk Rust** (`#e39469`): the "incorrect / secondary action" accent. Secondary buttons, the quiz X-mark, the incorrect-answer tint.

### Tertiary
- **Chalk Sage** (`#9ecb8c`): success only. The quiz circle-mark, filled tally-dots, "new best score" text. Never used decoratively — its appearance always means "correct" or "complete."

### Neutral
- **Ground** (`#242b26`): the page background — the slate itself.
- **Ground Deep** (`#1c221d`): header background and the text color painted onto filled accent buttons (ochre/rust hover fills).
- **Panel** (`#313c33`): every raised surface — hero, lesson tiles, tables, flashcard front, quiz cards.
- **Panel Raised** (`#38453a`): hover tint reserved for table rows.
- **Panel Wood** (`#3a2f28`): the flashcard's back face only — a warm dark wood-brown distinguishing it from every other panel, so front/back read as two sides of one physical object.
- **Chalk** (`#f4efe2`): primary text and the default button outline/text color.
- **Chalk Dim** (`#b7b29e`): secondary/muted text — descriptions, labels, hints. This is the floor for any body-sized text; nothing dimmer than this carries text.
- **Chalk Faint** (`#7d8177`): decorative-only. Dashed dividers, corner brackets, disabled-state borders. Never carries text — it fails contrast at body size.

### Named Rules
**The Chalk-Faint Rule.** `--chalk-faint` is for lines and borders only. Any text color pulls from `--chalk`, `--chalk-dim`, or an accent — never `--chalk-faint`; it was measured at 2.89:1 on panel backgrounds, below the accessibility floor.

**The One Accent Rule.** Ochre carries all primary emphasis. Rust and sage are reserved for their semantic meanings (secondary action / incorrect, success) and are never used as a second decorative primary.

## Typography

**Display Font:** Archivo (self-hosted variable font, weights 700–800), falling back to the system sans stack
**Body Font:** -apple-system / Segoe UI / Roboto system stack

**Character:** Archivo is a bold, architectural grotesk — it carries every headline, section title, card/step title, button-adjacent emphasis, and the flashcard/quiz score display, at 700–800 weight with a touch of negative tracking (-0.01em to -0.015em) for a tight, confident, "chalked in block letters" voice. (The first pass used Kalam, a hand-chalked script face, for display type; the user found it hard to read, so it was replaced with Archivo — same chalkboard world, same colors and layout, but a legible block-letter voice instead of cursive. Noted here so script display type isn't reintroduced.) The system sans stays deliberately plain: this is an Operate surface (a repeated-use study tool), and legible workhorse body text lets the one display voice stay distinctive instead of competing with a second styled family. (A still-earlier pass used Space Grotesk for body text; the project's own design detector flagged it as an overused AI-default face, and it was replaced with a system stack — noted here so it isn't reintroduced either.)

### Hierarchy
- **Display** (800, 3rem hero / 1.6rem section-title / 2rem lesson-header, line-height 1.1–1.35, letter-spacing -0.015em): page-level headlines and section titles.
- **Headline** (800, 1.5rem, letter-spacing -0.015em): quiz question text; `<em>` portions (the Spanish term being tested) render in chalk-ochre instead of italic.
- **Title** (700–800, 1.3rem lesson-card / 1.45rem step-flow headings, letter-spacing -0.015em): component-level headings; sized up a step from the first Archivo pass so titles read clearly at a glance against the grotesk's tighter default proportions versus Kalam's wider script forms.
- **Body** (400, 0.86–1rem, system sans, line-height 1.5–1.65, max-width 56ch on the hero paragraph): descriptions, vocabulary table cells, quiz options.
- **Label** (600, 0.76–0.92rem, system sans): buttons, nav, progress labels. Table headers use Archivo at 700, 1.02rem, letter-spacing -0.005em, to keep reading as "chalked column headings" while staying legible at small size.

## Layout

Single-column content column, `max-width: 900px`, centered, `padding: 40px 20px 72px`. Lesson grid uses `repeat(auto-fill, minmax(220px, 1fr))`. The three-step "how it works" flow is a horizontal flex row on desktop (`gap: 4px` between steps, a 40px dashed connector between them) that collapses to a vertical stack with a vertical dashed connector under 700px. Tables that risk overflow (the progress table's four columns) sit inside a `.table-scroll` wrapper (`overflow-x: auto`) with `min-width: 480px` on the table itself, so headers stay on one line and the table scrolls horizontally instead of squeezing text — the page itself never gains horizontal scroll.

## Elevation & Depth

Hybrid: flat slate ground with raised panels lifted by a single soft offset shadow — never a border-plus-shadow combination (that pattern reads as a "ghost card" and is explicitly avoided). Structural objects that need a physical edge (the flashcard, the header's base line, table header rules) get a real wood/brass-toned border instead of a shadow, because they represent an actual framed or ruled object, not a floating card.

### Shadow Vocabulary
- **Panel** (`box-shadow: 0 14px 28px -12px rgba(10, 12, 8, 0.55)`): every raised surface at rest — hero, lesson tiles, tables, quiz cards, flashcard faces.
- **Panel Hover** (`box-shadow: 0 20px 36px -14px rgba(10, 12, 8, 0.65)`): lesson-card hover only.

### Named Rules
**The One Elevation Rule.** A surface is either bordered (a real framed/ruled object: flashcard, header, table rule) or shadowed (a raised panel). Never both on the same element.

## Shapes

Rectangular and squared-off, not bubbly — a deliberate departure from the pill-shaped buttons and heavily rounded cards of prior passes. `--radius-sm` (6px) on buttons and controls, `--radius-md` (8px) on panels and the flashcard. Nothing uses a pill radius. Lesson tiles carry two small L-shaped corner brackets (`::before`/`::after`, 12px, 1.5px chalk-faint stroke) at opposite corners instead of a full border, evoking a boxed-off section of the board rather than a generic card outline.

## Components

### Buttons
- **Shape:** rectangular, 6px radius, 2px outline border — never a pill.
- **Primary:** transparent background, chalk-ochre 2px border and text; fills solid ochre with ground-deep text on hover.
- **Secondary:** same shape, chalk-rust border/text, fills solid rust on hover.
- **Outline:** chalk-faint border, chalk-dim text, brightens to full chalk on hover.
- **Press feedback:** `transform: scale(0.97)` on `:active`, all variants.

### Cards / Containers (lesson tiles)
- **Corner style:** 8px radius; two small hand-drawn corner brackets instead of a full border.
- **Background:** panel (`#313c33`).
- **Shadow strategy:** Panel shadow at rest, Panel Hover on `:hover` with a 2px lift (`translateY(-2px)`), gated behind `(hover: hover) and (pointer: fine)`.
- **Progress display:** a 10-dot tally row (`.tally-row`/`.tally-dot`), filled dots in chalk-sage — never a gradient or striped progress bar.

### Flashcard (signature component)
A held-up slate tablet, not a glass card. 4px wood-frame border (`--frame` / `--frame-light` on the back face), real 3D `rotateY` flip via `perspective: 1800px` and `transform-style: preserve-3d`, 520ms `cubic-bezier(0.65, 0, 0.35, 1)` — slower and more deliberate than a typical 200ms UI flip, because this is the app's one signature "physical object" interaction. Front face uses the panel slate tone; back face uses a warm dark wood-brown (`#3a2f28`) with a brass-toned border, so front and back read as two different sides of one physical object rather than a color palette swap.

### Quiz Options (signature component)
Flat outlined rows (1.5px `rgba(chalk, 0.18)` border) that reveal a hand-specified chalk mark on answer, rather than a solid color fill: a circle (`stroke-dasharray`/`stroke-dashoffset` "draw-in", 420ms ease-out, chalk-sage) for the correct answer, an X (320ms, chalk-rust) for the chosen wrong one. Both marks use `pathLength="1"` so the draw animation is duration-normalized regardless of path geometry. This is the app's second signature moment, tied directly to the chalkboard concept — the "mark" a grader would actually make.

### Navigation
Header is `ground-deep` with a 3px frame-colored base rule (not a full border) and `backdrop`-free flat surface. Nav items are borderless text by default; the active item gets an ochre 1.5px border and ochre text — no filled pill background.

### Icon System
All icons are authored inline SVG (24×24, `stroke-width: 1.6`, round caps/joins, `stroke="currentColor"`), defined once as `<symbol>`s in `index.html` and referenced via `<use>`. No emoji anywhere in the interface — the previous two passes used emoji for lesson icons and control glyphs; this pass replaced all of them (14 lesson icons, brand mark, 6 control icons, 3 shared step-flow icons, 2 quiz mark icons).

## Do's and Don'ts

### Do:
- **Do** keep `--chalk-faint` for decoration only (dashed lines, corner brackets, disabled borders) — never for text.
- **Do** use `pathLength="1"` on any future hand-drawn SVG mark so `stroke-dasharray`/`stroke-dashoffset` draw-in animations stay geometry-independent.
- **Do** gate every `:hover` lift/tilt effect behind `(hover: hover) and (pointer: fine)`.
- **Do** keep Archivo display text at -0.01em to -0.015em tracking (already applied via the global `h1, h2, h3` rule and the standalone display-text components) — enough to tighten a bold grotesk without hurting legibility.
- **Do** author any new icon as a precise, geometry-specified line icon matching the existing 24×24 / 1.6 stroke-width system — never an emoji or a photorealistic/sketch-style illustration.

### Don't:
- **Don't** pair a border with a soft box-shadow on the same element (the "ghost card" pattern) — pick one per surface.
- **Don't** reach for pill-shaped buttons or heavily rounded (>10px) cards — this world is rectangular and squared-off by contrast with the app's earlier bubbly passes.
- **Don't** reintroduce Space Grotesk, Inter, or another training-data-default sans as the body face without a specific reason; the current system stack was a deliberate detector-driven fix.
- **Don't** render progress as a gradient/striped bar, a progress ring, or a big-number-plus-label stat tile — use the chalk tally-dot or chalk-ledger pattern established here.
- **Don't** use glassmorphism (`backdrop-filter`, translucent glass panels) anywhere — this world was explicitly built without it, in contrast to the app's prior "premium glass flashcard" pass.
- **Don't** reintroduce a cursive/script/handwritten display face (Kalam or otherwise) — the user found it hard to read and it was deliberately replaced with Archivo; the chalkboard identity now speaks through color, texture, and block-letter weight, not handwriting.
