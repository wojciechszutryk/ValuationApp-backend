import mongoose from 'mongoose';

interface UserInterface {
    _id: string;
    email: string;
    userName: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {type: String, required: true}
});

const Users = mongoose.model<UserInterface & mongoose.Document>('users', userSchema);

export {Users};