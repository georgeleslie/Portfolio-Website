const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');  // Import morgan for logging
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));

// Load environment variables from .env file
require('dotenv').config();

// Set up CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));  // Enable CORS

// Use Helmet for setting security headers
app.use(helmet());  // Apply helmet security headers

// Use morgan for logging HTTP requests
app.use(morgan('combined'));  // Log all requests in Apache combined format

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Serve the HTML form file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form submission with validation and sanitization
app.post(
  '/send-email',
  [
    body('fullName').trim().isLength({ min: 1 }).withMessage('Full Name is required').escape(),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('phone').trim().isLength({ min: 10 }).withMessage('Please provide a valid phone number').escape(),
    body('zipCode').trim().isLength({ min: 1 }).withMessage('Location (Country) is required').escape(),
    body('notes').trim().isLength({ min: 1 }).withMessage('Message is required').escape(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, zipCode, notes } = req.body;

    const mailOptions = {
      from: 'itgeorgeleslie@gmail.com',
      to: 'georgeleslie06@gmail.com',
      subject: `New contact form submission from ${fullName}`,
      text: `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${zipCode}\nMessage: ${notes}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error occurred: ${error.message}`);
        return next(error);  // Pass the error to the error handler
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Form submitted and email sent successfully!');
      }
    });
  }
);

// Generic Error Handler for All Errors
app.use((err, req, res, next) => {
  // Log the error details for debugging
  console.error(err.stack);

  if (app.get('env') === 'development') {
    return res.status(500).send({ message: err.message, stack: err.stack });
  } else {
    return res.status(500).send({ message: 'An error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
