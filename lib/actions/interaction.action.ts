"use server";

import Question from "@/database/Question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/Interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId } = params;
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });
    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });
      if (existingInteraction) console.log("user already view this question");

      await Interaction.create({
        userId,
        questionId,
        action: "view",
      });
    }
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
