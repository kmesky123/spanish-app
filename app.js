// ¡Habla! — vanilla JS Spanish learning app (no build step required).

const STORAGE_KEY = "hablaProgress";
const QUIZ_LENGTH = 8;

const state = {
  view: "home", // home | lessons | lesson | flashcards | quiz | progress
  lessonId: null,
};

// ---------- Progress persistence ----------

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getLessonProgress(lessonId) {
  const progress = loadProgress();
  return progress[lessonId] || { bestScore: 0, attempts: 0, flashcardsPracticed: false };
}

function updateLessonProgress(lessonId, updates) {
  const progress = loadProgress();
  const current = progress[lessonId] || { bestScore: 0, attempts: 0, flashcardsPracticed: false };
  progress[lessonId] = { ...current, ...updates };
  saveProgress(progress);
}

// ---------- Helpers ----------

function getLesson(id) {
  return LESSONS.find((l) => l.id === id);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function setView(view, lessonId) {
  state.view = view;
  state.lessonId = lessonId ?? null;
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    const topLevel = view === "home" || view === "lessons" || view === "progress" ? view : "lessons";
    btn.classList.toggle("active", btn.dataset.view === topLevel);
  });
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Rendering ----------

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  switch (state.view) {
    case "home":
      app.appendChild(renderHome());
      break;
    case "lessons":
      app.appendChild(renderLessonList());
      break;
    case "lesson":
      app.appendChild(renderLessonDetail(state.lessonId));
      break;
    case "flashcards":
      app.appendChild(renderFlashcards(state.lessonId));
      break;
    case "quiz":
      app.appendChild(renderQuiz(state.lessonId));
      break;
    case "progress":
      app.appendChild(renderProgressPage());
      break;
  }
}

function renderHome() {
  const progress = loadProgress();
  const lessonsStarted = Object.keys(progress).length;
  const totalLessons = LESSONS.length;
  const scores = Object.values(progress)
    .map((p) => p.bestScore)
    .filter((s) => s > 0);
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const wrap = el(`
    <div>
      <section class="hero">
        <h1>¡Bienvenido! Welcome to ¡Habla!</h1>
        <p>
          A friendly, no-pressure way for English speakers to learn beginner Spanish.
          Work through short lessons, drill vocabulary with flashcards, then test yourself with a quiz.
        </p>
        <div class="stat-row">
          <div class="stat-box">
            <div class="num">${lessonsStarted}/${totalLessons}</div>
            <div class="label">Lessons started</div>
          </div>
          <div class="stat-box">
            <div class="num">${avgScore}%</div>
            <div class="label">Average quiz score</div>
          </div>
        </div>
        <div class="cta-row">
          <button class="btn btn-primary" id="start-learning">Start Learning</button>
          <button class="btn btn-outline" id="view-progress">View Progress</button>
        </div>
      </section>

      <h2 class="section-title">How it works</h2>
      <div class="lesson-grid">
        <div class="lesson-card">
          <div class="icon">📖</div>
          <h3>1. Study</h3>
          <p>Read the vocabulary table with English meanings and simple pronunciation hints.</p>
        </div>
        <div class="lesson-card">
          <div class="icon">🃏</div>
          <h3>2. Practice</h3>
          <p>Flip through flashcards to test your recall in both directions.</p>
        </div>
        <div class="lesson-card">
          <div class="icon">✅</div>
          <h3>3. Quiz</h3>
          <p>Take a short multiple-choice quiz and track your best score.</p>
        </div>
      </div>
    </div>
  `);

  wrap.querySelector("#start-learning").addEventListener("click", () => setView("lessons"));
  wrap.querySelector("#view-progress").addEventListener("click", () => setView("progress"));
  return wrap;
}

function renderLessonList() {
  const wrap = el(`
    <div>
      <h1>Lessons</h1>
      <p style="color: var(--muted)">Pick a topic to study vocabulary, practice with flashcards, and take a quiz.</p>
      <div class="lesson-grid" id="lesson-grid"></div>
    </div>
  `);
  const grid = wrap.querySelector("#lesson-grid");
  LESSONS.forEach((lesson) => {
    const prog = getLessonProgress(lesson.id);
    const card = el(`
      <div class="lesson-card" data-id="${lesson.id}">
        <div class="icon">${lesson.icon}</div>
        <h3>${lesson.title}</h3>
        <p>${lesson.description}</p>
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${prog.bestScore}%"></div></div>
        <div class="progress-label">${prog.bestScore > 0 ? `Best score: ${prog.bestScore}%` : "Not started yet"}</div>
      </div>
    `);
    card.addEventListener("click", () => setView("lesson", lesson.id));
    grid.appendChild(card);
  });
  return wrap;
}

