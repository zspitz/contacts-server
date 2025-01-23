import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/contacts');
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export { dbConnect };