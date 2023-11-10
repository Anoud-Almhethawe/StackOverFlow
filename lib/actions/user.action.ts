"use server";

import { revalidatePath } from "next/cache";
import User from "../database/User.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import Question from "../database/Question.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clearkId: userId });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(Params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = Params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(Params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = Params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // DELETE USER FROM DATABASE
    // AND QUESTIONS, ANSWERS, COMMENTS AND ALL SOURCE OF OTHER THINGS

    // FIRST: GET QUESTION ID'S RELATED TO THIS USER
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );
    // DELETE USER QUESTIONS
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
