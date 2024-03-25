// Function to fetch data from the API
async function fetchData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw3bS8kcInhPVu-4IGeweLo9pmbBw2iNyTmu2cPax4-i24t3MA8bjtb1iP_WsP9ZDKp2g/exec');
    const data = await response.json();
    console.log(data);
  }
  
  // Function to update data in the API
  async function updateData() {
    const newData = {
      _id: '1',
      user_id: '123',
      name: 'John Doe',
      claim_type: 'Equipment Repair',
      amount: 500,
      status: 'Under Process',
      submitted_at: '2024-03-15T10:00:00Z',
      updated_at: '2024-03-15T10:30:00Z',
      phone_number: '6370081836',
      Email: 'john@example.com',
      Age: 35,
      Farmer_type: 'Farmer',
      Ifsc_code: 'ABCD1234',
      State: 'California',
      District: 'Los Angeles',
      Bank_Name: 'ABC Bank',
      Bank_Branch_number: '12345',
      Savings_Bank_AC_no: '54321',
      Confirms_Saving_Bank: 'Yes',
      Registration_State_State: 'California',
      Registration_District: 'Los Angeles',
      Sub_District: 'ABC',
      Residential_Village_Town: 'XYZ',
      Address: '123 Main St',
      Pin_Code: '12345',
      password: 'password123',
      password2: 'password123',
      Cause_of_loss: 'Equipment Failure'
    };
  
    const response = await fetch('https://script.google.com/macros/s/AKfycbw3bS8kcInhPVu-4IGeweLo9pmbBw2iNyTmu2cPax4-i24t3MA8bjtb1iP_WsP9ZDKp2g/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
  
    const result = await response.text();
    console.log(result);
  }
  
  // Test fetching data
  fetchData();
  
  // Test updating data
  updateData();



// //   fullname: "",
//     //   relationship:"",
//     //   guardian_Name:"",
//        Email:"",
//     //   mobileNumber:"",
//       Age:"",
//       Farmer_type:"",
//     //   Occupation:"",
//     //   ID_Number:"",
//       Ifsc_code:"",
//       State:"",
//       District:"",
//       Bank_Name:"",
//       Bank_Branch_number:"",
//       Savings_Bank_AC_no:"",
//       Confirms_Saving_Bank:"",
//       Registration_State_State:"",
//       Registration_District:"",
//       Sub_District:"",
//       Residential_Village_Town:"",
//       Address:"",
//       Pin_Code:"",
//       password: "",
//       password2: "",
//       claim_type " ",
//       amount "",
//       submitted_at" ",
//       Cause_of_loss "",
//       phone_number "",
//       name "",

  