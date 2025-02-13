const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/appRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
