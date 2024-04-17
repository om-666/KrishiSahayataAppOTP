app.post('/check-status', (req, res) => {
    const { uid } = req.body;
    console.log('Received UID:', uid);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (!Array.isArray(data.data)) {
          res.status(500).json({ error: 'Invalid data format received from API' });
          return;
        }
  
        const claim = data.data.find(item => item.user_id == uid);
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
              body: 'Your claim has been processed!',
              to: claim.phone_number,
              from: process.env.TWILIO_PHONE_NUMBER
            })
            .then(message => console.log(message.sid))
            .catch(err => console.error(err));
          }
        } else {
          res.status(404).json({ error: 'No claim found for this UID' });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from API' });
      });
  });