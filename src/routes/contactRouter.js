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

contactRouter.param('id', async (req, res, next, id) => {
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404).send('Contact not found');
        return;
    }
    req.contact = contact;
    next();
});

contactRouter.get('/:id', async (req, res) => {
    res.status(200).send(req.contact);
});

contactRouter.delete('/:id', async (req, res) => {
    req.contact.deleteOne();
    res.status(200).send(req.contact);
});


export { contactRouter };