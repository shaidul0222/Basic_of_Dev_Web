// Author: Md Shaidul Islam
// Date: 2025-11-13

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("dataTableBody");
  const timestampInput = document.getElementById("timestamp");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    timestampInput.value = new Date().toLocaleString();

    document.querySelectorAll(".text-red-600").forEach((el) => (el.textContent = ""));

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,}/.test(fullName)) {
      document.getElementById("nameError").textContent =
        "Please enter your full name (first and last, both at least 2 letters).";
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      valid = false;
    }

    if (!/^(\+358\s?\d{1,2}\s?\d{3,}\s?\d{2,})|(0\d{6,})$/.test(phone)) {
      document.getElementById("phoneError").textContent =
        "Please enter a valid Finnish phone number.";
      valid = false;
    }

    if (!birthDate) {
      document.getElementById("birthError").textContent = "Please select your birth date.";
      valid = false;
    } else {
      const dob = new Date(birthDate);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (dob > today) {
        document.getElementById("birthError").textContent =
          "Birth date cannot be in the future.";
        valid = false;
      } else if (age < 13) {
        document.getElementById("birthError").textContent =
          "You must be at least 13 years old.";
        valid = false;
      }
    }

    if (!terms) {
      document.getElementById("termsError").textContent =
        "You must accept the terms to continue.";
      valid = false;
    }

    if (!valid) return;

    const row = document.createElement("tr");
    row.classList.add("odd:bg-white", "even:bg-slate-100");

    [timestampInput.value, fullName, email, phone, birthDate].forEach((val) => {
      const td = document.createElement("td");
      td.classList.add("py-2", "px-4", "border-b", "border-slate-200");
      td.textContent = val;
      row.appendChild(td);
    });

    tableBody.appendChild(row);
    form.reset();
  });
});
