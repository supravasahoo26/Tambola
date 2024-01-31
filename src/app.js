const express = require('express');
const ticketController = require('./controllers/ticketController');
const { initDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initDatabase();

app.use('/api', ticketController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
