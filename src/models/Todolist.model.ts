// Require mongoose package
import mongoose from "mongoose";


// Define BucketlistSchema with title, description and category
const TodolistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    priority: {
        type: String,
        required: true,
        enum: ["High", "Medium", "Low"]
    }
});

const TodoList = module.exports = mongoose.model("TodoList", TodolistSchema );

module.exports.getAllTasksList = (callback: any) => {
    TodoList.find(callback);
};

// newList.save is used to insert the document into MongoDB
module.exports.addTask = (newList: any, callback: any) => {
    newList.save(callback);
};

// Here we need to pass an id parameter to BUcketList.remove
module.exports.deleteTaskById = (id: any, callback: any ) => {
    const query = {_id: id};
    TodoList.remove(query, callback);
};