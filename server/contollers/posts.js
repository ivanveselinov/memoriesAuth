import express from 'express';
import mongoose from 'mongoose';

import PostMessage from "../models/postMessage.js";


const router = express.Router();

                //READ 
//                     //request //response
export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

                // get post by ID
export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

                // CREATE
export const createPost = async (req, res) => {
    const post = req.body;
                                                                // USER       //CREATED AT        
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

                        //  Update
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
                        //Delete 
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`); 

    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE');
    res.json ({ message: 'Post deleted successfully' })
}

                        //Like
export const likePost = async (req, res) => {

    const { id } = req.params;

    if(!req.userId) return json({ message: 'Unauthenticated' }) // If user is online!

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId)); //loop try id's to with is liked and if he liked to dislike

    if(index === -1){ // Check if post is liked 
        post.likes.push(req.userId) // like post
    } else{  //dislike
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true }) //Increment
    
    res.status(200).json(updatedPost);

}
