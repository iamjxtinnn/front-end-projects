'use strict'
let countdownInterval;
function startTimer() {
  // Clear any existing timer
  clearInterval(countdownInterval);

  // Get input values
  const hoursInput = document.getElementById("hours");
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");

  // Parse inputs with default to 0 if empty
  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  // Convert all to total seconds
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // If no time set, return
  if (totalSeconds <= 0) {
    alert("Please enter a valid time");
    return;
  }

  // Update countdown function
  function updateCountdown() {
    const countdownDisplay = document.getElementById("countdown");

    // Calculate hours, minutes, seconds
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    // Format with leading zeros
    countdownDisplay.textContent = `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

    // Decrement total seconds
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      // Stop the timer and play a sound
      clearInterval(countdownInterval);

    }
  }

  // Initial call to avoid delay
  updateCountdown();

  // Start interval
  countdownInterval = setInterval(updateCountdown, 1000);
}

function resetTimer() {
  // Stop the timer
  clearInterval(countdownInterval);

  // Reset display
  document.getElementById("countdown").textContent = "00:00:00";

  // Clear input fields
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

