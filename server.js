require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const dataFilePath = path.join(__dirname, 'data.json');
const rawData = fs.readFileSync(dataFilePath);
const data = JSON.parse(rawData);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/check-status', (req, res) => {
  const { uid } = req.body;
  console.log('Received UID:', uid);
  const claim = data.find(item => item.user_id === uid);
  console.log('Found Claim:', claim);
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

    if (claim.status === 'Approved' || claim.status === 'Received') {
      client.messages.create({
        body: 'Your claim has been processed! Hii Smriti',
        to: claim.phone_number,
        from: process.env.TWILIO_PHONE_NUMBER
      })
      .then(message => console.log(message.sid))
      .catch(err => console.error(err));
    }
  } else {
    res.status(404).json({ error: 'No claim found for this UID' });
  }
});

// Admin login route
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

// Admin dashboard route
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});
app.get('/admin/claims', (req, res) => {
  res.json(data); // Assuming 'data' contains your claims data
});
// Route to handle updating claim status
app.post('/admin/update-status', (req, res) => {
  const { claimId, status } = req.body;
  // Find the claim in the data array and update its status
  const claimIndex = data.findIndex(item => item._id === claimId);
  if (claimIndex !== -1) {
    data[claimIndex].status = status;
    // Write the updated data back to the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.json({ message: 'Claim status updated successfully' });
  } else {
    res.status(404).json({ error: 'Claim not found' });
  }
});


// Admin login form submission
app.post('/admin/login', (req, res) => {
  const { token, password } = req.body;
  // Add your logic to verify admin token and password
  // For now, assuming token and password are correct
  res.redirect('/admin/dashboard');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
   













// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const twilio = require('twilio');
// const bodyParser = require('body-parser');
// const axios = require('axios'); // Use axios instead of fetch

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// const apiUrl = 'https://script.google.com/macros/s/AKfycbw3bS8kcInhPVu-4IGeweLo9pmbBw2iNyTmu2cPax4-i24t3MA8bjtb1iP_WsP9ZDKp2g/exec';

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

 


// app.post('/check-status', (req, res) => {
//   const { uid } = req.body;
//   console.log('Received UID:', uid);
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       if (!Array.isArray(data.data)) {
//         res.status(500).json({ error: 'Invalid data format received from API' });
//         return;
//       }

//       const claim = data.data.find(item => item.user_id == uid);
//       console.log('Found Claim:', claim);
//       if (claim) {
//         const formattedPhoneNumber = '+91' + claim.phone_number; // Add +91 before phone number
//         res.json({
//           status: claim.status,
//           name: claim.name,
//           claim_type: claim.claim_type,
//           amount: claim.amount,
//           submitted_at: claim.submitted_at,
//           updated_at: claim.updated_at,
//           phone_number: formattedPhoneNumber // Use the formatted phone number
//         });

//         if (claim.status === 'Approved' || claim.status === 'Received') {
//           client.messages.create({
//             body: 'Your claim has been processed!',
//             to: formattedPhoneNumber, // Use the formatted phone number
//             from: process.env.TWILIO_PHONE_NUMBER
//           })
//           .then(message => console.log(message.sid))
//           .catch(err => console.error(err));
//         }
//       } else {
//         res.status(404).json({ error: 'No claim found for this UID' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Failed to fetch data from API' });
//     });
// });

// // Admin login route
// app.get('/admin/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
// });

// // Admin dashboard route
// app.get('/admin/dashboard', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
// });
// app.get('/admin/claims', (req, res) => {
//   axios.get(apiUrl)
//     .then(response => res.json(response.data))
//     .catch(error => {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Failed to fetch data from API' });
//     });
// });

// // Route to handle updating claim status
// app.post('/admin/update-status', (req, res) => {
//   const { claimId, status } = req.body;
//   // Find the claim in the data array and update its status
//   axios.get(apiUrl)
//     .then(response => {
//       const data = response.data;
//       if (!Array.isArray(data)) {
//         throw new Error('Data is not an array');
//       }
//       const claimIndex = data.findIndex(item => item._id === claimId);
//       if (claimIndex !== -1) {
//         data[claimIndex].status = status;
//         // Write the updated data back to the API
//         axios.put(apiUrl, data)
//           .then(() => res.json({ message: 'Claim status updated successfully' }))
//           .catch(error => {
//             console.error('Error:', error);
//             res.status(500).json({ error: 'Failed to update claim status' });
//           });
//       } else {
//         res.status(404).json({ error: 'Claim not found' });
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Failed to fetch data from API' });
//     });
// });

// // Admin login form submission
// app.post('/admin/login', (req, res) => {
//   const { token, password } = req.body;
//   // Hardcoded values for demonstration, replace with actual verification logic
//   const correctToken = '1';
//   const correctPassword = '1';

//   if (token === correctToken && password === correctPassword) {
//     // Redirect to admin dashboard if token and password match
//     res.redirect('/admin/dashboard');
//   } else {
//     // Redirect to login page with error message if token or password is incorrect
//     res.redirect('/admin/login?error=InvalidCredentials');
//   }
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

