// DOM Elements
const elements = {
  quoteText: document.querySelector(".quote"),
  quoteBtn: document.querySelector("button"),
  authorName: document.querySelector(".name"),
  speechBtn: document.querySelector(".speech"),
  copyBtn: document.querySelector(".copy")
};

// Speech Synthesis instance
const synth = window.speechSynthesis;

// Fetch random quote with error handling
async function fetchRandomQuote() {
  try {
    elements.quoteBtn.classList.add("loading");
    elements.quoteBtn.textContent = "Loading Quote...";

    const response = await fetch("http://api.quotable.io/random", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { content, author } = await response.json();

    elements.quoteText.textContent = content;
    elements.authorName.textContent = author;
  } catch (error) {
    console.error("Error fetching quote:", error);
    elements.quoteText.textContent = "Failed to load quote. Please try again.";
    elements.authorName.textContent = "Unknown";
  } finally {
    elements.quoteBtn.classList.remove("loading");
    elements.quoteBtn.textContent = "New Quote";
  }
}

// Speak quote with cleanup
function speakQuote() {
  if (elements.quoteBtn.classList.contains("loading")) return;

  const text = `${elements.quoteText.textContent} by ${elements.authorName.textContent}`;
  const utterance = new SpeechSynthesisUtterance(text);

  // Clean up previous utterances
  synth.cancel();

  utterance.addEventListener("start", () => {
    elements.speechBtn.classList.add("active");
  });

  utterance.addEventListener("end", () => {
    elements.speechBtn.classList.remove("active");
  });

  synth.speak(utterance);
}

// Copy quote to clipboard with feedback
async function copyQuote() {
  try {
    await navigator.clipboard.writeText(elements.quoteText.textContent);
    // Optional: Add visual feedback
    elements.copyBtn.classList.add("copied");
    setTimeout(() => elements.copyBtn.classList.remove("copied"), 1000);
  } catch (error) {
    console.error("Failed to copy quote:", error);
  }
}

// Event Listeners
function initializeEventListeners() {
  elements.quoteBtn.addEventListener("click", fetchRandomQuote);
  elements.speechBtn.addEventListener("click", speakQuote);
  elements.copyBtn.addEventListener("click", copyQuote);
}

// Initialize the app
function init() {
  initializeEventListeners();
  // Optional: Load initial quote
  fetchRandomQuote();
}

init();