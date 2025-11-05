document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const reviewForm = document.getElementById("reviewForm");

  const handleFormSubmit = async (form, messageEl) => {
    const formURL = form.getAttribute("action");
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;
    messageEl.classList.remove("show", "success", "error");

    try {
      const response = await fetch(formURL, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        messageEl.textContent = "Thank you! Your message has been sent.";
        messageEl.className = "form-message show success";
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          messageEl.textContent = data.errors.map((e) => e.message).join(", ");
        } else {
          messageEl.textContent = "Oops! There was an issue. Please try again.";
        }
        messageEl.className = "form-message show error";
      }
    } catch (error) {
      messageEl.textContent = "Oops! There was an issue. Please try again.";
      messageEl.className = "form-message show error";
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit(contactForm, document.getElementById("formMessage"));
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFormSubmit(
        reviewForm,
        document.getElementById("reviewFormMessage")
      );
    });
  }
});