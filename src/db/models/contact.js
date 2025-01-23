import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
    infoType: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: {
        type: String,
        required: true
    },
    contactInfos: [contactInfoSchema]
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;