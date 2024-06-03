const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post",
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "Lost",
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }],

}, 
{timestamps: true},
);

module.exports = mongoose.model("User", UserSchema);