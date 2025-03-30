const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser"); 
const authRoutes = require('./routes/appRoutes');
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST',
    credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads'));
app.use('/', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
