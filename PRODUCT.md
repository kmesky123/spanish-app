# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

English speakers learning beginner Spanish, self-directed and casual. No accounts, no cohorts — a single learner studying alone in short, spare-moment sessions on desktop or mobile.

## Product Purpose

¡Habla! is a friendly, no-pressure web app that helps absolute beginners learn foundational Spanish vocabulary and phrases through short thematic lessons, bidirectional flashcard drills, and scored multiple-choice quizzes. Best quiz scores, attempt counts, and flashcard-practice status are saved locally so progress persists between visits.

## Positioning

*(Framing below is inferred from the product's technical shape — no accounts, no server, no gamification mechanics — rather than a stated claim; flagged for correction.)* Zero-friction alternative to heavyweight, account-gated, streak-pressure language apps: open the page and start learning immediately, no sign-up, no ads, no backend. The learner's data never leaves their browser.

## Operating Context

Self-directed study, likely in short/spare-moment sessions. Browser text-to-speech (Web Speech API) is used for pronunciation via "Hear it" / "Slow" controls when the browser supports it. No internet dependency beyond the initial page load; no social or multiplayer features.

## Capabilities and Constraints

- 14 lessons (Greetings & Courtesy, Numbers 0–20/20-40/40-60/60-80/80-100, Colors, Days & Months, Family, Home & Neighbors, Common Questions, Food & Drink, Kitchen, Ser vs. Estar), each a vocabulary table of Spanish/English/simplified pronunciation.
- Flashcards: English→Spanish reveal drill per lesson, with shuffle and reset controls and optional audio playback (normal/slow rate).
- Quizzes: 8-question multiple-choice per lesson, scored as a percentage.
- Progress: best score, attempt count, and a flashcards-practiced flag, persisted per-lesson in `localStorage` under the key `hablaProgress`. No server, no accounts, no analytics.
- No build tooling — plain static HTML/CSS/JS served directly; must keep running with no build step.
- Web Speech API usage must degrade gracefully (controls disabled, no errors) when unsupported.

## Brand Commitments

Product name "¡Habla!" (Spanish for "Speak!") is fixed. Current visual mark (Spanish flag emoji) and footer tagline ("Built for beginners learning Spanish, one lesson at a time.") are existing but not confirmed-binding — open to reinterpretation in a visual redesign per the user's explicit request for a new premium visual world.

## Evidence on Hand

Real vocabulary content for all 14 lessons already exists in `data.js` (Spanish term, English meaning, simplified pronunciation hint for English speakers). No placeholder or fabricated content is needed anywhere in the product.

## Product Principles

1. Zero friction — works instantly in any browser, no install, no account.
2. The learner owns their data — progress lives only in their browser, nothing transmitted anywhere.
3. Short, low-pressure sessions over gamified streak anxiety.
4. Content clarity for absolute beginners outranks novelty features.
5. Every lesson follows the same rhythm: Study → Practice → Quiz.

## Accessibility & Inclusion

No accessibility standard was previously established for this project. Going forward, standard web accessibility practices apply (color contrast, keyboard operability, `prefers-reduced-motion` support).
