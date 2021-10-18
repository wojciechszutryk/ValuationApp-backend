import mongoose from 'mongoose';

interface ValuationObjectsInterface {
    _id: string;
    workId: string;
    name: string;
    parametersValues: number[];
    area: number;
    price: number;
    isForValuation: boolean;
}

const valuationObjects = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    workId: {type: mongoose.Schema.Types.ObjectId, ref: 'Works', required: true},
    name: mongoose.Schema.Types.String,
    parametersValues: mongoose.Schema.Types.Array,
    area: mongoose.Schema.Types.Number,
    price: mongoose.Schema.Types.Number,
    isForValuation: mongoose.Schema.Types.Boolean,
});

const ValuationObjects = mongoose.model<ValuationObjectsInterface & mongoose.Document>('valuationObjects', valuationObjects);

export {ValuationObjects};