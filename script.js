const onMessage = () => {
  // Are we in a call?
  if (document.querySelector('button[aria-label*="Raise hand"]')) {
    fixButton();
    removeEventListener("message", onMessage);
  }
};

// Listen for changes to the page
addEventListener("message", onMessage);

const fixButton = () => {
  // Keep track of whether the hand is currently raised
  let handRaised = false;

  // Clone the 'Raise hand' button
  const originalButton = document.querySelector(
    'button[aria-label*="Raise hand"]'
  );
  const original = originalButton.parentElement.parentElement.parentElement;

  const clone = original.cloneNode(true);
  const cloneButton = clone.querySelector("button");

  original.after(clone);

  // Hide the original button
  original.style.display = "none";

  // Tweak the action to include a confirmation dialog
  cloneButton.removeAttribute("jsaction");
  cloneButton.addEventListener("click", () => {
    if (
      handRaised ||
      window.confirm("Do you actually want to raise your hand?")
    ) {
      // Click the original button
      originalButton.click();
      cloneButton.className = originalButton.className;
      handRaised = !handRaised;
    }
  });
};
