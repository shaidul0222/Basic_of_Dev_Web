/*
AAuthor: Md Shaidul Islam
Date: 2025-10-29
Description: Handles Add Row behavior for Weekly Timetable
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addCourseForm");
  const tableBody = document.querySelector("#timetable tbody");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value.trim();
    if (!courseName) return;

    const checkedDays = Array.from(
      form.querySelectorAll("input[name='day']:checked")
    ).map((input) => input.value);

    // Create row
    const newRow = document.createElement("tr");

    // Course cell
    const courseCell = document.createElement("td");
    courseCell.textContent = courseName;
    newRow.appendChild(courseCell);

    // Define days in same order as header
    const days = ["Mon","Tue","Wed","Thu","Fri"];
    days.forEach((day) => {
      const cell = document.createElement("td");
      cell.textContent = checkedDays.includes(day) ? "✅" : "❌";
      newRow.appendChild(cell);
    });

    tableBody.appendChild(newRow);
    form.reset();
  });
});
