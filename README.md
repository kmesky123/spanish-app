# ¡Habla! — Spanish for Beginners

A lightweight, no-build web app that helps English speakers learn beginner Spanish through short vocabulary lessons, flashcards, and quizzes.

## Features

- **Lessons** — Greetings, Numbers 0-20, Colors, Days & Months, Family, Common Questions, Food & Drink, and Ser vs. Estar, each with English translations and simplified pronunciation hints.
- **Flashcards** — Flip-card drill (English → Spanish) for each lesson's vocabulary.
- **Quizzes** — Multiple-choice quizzes that score your recall and save your best result.
- **Progress tracking** — Best quiz scores, attempt counts, and flashcard practice are saved to your browser's local storage, so progress persists between visits.

## Running locally

No build tools or dependencies are required — it's plain HTML, CSS, and JavaScript.

```bash
# from the project directory
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or simply open `index.html` directly in a browser.

## Project structure

- `index.html` — page shell and navigation
- `styles.css` — styling
- `data.js` — lesson/vocabulary content
- `app.js` — view routing, flashcard/quiz logic, and progress tracking (localStorage)
