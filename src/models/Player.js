import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    extendTimerCt: Number,
    gameId: String,
    hurryUpCt: Number,
    isPlaying: Boolean,
    name: String,
    socket: mongoose.Mixed,
    socketId: String 
});

const playerModel = mongoose.model('Game', playerSchema);

export default playerModel;