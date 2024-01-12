import { Schema, models, model, Document } from "mongoose";

export interface IInteraction extends Document {
  userId: Schema.Types.ObjectId;
  action: string;
  questionId: Schema.Types.ObjectId;
  answerId: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
  createdAt: Schema.Types.Date;
}

const InteractionSchema = new Schema<IInteraction>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  answerId: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
