const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser"); 
const authRoutes = require('./routes/appRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads'));
app.use('/', authRoutes);

module.exports = app;