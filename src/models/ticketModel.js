const { getDatabaseInstance } = require('../db');

class Ticket {
    static async generateAndSaveTickets(numberOfSets) {
        const db = getDatabaseInstance();
        const generatedTickets = {};

        for (let setNumber = 1; setNumber <= numberOfSets; setNumber++) {
            const tickets = this.generateTambolaSet();
            generatedTickets[setNumber] = tickets;

            for (let ticketNumber = 1; ticketNumber <= 6; ticketNumber++) {
                const numbers = tickets[ticketNumber - 1].join(',');
                await db.run(
                    'INSERT INTO tickets (set_number, ticket_number, numbers) VALUES (?, ?, ?)',
                    [setNumber, ticketNumber, numbers]
                );
            }
        }

        return generatedTickets;
    }

    static async fetchTickets(page, pageSize) {
        const db = getDatabaseInstance();
        const offset = (page - 1) * pageSize;

        const query = `
            SELECT * FROM tickets
            ORDER BY set_number, ticket_number
            LIMIT ${pageSize} OFFSET ${offset}
        `;

        return await db.all(query);
    }

    static generateTambolaSet() {
        const set = [];
        for (let i = 0; i < 6; i++) {
            set.push(this.generateTambolaTicket());
        }
        return set;
    }

    static generateTambolaTicket() {
        const ticket = [];
        const usedNumbers = new Set();

        for (let column = 0; column < 9; column++) {
            const colNumbers = [];
            for (let i = column * 10 + 1; i <= column * 10 + 10; i++) {
                colNumbers.push(i);
            }
            colNumbers.sort(() => Math.random() - 0.5);

            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * colNumbers.length);
                const number = colNumbers.splice(randomIndex, 1)[0];
                usedNumbers.add(number);
                ticket.push(number);
            }
        }

        for (let i = 0; i < 3; i++) {
            ticket.push(0); // Filling blank cells with zero
        }

        return ticket;
    }
}

module.exports = Ticket;
