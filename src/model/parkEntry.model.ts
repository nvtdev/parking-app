import mongoose from "mongoose";

export interface ParkEntryInput {
  registrationNumber: string;
  category: string;
  discountCard?: string | undefined;
  spotsRequired?: number | undefined;
}

export interface GetCurrentBillInput {
  registrationNumber: string;
}

export interface ParkEntryDocument extends ParkEntryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  spots: number;
}

const ParkEntrySchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    discountCard: { type: String, required: false },
    spotsRequired: { type: Number, required: false },
  },
  { timestamps: true }
);

const ParkEntryModel = mongoose.model<ParkEntryDocument>(
  "ParkEntry",
  ParkEntrySchema
);

export default ParkEntryModel;
