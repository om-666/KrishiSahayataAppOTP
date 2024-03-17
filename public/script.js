// script.js

const form = document.querySelector('form');
const statusContainer = document.getElementById('status-container');
const statusMessage = document.getElementById('status-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const uid = formData.get('uid'); // Get the UID value from the form data

  const response = await fetch('/check-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Set the content type to JSON
    },
    body: JSON.stringify({ uid }) // Send the UID as JSON data
  });

  const data = await response.json();
  if (response.ok) {
    statusMessage.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Name</th>
          <th scope="col">Claim Type</th>
          <th scope="col">Amount</th>
          <th scope="col">Submitted At</th>
          <th scope="col">Updated At</th>
          <th scope="col">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${data.status}</td>
          <td>${data.name}</td>
          <td>${data.claim_type}</td>
          <td>${data.amount}</td>
          <td>${data.submitted_at}</td>
          <td>${data.updated_at}</td>
          <td>${data.phone_number}</td>
        </tr>
      </tbody>
    </table>
  `;

    statusContainer.classList.remove('error-message'); // Remove error class
    statusContainer.classList.add('status-message'); // Add status class

    if (data.status === 'Ongoing') {
      const img = document.createElement('img');
      img.src = 'https://i.gifer.com/origin/99/99fe107513ecff5c2b4af0b3f6d62fc9.gif';
      img.alt = 'Ongoing';
      const imgContainer = document.createElement('div');
      imgContainer.appendChild(img);
      statusContainer.insertBefore(imgContainer, statusMessage);
    }

    if (data.status === 'Under Processing') {
      document.querySelector('.under-processing').classList.add('active');
    } else if (data.status === 'Approved') {
      document.querySelector('.approved').classList.add('active');
    } else if (data.status === 'Received') {
      document.querySelector('.received').classList.add('active');
    }
  } else {
    statusMessage.textContent = data.error;
    statusContainer.classList.remove('status-message'); // Remove status class
    statusContainer.classList.add('error-message'); // Add error class
  }
});
