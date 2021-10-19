import mongoose from 'mongoose';

interface WorksInterface {
    _id: string;
    date: string;
    parameters: string[];
}

const worksSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: mongoose.Schema.Types.String,
    parameters: mongoose.Schema.Types.Array,
});

// let Works;
//
// if (mongoose.models.works) {
//     Works = mongoose.model<WorksInterface & mongoose.Document>('works');
// } else {
//     Works = mongoose.model<WorksInterface & mongoose.Document>('works', worksSchema);
// }

const Works = mongoose.model<WorksInterface & mongoose.Document>('works', worksSchema);

export {Works};