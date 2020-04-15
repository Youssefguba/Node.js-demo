const Joi = require('@hapi/joi');
const mongoose = require('mongoose');


const Post = mongoose.model('Post', new mongoose.Schema({
    post: {type: String, required: true, minlength: 2, maxlength: 150},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: {type: String},
    image: {type: String},
    followers: Number

}));

async function createAuthor(name, image){
    const author = new Author({
        name,
        image
    });
    const result = await author.save();
    console.log(result)
}

async function createPost(post){
    const nPost = new Post({
        post,
    });
    const result = await nPost.save();
    console.log(result)
}


/* Fun of Validation */
function postValidation(post) {
    //Schema the data
    const postSchema = Joi.object().keys({
        name: Joi.string().min(4).required(),
        post: Joi.string().min(1).required(),
    });
    //Validate the data
    return postSchema.validate(post);  //The New Validation in Joi Library {Schema.validate}
}

exports.Post = Post; 
exports.Validate = postValidation;