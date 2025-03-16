const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/appRoutes');
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', authRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
