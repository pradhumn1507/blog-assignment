const mongoose = require("mongoose");
const blog = require("../models/blogSchema.js");
const user = require("../models/userSchema.js");
const { ObjectId } = require("mongoose").Types;
const fs = require('fs')

const createBlog = async (req, res) => {
  try {
    const { title, keywords, description } = req.body;
    const { path, filename } = req.file;
    const newBlog = new blog({
      title,
      keywords,
      file: {
        name: filename,
        path,
      },
      description,
      email: req.user.email,
    });

    await newBlog.save();

    //blog is send to user
    res.status(200).send("Blog Created Successfully");
  } catch (error) {
    res.status(500).send("Some internal error occured");
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { page, pagesize } = req.query;
    const skip = (page - 1) * pagesize;
    const blogs = await blog.find().skip(skip).limit(pagesize);
    if (blogs.length == 0) {
      return res.status(400).send("Blogs finished");
    }
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const handleLike = async (req, res) => {
  const _id = req.params.id;
  const user = req.user.email;
  try {
    await blog.findOneAndUpdate(
      { _id },
      { $addToSet: { likes: user }, $pull: { dislikes: user } },
      { new: true }
    );
    const updatedBlog = await blog.findOne({ _id });
    res.status(200).send(updatedBlog);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const handleDislike = async (req, res) => {
  const _id = req.params.id;
  const user = req.user.email;
  try {
    await blog.findOneAndUpdate(
      { _id },
      { $addToSet: { dislikes: user }, $pull: { likes: user } },
      { new: true }
    );
    const updatedBlog = await blog.findOne({ _id });
    res.status(200).send(updatedBlog);
  } catch (error) {
    res.tatus(500).send(error.message);
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.email;
    const data = await blog.find({ email: userId });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBlog = async (req, res) => {
  const id = req.query.id;
  try {
    const resp = await blog.findByIdAndDelete(id);
    fs.unlink(resp.file.path,()=>{
      console.log("Image deleted")
    })
    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send("Not deleted");
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  handleLike,
  handleDislike,
  getMyBlogs,
  deleteBlog,
};
