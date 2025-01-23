import { Router } from 'express';
import Contact from '../db/models/contact.js';
import { contactValidationSchema, contactInfoValidationSchema } from '../validations/contact.js';

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

contactRouter.post('/:id/contactinfos', async (req, res) => {
    try {
        await contactInfoValidationSchema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error);
        return;
    }
    req.contact.contactInfos.push(req.body);
    req.contact.save();
    res.status(200).send(req.contact);
});

contactRouter.delete('/:id/contactinfos', async (req, res) => {
    try {
        await contactInfoValidationSchema.validateAsync(req.body);
    } catch (error) {
        res.status(400).send(error);
        return;
    }

    const index = req.contact.contactInfos.findIndex(ci => {
        return (
            ci.infoType === req.body.infoType &&
            ci.value === req.body.value
        );
    });
    if (index === -1) {
        res.status(404).send('Contact info not found');
        return;
    }
    req.contact.contactInfos.splice(index, 1);
    req.contact.save();
    res.status(200).send(req.contact);
});

export { contactRouter };