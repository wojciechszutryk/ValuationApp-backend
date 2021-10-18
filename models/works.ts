import mongoose from 'mongoose'

interface WorksInterface {
    _id: string;
    valuationObjectId: string;
    valuationObjectsId: string;
}

const worksSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    valuationObjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'ValuationObject', required: true},
    valuationObjectsId: {type: mongoose.Schema.Types.ObjectId, ref: 'ValuationObjects', required: true},
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