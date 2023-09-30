import Post from "../models/Post.js";
import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось созлать статью",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить  статью",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedDoc = await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить  статью",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletePost = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!postId) {
      return res.status(404).json({
        message: "Статья не была найдена",
      });
    }

    res.json({
      message: postId + "Статья была удалена",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Стать не была удалена",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatePost = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        user: req.userId,
        tags: req.body.tags,
      }
    );
    if (!postId) {
      return res.status(404).json({
        message: "Не найдена статья",
      });
    }

    res.json({
      message: postId + "Статья обновлена",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Не удалось обновить статью",
    });
  }
};
