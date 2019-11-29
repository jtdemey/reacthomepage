import mongoose from 'mongoose';

const makeContactSchema = () => new mongoose.Schema({
    name: String,
    message: String,
    timestamp: String,
    userHash: String
});

export default makeContactSchema;