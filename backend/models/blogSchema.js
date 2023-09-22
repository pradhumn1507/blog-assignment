const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    keywords:{
        type: Array,
        required: true,
    },
    file:{
       name: {type:String},
       path: {type:String}
    },
    description:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    likes:{
        type: Array,
        default:[]
    },
    dislikes:{
        type: Array,
        default:[]
    },
    comments:{
        type: Array,
        default:[]
    },
})

const blog = mongoose.model("blog",blogSchema)
module.exports = blog;