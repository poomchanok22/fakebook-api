import cloudinary from "../config/cloudinary.config.js"
import path from "path"
import fs from 'fs/promises'
import prisma from "../config/prisma.config.js"

export async function getAllPosts(req, res, next) {
  res.json({message: "This is Get All posts"})
}

export async function createPost(req, res, next) {
  const {message} = req.body
  console.log(req.body)
  
  let haveFile = !!req.file
  let uploadResult = null
  if(haveFile) {
    uploadResult = await cloudinary.uploader.upload(req.file.path,{
      overwrite : true,
      public_id : path.parse(req.file.path).name
    })
    fs.unlink(req.file.path)
  }
    const data = {
      message : message,
      image: uploadResult.secure_url,
      userId: req.user.id
    }
    const rs = await prisma.post.create({data})
    res.status(201).json({
      massage: "Create Successfully",
      result: rs
    })






  // console.log(uploadResult)
  // console.log(req.file)

  // res.json({message: "This is Create Post",
  //   file : req.file,
  //   uploadResult
  // })
  
}

export async function updatePost(req, res, next) {
  res.json({message: "This is Update Post"})
  
}

export async function deletePost(req, res, next) {
  res.json({message: "This is Delete Post"})
  
}