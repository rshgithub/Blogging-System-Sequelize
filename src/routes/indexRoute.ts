// src/routes/index.ts

import express, { Request, Response } from 'express'; 

const indexRoute = express.Router();

// Route to render index.ejs
indexRoute.get('/', (req: Request, res: Response) => {
    try {
      const message = 'Welcome to the Blogging System API!';
      res.status(200).send(message);
    } catch (err) {
        console.error('Error rendering index.ejs:', err);
        res.status(500).send('Internal Server Error');
    }
});

export { indexRoute };
