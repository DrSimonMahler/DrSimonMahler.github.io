// table-sort.js

window.sortTable = function(column, type, ascending) {

  const table = document.getElementById("journalTable");
  const tbody = table.querySelector("tbody");

  let rows = Array.from(tbody.querySelectorAll("tr"));

  // Remove total row
  const totalRow = rows.pop();

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

  tbody.innerHTML = "";

  rows.forEach(row => tbody.appendChild(row));

  // Put total row back
  tbody.appendChild(totalRow);

  updateTotal();
};
