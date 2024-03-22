// Fetch claims data from the server and populate the table
fetch('data.json')
  .then(response => response.json())
  .then(claims => {
    const tableBody = document.getElementById('claims-table-body');
    claims.forEach(claim => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${claim._id}</td>
        <td>${claim.name}</td>
        <td>${claim.claim_type}</td>
        <td>${claim.amount}</td>
        <td>${claim.status}</td>
        <td>
          <select id="status-${claim._id}">
            <option value="Under Processing">Under Processing</option>
            <option value="Approved">Approved</option>
            <option value="Received">Received</option>
          </select>
          <button onclick="updateStatus('${claim._id}')">Update</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  });

// Function to update the status of a claim
function updateStatus(claimId) {
  const status = document.getElementById(`status-${claimId}`).value;
  fetch('/admin/update-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ claimId, status })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    // Refresh the page to update the table
    location.reload();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to update claim status');
  });
}
