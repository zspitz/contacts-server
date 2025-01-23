import { Router } from 'express';
import Contact from '../db/models/contact.js';

const contactRouter = Router();

contactRouter.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
});

export { contactRouter };