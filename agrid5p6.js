const express = require('express');
const router = express.Router();

// Import the Farmer model
const Farmer = require('../models/farmer');

// Route for registering a new farmer
router.post('/register', (req, res) => {
  // Create a new farmer
  const farmer = new Farmer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  // Save the farmer to the database
  farmer.save((err, farmer) => {
    if (err) {
      return res.status(500).json({
        message: 'Error saving farmer'
      });
    }

    // Return a success message
    res.json({
      message: 'Farmer created successfully!',
      farmer: farmer
    });
  });
});

// Route for logging in a farmer
router.post('/login', (req, res) => {
  // Find the farmer by email
  Farmer.findOne({
    email: req.body.email
  }, (err, farmer) => {
    if (err) {
      return res.status(500).json({
        message: 'Error finding farmer'
      });
    }

    // Check if the farmer exists
    if (!farmer) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Check if the password is correct
    if (farmer.password !== req.body.password) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Return a success message
    res.json({
      message: 'Farmer logged in successfully!',
      farmer: farmer
    });
  });
});

// Export the router
module.exports = router;

const express = require('express');
const farmerRoutes = require('./routes/farmer-routes');

// Initialize the app
const app = express();

// Use the farmer routes
app.use('/api/farmers', farmerRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
``