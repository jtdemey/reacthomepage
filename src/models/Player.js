import mongoose from 'mongoose';

const makePlayerSchema = () => new mongoose.Schema({
    extendTimerCt: Number,
    gameId: String,
    hurryUpCt: Number,
    isPlaying: Boolean,
    name: String,
    socket: mongoose.Mixed,
    socketId: String 
});

export default makePlayerSchema;