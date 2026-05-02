// assets/js/table-sort.js

let sortDirection = {};

function sortTable(column, type) {
  const table = document.getElementById("journalTable");

  if (!table) return;

  const tbody = table.tBodies[0];

  // Get all rows
  let rows = Array.from(tbody.rows);

  // Keep last row ("Total") fixed
  const totalRow = rows.pop();

  // Toggle sort direction
  sortDirection[column] = !sortDirection[column];

  rows.sort((a, b) => {
    let A = a.cells[column].innerText.trim();
    let B = b.cells[column].innerText.trim();

    if (type === "number") {
      A = parseFloat(A);
      B = parseFloat(B);

      // Handle NaN values like "--"
      A = isNaN(A) ? -Infinity : A;
      B = isNaN(B) ? -Infinity : B;
    } else {
      A = A.toLowerCase();
      B = B.toLowerCase();
    }

    if (A < B) return sortDirection[column] ? -1 : 1;
    if (A > B) return sortDirection[column] ? 1 : -1;

    return 0;
  });

  // Rebuild tbody
  tbody.innerHTML = "";

  rows.forEach(row => tbody.appendChild(row));

  // Reattach total row
  tbody.appendChild(totalRow);
}
