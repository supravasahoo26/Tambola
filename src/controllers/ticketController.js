const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel');

router.post('/generate-tickets', async (req, res) => {
    const { numberOfSets } = req.body;

    try {
        const generatedTickets = await Ticket.generateAndSaveTickets(numberOfSets);
        res.json({ tickets: generatedTickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/fetch-tickets', async (req, res) => {
    const { page = 1, pageSize = 5 } = req.query;

    try {
        const tickets = await Ticket.fetchTickets(page, pageSize);
        res.json({ tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
