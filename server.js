// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')));

// Read data from the JSON file
const dataFilePath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(dataFilePath);
const data = JSON.parse(rawData);

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/check-status', (req, res) => {
  const { uid } = req.body;
  console.log('Received UID:', uid); // Log the received UID
  const claim = data.find(item => item.user_id === uid);
  console.log('Found Claim:', claim); // Log the found claim
  if (claim) {
    res.json({
      status: claim.status,
      name: claim.name,
      claim_type: claim.claim_type,
      amount: claim.amount,
      submitted_at: claim.submitted_at,
      updated_at: claim.updated_at,
      phone_number: claim.phone_number
    });
  } else {
    res.status(404).json({ error: 'No claim found for this UID' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
