'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Param {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({text, author, communityId, path}: Param) {

    connectToDB();

    try {
    const createdThread = await Thread.create({
        text,
        author,
        community: null,
    });

    await User.findByIdAndUpdate(author, {
        $push: {
            threads: createdThread._id
        }
    })

    revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Eeeoe creating thread: ${error.message}`)
    }
};