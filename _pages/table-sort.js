// table-sort.js

document.addEventListener("DOMContentLoaded", function () {

  // Initialize totals on page load
  updateTotal();

  // Make function global so onclick works
  window.sortTable = function(column, type) {

    const table = document.getElementById("journalTable");

    if (!table) {
      console.error("Table not found");
      return;
    }

    const tbody = table.querySelector("tbody");

    if (!tbody) {
      console.error("tbody not found");
      return;
    }

    // Get rows
    let rows = Array.from(tbody.querySelectorAll("tr"));

    // Remove last row (Total)
    const totalRow = rows.pop();

    // Toggle direction
    const ascending =
      table.getAttribute("data-sort-dir") !== "asc";

    table.setAttribute(
      "data-sort-dir",
      ascending ? "asc" : "desc"
    );

    rows.sort(function(a, b) {

      let A = a.cells[column].textContent.trim();
      let B = b.cells[column].textContent.trim();

      if (type === "number") {
        A = parseFloat(A) || 0;
        B = parseFloat(B) || 0;
      } else {
        A = A.toLowerCase();
        B = B.toLowerCase();
      }

      if (A < B) return ascending ? -1 : 1;
      if (A > B) return ascending ? 1 : -1;

      return 0;
    });

    // Clear tbody
    tbody.innerHTML = "";

    // Re-add sorted rows
    rows.forEach(row => tbody.appendChild(row));

    // Recalculate total
    updateTotal();

    // Add total row back
    tbody.appendChild(totalRow);
  };

  function updateTotal() {

    const table = document.getElementById("journalTable");

    if (!table) return;

    const tbody = table.querySelector("tbody");

    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll("tr"));

    if (rows.length === 0) return;

    // Last row is total row
    const totalRow = rows[rows.length - 1];

    let total = 0;

    // Sum all rows except total row
    for (let i = 0; i < rows.length - 1; i++) {

      const val = parseFloat(
        rows[i].cells[2].textContent.trim()
      );

      if (!isNaN(val)) {
        total += val;
      }
    }

    totalRow.cells[0].innerHTML = "<strong>Total</strong>";
    totalRow.cells[1].textContent = "--";
    totalRow.cells[2].innerHTML =
      "<strong>" + total + "</strong>";
  }

});
