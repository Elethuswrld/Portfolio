document.addEventListener("DOMContentLoaded", function () {
  // Function to handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);
    const formMessage = form.previousElementSibling; // Get the message div right before the form

    // Show a pending message
    formMessage.textContent = "Sending...";
    formMessage.className = "form-message"; // Reset classes

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Success
        formMessage.textContent = "Thank you! Your message has been sent successfully.";
        formMessage.classList.add("show", "success");
        form.reset(); // Clear the form fields
      } else {
        // Server-side error
        const data = await response.json();
        const errorMessage = data.errors ? data.errors.map((error) => error.message).join(", ") : "Oops! There was a problem submitting your form.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      // Network or other error
      formMessage.textContent = error.message || "An unexpected error occurred. Please try again.";
      formMessage.classList.add("show", "error");
    } finally {
      // Hide the message after 5 seconds
      setTimeout(() => {
        formMessage.classList.remove("show");
      }, 5000);
    }
  }

  // Attach event listeners to both forms
  const contactForm = document.getElementById("contactForm");
  const reviewForm = document.getElementById("reviewForm");

  if (contactForm) contactForm.addEventListener("submit", handleFormSubmit);
  if (reviewForm) reviewForm.addEventListener("submit", handleFormSubmit);
});