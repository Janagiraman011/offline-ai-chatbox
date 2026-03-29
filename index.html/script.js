const KB = {

  "mathematical operations": {
    answer: `<strong>Basic Mathematical Operations</strong><br><br>
      • <strong>Addition (+)</strong> → 5 + 3 = 8<br>
      • <strong>Subtraction (−)</strong> → 5 − 3 = 2<br>
      • <strong>Multiplication (×)</strong> → 5 × 3 = 15<br>
      • <strong>Division (÷)</strong> → 6 ÷ 3 = 2<br><br>
      <strong>Order of Operations (BODMAS):</strong><br>
      Brackets → Orders → Division → Multiplication → Addition → Subtraction`,
    topic: "Math"
  },

  "pythagorean theorem": {
    answer: `<strong>Pythagorean Theorem</strong><br><br>
      <span class="formula">a² + b² = c²</span><br><br>
      Used in right-angled triangles.<br>
      c = hypotenuse (longest side)<br><br>
      Example: a=3, b=4 → c=5`,
    topic: "Math"
  },

  "newton's laws": {
    answer: `<strong>Newton’s Laws of Motion</strong><br><br>
      <strong>1.</strong> Inertia<br>
      <strong>2.</strong> <span class="formula">F = m × a</span><br>
      <strong>3.</strong> Action = Reaction`,
    topic: "Physics"
  },

  "divisions in science": {
    answer: `<strong>Branches of Science</strong><br><br>
      • <strong>Physics</strong> → Study of matter, energy, motion<br>
      • <strong>Chemistry</strong> → Study of substances and reactions<br>
      • <strong>Biology</strong> → Study of living organisms<br><br>
      <strong>Other fields:</strong><br>
      • Astronomy 🌌<br>
      • Geology 🌍<br>
      • Environmental Science 🌱`,
    topic: "Science"
  },

  "english language": {
    answer: `<strong>English Language Basics</strong><br><br>
      English is a global language used for communication.<br><br>
      <strong>Main Components:</strong><br>
      • Grammar<br>
      • Vocabulary<br>
      • Pronunciation<br>
      • Writing & Speaking<br><br>
      Used in education, business, and technology.`,
    topic: "English"
  },

  "parts of speech": {
    answer: `<strong>Parts of Speech</strong><br><br>
      • Noun → name<br>
      • Pronoun → replaces noun<br>
      • Verb → action<br>
      • Adjective → describes noun<br>
      • Adverb → describes verb<br>
      • Preposition → position<br>
      • Conjunction → joins words<br>
      • Interjection → emotion`,
    topic: "English"
  },

  "programming languages": {
    answer: `<strong>Programming Languages</strong><br><br>
      Languages used to write programs:<br><br>
      • Python 🐍<br>
      • Java ☕<br>
      • C / C++<br>
      • JavaScript 🌐<br><br>
      Used to build apps, websites, games, AI systems.`,
    topic: "Computer"
  },


  "binary numbers": {
    answer: `<strong>Binary Number System</strong><br><br>
      Uses only 0 and 1.<br><br>
      Example:<br>
      <span class="formula">1010₂ = 10₁₀</span><br><br>
      Used in computers.<br>
      8 bits = 1 byte`,
    topic: "Computer"
  }

};

function findAnswer(input) {
  const q = input.toLowerCase().trim();

  // Direct match
  for (const key in KB) {
    if (q.includes(key.toLowerCase())) {
      return KB[key];
    }
  }

  // Synonyms
  for (const syn in synonyms) {
    if (q.includes(syn.toLowerCase())) {
      const key = synonyms[syn];
      if (KB[key]) return KB[key];
    }
  }

  return null;
}

// ── Synonyms ──────────────────────────────────────────
const synonyms = {
  "pythagoras": "pythagorean theorem",
  "triangle": "pythagorean theorem",
  "quadratic": "quadratic formula",
  "average": "mean median mode",
  "plant": "photosynthesis",
  "motion": "newton's laws"
};

// ── Find Answer ──────────────────────────────────────────
function findAnswer(input) {
  const q = input.toLowerCase().trim();

  // Direct match
  for (const key in KB) {
    if (q.includes(key)) return KB[key];
  }

  // Synonym match
  for (const syn in synonyms) {
    if (q.includes(syn)) {
      return KB[synonyms[syn]];
    }
  }

  return null;
}

// ── Default Replies ──────────────────────────────────────────
const defaults = [
  "I don't know that yet. Try Math, Science, English or Computer topics.",
  "Please ask a known topic like 'Pythagorean theorem'.",
  "Topic not found in my database."
];

let defIdx = 0;
let isTyping = false;

// ── UI Functions ──────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMsg(role, htmlContent) {
  const chat = document.getElementById('chat');

  const msg = document.createElement('div');
  msg.className = `msg ${role}`;

  msg.innerHTML = `
    <div class="avatar">${role === 'ai' ? '🧠' : '👤'}</div>
    <div>
      <div class="bubble">${htmlContent}</div>
      <div class="meta">${getTime()}</div>
    </div>
  `;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  const chat = document.getElementById('chat');

  const typing = document.createElement('div');
  typing.id = "typing-msg";
  typing.className = "msg ai";
  typing.innerHTML = `
    <div class="avatar">🧠</div>
    <div class="typing-indicator">
      <span></span><span></span><span></span>
    </div>
  `;

  chat.appendChild(typing);
}

function removeTyping() {
  const el = document.getElementById('typing-msg');
  if (el) el.remove();
}

// ── Main Logic ──────────────────────────────────────────
function processQuery(text) {
  if (isTyping) return;
  isTyping = true;

  appendMsg('user', text);
  showTyping();

  setTimeout(() => {
    removeTyping();

    const result = findAnswer(text);

    if (result) {
      appendMsg('ai', result.answer);
    } else {
      appendMsg('ai', defaults[defIdx % defaults.length]);
      defIdx++;
    }

    isTyping = false;
  }, 800);
}

// ── Input Handling ──────────────────────────────────────────
function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();

  if (!text) return;

  input.value = '';
  processQuery(text);
}

function quickAsk(text) {
  processQuery(text);
}

// ── Auto Resize ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const ta = document.getElementById('userInput');

  ta.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  ta.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});