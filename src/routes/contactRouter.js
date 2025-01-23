import { Router } from 'express';
import Contact from '../db/models/contact.js';
import { contactValidationSchema } from '../validations/contact.js';

const contactRouter = Router();

contactRouter.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
});

contactRouter.post('/', async (req, res) => {
    try {
        await contactValidationSchema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error);
        return;
    }

    const newContact = await Contact.create(req.body);
    res.send(newContact);
});

export { contactRouter };