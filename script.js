// ============================================
// KeyStride Typing Institute — script.js
// ============================================

/* ---------- Mobile nav toggle ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navEl = document.querySelector(".nav");
if (navToggle && navEl) {
  navToggle.addEventListener("click", () => {
    navEl.classList.toggle("open");
    const expanded = navEl.classList.contains("open");
    navToggle.setAttribute("aria-expanded", expanded);
  });
}

/* ---------- Typing speed test ---------- */
const sampleTexts = [
  "the quick brown fox jumps over the lazy dog while the sun sets behind the hills",
  "practice makes progress not perfection so keep your fingers moving on the home row",
  "great typists are made through daily repetition not talent so start today and stay consistent",
  "accuracy first then speed will follow naturally as your muscle memory improves over time",
  "focus on rhythm and breathing steady hands lead to steady words on the page"
];

function initTypingTest() {
  const sampleEl = document.getElementById("typeSample");
  const inputEl = document.getElementById("typeInput");
  const wpmEl = document.getElementById("statWpm");
  const accEl = document.getElementById("statAcc");
  const timeEl = document.getElementById("statTime");
  const resetBtn = document.getElementById("typeReset");

  if (!sampleEl || !inputEl) return; // widget not on this page

  let currentText = "";
  let startTime = null;
  let timerInterval = null;
  let totalTyped = 0;
  let totalErrors = 0;

  function pickText() {
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    renderSample();
  }

  function renderSample() {
    const typed = inputEl.value;
    let html = "";
    for (let i = 0; i < currentText.length; i++) {
      const char = currentText[i];
      if (i < typed.length) {
        html += typed[i] === char
          ? `<span class="correct">${char}</span>`
          : `<span class="incorrect">${char}</span>`;
      } else if (i === typed.length) {
        html += `<span class="current">${char}</span>`;
      } else {
        html += char;
      }
    }
    sampleEl.innerHTML = html;
  }

  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      if (timeEl) timeEl.textContent = seconds + "s";
      updateWpm();
    }, 500);
  }

  function updateWpm() {
    if (!startTime) return;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = inputEl.value.trim().split(/\s+/).filter(Boolean).length;
    const wpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
    if (wpmEl) wpmEl.textContent = wpm;
  }

  function updateAccuracy() {
    const typed = inputEl.value;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === currentText[i]) correct++;
    }
    const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;
    if (accEl) accEl.textContent = accuracy + "%";
    return accuracy;
  }

  function finish() {
    clearInterval(timerInterval);
    updateWpm();
    updateAccuracy();
    inputEl.disabled = true;
  }

  inputEl.addEventListener("input", () => {
    if (!startTime) startTimer();
    renderSample();
    updateAccuracy();

    if (inputEl.value.length >= currentText.length) {
      finish();
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      clearInterval(timerInterval);
      startTime = null;
      inputEl.disabled = false;
      inputEl.value = "";
      if (wpmEl) wpmEl.textContent = "0";
      if (accEl) accEl.textContent = "100%";
      if (timeEl) timeEl.textContent = "0s";
      pickText();
      inputEl.focus();
    });
  }

  pickText();
}

/* ---------- Contact form (placeholder submit, no backend yet) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msg) {
      msg.textContent = "Message received — this is a demo form, so nothing was actually sent yet. Hook it up to a form service or backend when you're ready.";
      msg.classList.add("show", "ok");
    }
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTypingTest();
  initContactForm();
});
