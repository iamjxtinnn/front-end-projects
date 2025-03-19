// Get DOM elements
const tipContainer = document.getElementById("tip-container"); // Wraps tip label + amount
const tipAmountElement = document.getElementById("tip_amount");
const form = document.querySelector("form");
const resetButton = document.getElementById("reset");

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent page reload

  // Get form data
  const formData = new FormData(event.target);
  const bill = Number(formData.get("bill"));
  const tipPercentage = Number(formData.get("options"));
  const numberOfPersons = Number(formData.get("share"));

  // Validate input
  if (!bill || !tipPercentage || numberOfPersons < 1) {
    alert("Please enter valid values for bill, tip percentage, and number of people.");
    return;
  }

  // Calculate tip per person
  const perPersonBill = bill / numberOfPersons;
  const tipAmount = (tipPercentage / 100) * perPersonBill;

  // Display result
  tipContainer.style.display = "block";
  tipAmountElement.value = numberOfPersons === 1
    ? `$${tipAmount.toFixed(2)}`
    : `$${tipAmount.toFixed(2)} per person`;


}

/**
 * Hide tip result on reset
*/
function resetTip() {
  tipContainer.style.display = "none";
}

// Event listeners
form.addEventListener("submit", handleFormSubmit);
resetButton.addEventListener("click", resetTip);