function renderLessonDetail(lessonId) {
  const lesson = getLesson(lessonId);
  const wrap = el(`
    <div>
      <button class="back-link" id="back-btn">&larr; Back to Lessons</button>
      <div class="lesson-header">
        <div class="icon">${lesson.icon}</div>
        <div>
          <h1 style="margin:0">${lesson.title}</h1>
          <p style="margin:2px 0 0; color: var(--muted)">${lesson.description}</p>
        </div>
      </div>
      <div class="mode-row">
        <button class="btn btn-primary" id="flashcards-btn">🃏 Practice Flashcards</button>
        <button class="btn btn-secondary" id="quiz-btn">✅ Take Quiz</button>
      </div>
      <table class="word-table">
        <thead>
          <tr><th>Spanish</th><th>English</th><th>Pronunciation</th></tr>
        </thead>
        <tbody>
          ${lesson.words
            .map(
              (w) => `<tr><td>${w.es}</td><td>${w.en}</td><td class="pron">${w.pron}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `);
  wrap.querySelector("#back-btn").addEventListener("click", () => setView("lessons"));
  wrap.querySelector("#flashcards-btn").addEventListener("click", () => setView("flashcards", lessonId));
  wrap.querySelector("#quiz-btn").addEventListener("click", () => setView("quiz", lessonId));
  return wrap;
}

// ---------- Flashcards ----------

function speakSpanish(text, rate) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

function renderFlashcards(lessonId) {
  const lesson = getLesson(lessonId);
  let deck = [...lesson.words];
  let index = 0;
  let flipped = false;
  const seen = new Set();
  const speechSupported = "speechSynthesis" in window;

  const wrap = el(`
    <div>
      <button class="back-link" id="back-btn">&larr; Back to ${lesson.title}</button>
      <h1>${lesson.icon} ${lesson.title} — Flashcards</h1>
      <div class="flash-wrap">
        <div class="flash-top-row">
          <div class="flash-progress" id="flash-progress"></div>
          <div class="flash-deck-controls">
            <button class="btn-icon" id="shuffle-btn" title="Shuffle the deck">🔀 Shuffle</button>
            <button class="btn-icon" id="reset-btn" title="Restore original order">↺ Reset</button>
          </div>
        </div>
        <div class="flashcard" id="flashcard">
          <div class="flashcard-inner">
            <div class="flashcard-face flashcard-front">
              <div class="main-text" id="front-text"></div>
              <div class="flashcard-hint">Tap the card to reveal the Spanish</div>
            </div>
            <div class="flashcard-face flashcard-back">
              <div class="main-text" id="back-text"></div>
              <div class="sub-text" id="back-pron"></div>
            </div>
          </div>
        </div>
        <div class="flash-audio-row">
          <button class="btn-icon" id="hear-btn" ${speechSupported ? "" : "disabled"} title="Hear it">🔊 Hear it</button>
          <button class="btn-icon" id="hear-slow-btn" ${speechSupported ? "" : "disabled"} title="Hear it slowly">🐢 Slow</button>
        </div>
        <div class="flash-nav-row">
          <button class="btn btn-outline" id="back-card-btn">&larr; Back</button>
          <button class="btn btn-primary" id="next-card-btn">Next &rarr;</button>
        </div>
      </div>
    </div>
  `);

  wrap.querySelector("#back-btn").addEventListener("click", () => setView("lesson", lessonId));

  const card = wrap.querySelector("#flashcard");
  const frontText = wrap.querySelector("#front-text");
  const backText = wrap.querySelector("#back-text");
  const backPron = wrap.querySelector("#back-pron");
  const progressLabel = wrap.querySelector("#flash-progress");

  function markSeen() {
    seen.add(index);
    if (seen.size === deck.length) {
      updateLessonProgress(lessonId, { flashcardsPracticed: true });
    }
  }

  function showCard() {
    flipped = false;
    card.classList.remove("flipped");
    const w = deck[index];
    frontText.textContent = w.en;
    backText.textContent = w.es;
    backPron.textContent = w.pron;
    progressLabel.textContent = `Card ${index + 1} of ${deck.length}`;
    markSeen();
  }

  card.addEventListener("click", () => {
    flipped = !flipped;
    card.classList.toggle("flipped", flipped);
  });

  wrap.querySelector("#next-card-btn").addEventListener("click", () => {
    index = (index + 1) % deck.length;
    showCard();
  });

  wrap.querySelector("#back-card-btn").addEventListener("click", () => {
    index = (index - 1 + deck.length) % deck.length;
    showCard();
  });

  wrap.querySelector("#shuffle-btn").addEventListener("click", () => {
    deck = shuffle(lesson.words);
    index = 0;
    seen.clear();
    showCard();
  });

  wrap.querySelector("#reset-btn").addEventListener("click", () => {
    deck = [...lesson.words];
    index = 0;
    seen.clear();
    showCard();
  });

  if (speechSupported) {
    wrap.querySelector("#hear-btn").addEventListener("click", () => speakSpanish(deck[index].es, 0.95));
    wrap.querySelector("#hear-slow-btn").addEventListener("click", () => speakSpanish(deck[index].es, 0.5));
  }

  showCard();
  return wrap;
}

// ---------- Quiz ----------

function buildQuizQuestions(lesson) {
  const pool = lesson.words;
  const questionWords = shuffle(pool).slice(0, Math.min(QUIZ_LENGTH, pool.length));
  return questionWords.map((word) => {
    const distractorPool = pool.filter((w) => w.en !== word.en);
    const distractors = shuffle(distractorPool)
      .slice(0, 3)
      .map((w) => w.en);
    const options = shuffle([word.en, ...distractors]);
    return { es: word.es, correct: word.en, options };
  });
}

function renderQuiz(lessonId) {
  const lesson = getLesson(lessonId);
  const questions = buildQuizQuestions(lesson);
  let qIndex = 0;
  let correctCount = 0;

  const wrap = el(`
    <div>
      <button class="back-link" id="back-btn">&larr; Back to ${lesson.title}</button>
      <h1>${lesson.icon} ${lesson.title} — Quiz</h1>
      <div class="quiz-progress" id="quiz-progress"></div>
      <div id="quiz-body"></div>
    </div>
  `);
  wrap.querySelector("#back-btn").addEventListener("click", () => setView("lesson", lessonId));

  const body = wrap.querySelector("#quiz-body");
  const progressLabel = wrap.querySelector("#quiz-progress");

  function showQuestion() {
    if (qIndex >= questions.length) {
      const scorePct = Math.round((correctCount / questions.length) * 100);
      const prog = getLessonProgress(lessonId);
      const isNewBest = scorePct > prog.bestScore;
      updateLessonProgress(lessonId, {
        bestScore: Math.max(scorePct, prog.bestScore),
        attempts: (prog.attempts || 0) + 1,
      });
      progressLabel.textContent = "";
      body.innerHTML = `
        <div class="quiz-result">
          <p>You scored</p>
          <div class="score">${correctCount}/${questions.length} (${scorePct}%)</div>
          <p>${isNewBest ? "🎉 New best score!" : "Keep practicing to beat your best score."}</p>
          <div class="cta-row" style="justify-content:center">
            <button class="btn btn-primary" id="retry-quiz">Try Again</button>
            <button class="btn btn-secondary" id="back-lessons">Choose Another Lesson</button>
          </div>
        </div>
      `;
      body.querySelector("#retry-quiz").addEventListener("click", () => setView("quiz", lessonId));
      body.querySelector("#back-lessons").addEventListener("click", () => setView("lessons"));
      return;
    }

    const q = questions[qIndex];
    progressLabel.textContent = `Question ${qIndex + 1} of ${questions.length}`;
    body.innerHTML = `
      <div class="quiz-question">
        <h3>What does <em>"${q.es}"</em> mean?</h3>
        <div class="quiz-options">
          ${q.options
            .map((opt, i) => `<button class="quiz-option" data-opt="${encodeURIComponent(opt)}">${opt}</button>`)
            .join("")}
        </div>
        <div class="quiz-next-hint" id="next-hint"></div>
      </div>
    `;

    const buttons = body.querySelectorAll(".quiz-option");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = decodeURIComponent(btn.dataset.opt);
        buttons.forEach((b) => (b.disabled = true));
        const isCorrect = chosen === q.correct;
        if (isCorrect) {
          correctCount++;
          btn.classList.add("correct");
        } else {
          btn.classList.add("incorrect");
          buttons.forEach((b) => {
            if (decodeURIComponent(b.dataset.opt) === q.correct) b.classList.add("correct");
          });
        }
        const hint = body.querySelector("#next-hint");
        hint.style.color = isCorrect ? "var(--green)" : "var(--red)";
        hint.textContent = isCorrect ? "Correct!" : `Not quite — the answer is "${q.correct}".`;
        setTimeout(() => {
          qIndex++;
          showQuestion();
        }, 1100);
      });
    });
  }

  showQuestion();
  return wrap;
}

// ---------- Progress page ----------

function renderProgressPage() {
  const progress = loadProgress();
  const rows = LESSONS.map((lesson) => {
    const p = progress[lesson.id] || { bestScore: 0, attempts: 0, flashcardsPracticed: false };
    return { lesson, p };
  });
  const anyActivity = rows.some((r) => r.p.attempts > 0 || r.p.flashcardsPracticed);

  const wrap = el(`
    <div>
      <h1>Your Progress</h1>
      ${
        anyActivity
          ? `<table class="progress-table">
              <thead>
                <tr><th>Lesson</th><th>Best Quiz Score</th><th>Attempts</th><th>Flashcards</th></tr>
              </thead>
              <tbody>
                ${rows
                  .map(
                    ({ lesson, p }) => `
                  <tr>
                    <td>${lesson.icon} ${lesson.title}</td>
                    <td>${p.bestScore > 0 ? p.bestScore + "%" : "—"}</td>
                    <td>${p.attempts || 0}</td>
                    <td>${p.flashcardsPracticed ? "✅ Practiced" : "—"}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>`
          : `<div class="empty-state">
              <p>You haven't practiced any lessons yet.</p>
              <button class="btn btn-primary" id="go-lessons">Browse Lessons</button>
            </div>`
      }
    </div>
  `);

  const goBtn = wrap.querySelector("#go-lessons");
  if (goBtn) goBtn.addEventListener("click", () => setView("lessons"));
  return wrap;
}

// ---------- Init ----------

document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => setView(btn.dataset.view));
});

render();
