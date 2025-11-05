// Author: Md Shaidul Islam
// Date: 2025-11-05

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#dataTable tbody");

  const timestampInput = document.getElementById("timestamp");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Fill timestamp automatically
    timestampInput.value = new Date().toLocaleString();

    // Clear old errors
    document.querySelectorAll(".error-message").forEach((el) => (el.textContent = ""));

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    // --- Validation rules ---
    // Full name: at least 2 words, each ≥ 2 chars
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,}/.test(fullName)) {
      document.getElementById("nameError").textContent =
        "Please enter your full name (first and last, both at least 2 letters).";
      valid = false;
    }

    // Email: simple regex check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address (e.g., name@example.com).";
      valid = false;
    }

    // Phone: Finnish-style +358 or 0-starting number
    if (!/^(\+358\s?\d{1,2}\s?\d{3,}\s?\d{2,})|(0\d{6,})$/.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Please enter a valid Finnish phone number (e.g., +358 40 123 4567).";
      valid = false;
    }

    // Birth date: not in the future and min age 13
    if (!birthDate) {
      document.getElementById("birthError").textContent = "Please select your birth date.";
      valid = false;
    } else {
      const dob = new Date(birthDate);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob > today) {
        document.getElementById("birthError").textContent = "Birth date cannot be in the future.";
        valid = false;
      } else if (age < 13) {
        document.getElementById("birthError").textContent = "You must be at least 13 years old.";
        valid = false;
      }
    }

    // Terms
    if (!terms) {
      document.getElementById("termsError").textContent = "You must accept the terms to continue.";
      valid = false;
    }

    // If not valid, stop
    if (!valid) return;

    // --- Add new table row ---
    const row = document.createElement("tr");

    [timestampInput.value, fullName, email, phone, birthDate].forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val;
      row.appendChild(td);
    });

    tableBody.appendChild(row);

    // Reset form for next input
    form.reset();
  });
});
