"use server";

import { revalidatePath } from "next/cache";
import Question from "../database/Question.model";
import Tag from "../database/tag.model";
import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "../database/User.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(Params: CreateQuestionParams) {
  try {
    // connect to DB
    connectToDatabase();
    const { title, content, tags, author, path } = Params;

    // create a question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];
    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // find the existing tag
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        // if  I FOUND the existing TAG i will push the question id in questions array in tag document
        // if no matched tag found we will insert a new document with name set the value of the tag
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // update the question - 1st i will found the question i already create it
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action
    // Increment author's reputation by+5 for creating a question
    // to eliminate the need for a reload
    revalidatePath(path);
  } catch (error) {}
}
