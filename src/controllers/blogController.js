const blogModel = require("../models/blogModel")
const Valid = require("../validator/validator")
const { isValidObjectId } = require("mongoose")
const authorModel = require("../models/authorModel")



const createBlog = async function (req, res) {

    try {
        const requestBody = req.body
        const Id = req.body.authorId

        const { title, authorId, body, tags, category, subcategory } = requestBody


        if (!Valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
        }
        if (!Valid.isValid(title)) {
            return res.status(400).send({ status: false, msg: " Pls Provide title for blog" })
        }
        if (!isValidObjectId(Id)) {
            return res.status(400).send({ status: false, msg: " Pls provide Valid author Id" })
        }
        if (!Valid.isValid(body)) {
            return res.status(400).send({ status: false, msg: " Pls Provide body" })
        }

        if (!Valid.isValid(tags)) {
            return res.status(400).send({ status: false, msg: "Pls provide tags" })
        }
        if (!Valid.isValid(category)) {
            return res.status(400).send({ status: false, msg: "pls provide category of Blog" })
        }
        if (!Valid.isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "pls provide subcategory of Blog" })
        }

        if (!Valid.isValid(authorId)) {
            return res.status(400).send({ status: false, msg: " Pls provide author Id" })
        }



        const validId = await authorModel.findById(Id)
        if (validId) {
            const blogCreated = await blogModel.create(requestBody)
            return res.status(201).send({ status: true, msg: 'blog created succesfully ', data: blogCreated })

        } else { res.status(400).send({ statusbar: false, msg: 'invalid authorid' }) }
    }

    catch (err) {

        return res.status(500).send({ status: false, msg: err.message })

    }


}





// ****fetch*****

const blogDetails = async function (req, res) {
    try {
        const blogsData = await blogModel.find({ isDeleted: false }, { isPublished: true })
        if (req.query) {
            let { authorId, tags, category, subCategory } = req.query
           
            let obj = {}
            if (authorId) {
                obj.authorId = authorId

            }
            if (tags) {
                obj.tags = tags
            }
            if (category) {
                obj.category = category
            }
            if (subCategory) {
                obj.subCategory = subCategory
            }
            obj.isDeleted = false
            obj.isPublished = true

            const getDetail = await blogModel.find(obj)
            if (!getDetail) {
                return res.status(400).send({ status: false, msg: "given data is invalid " })
            }
            else {
                return res.status(200).send({ status: true, data: getDetail })
            }
        } else {
            return res.status(200).send({ status: true, data: blogsData })
        }

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


// **********************************put***************************
const updateBlog = async function (req, res) {

    try {
        const blogId = req.params.blogId
        const checkId = await blogModel.findById(blogId)
        if (checkId) {
            const requestBody = req.body
            const { title, body, tags, subcategory, isPublished } = requestBody
            if (!Valid.isValidRequestBody(requestBody)) {
                return res.status(400).send({ status: false, msg: " Pls Provide requestBody" })
            }
            if (!Valid.isValid(title)) {
                return res.status(400).send({ status: false, msg: " Pls Provide title for blog" })
            }
            if (!Valid.isValid(body)) {
                return res.status(400).send({ status: false, msg: "Body is Mandtory" })
            }
            if (!Valid.isValid(tags)) {
                return res.status(400).send({ status: false, msg: "Pls provide tags of blog" })
            }
            if (!Valid.isValid(subcategory)) {
                return res.status(400).send({ status: false, msg: "Pls provide subCategory of blog" })
            }
            if (!Valid.isValid(isPublished)) {
                return res.status(400).send({ status: false, msg: "Pls provide  blog is published or not " })
            }

            let savedData = await blogModel.findOneAndUpdate({ _id: blogId }, {
                $set: { "title": req.body.title, "body": req.body.body, "category": req.body.category },
                $push: { "tags": req.body.tags, "subcategory": req.body.subcategory }
            }
                , { new: true })

            res.status(200).send({ status: true, msg: "blog updated successfuly", data: savedData })
        } else {

            return res.status(404).send({ status: false, msg: "blog id does not exist " })
        }

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}


// // deleteBlog by  path Parem
// // =================================================================
// const deleteBlog = async function (req, res) {

//     try {
//         let blogId = req.params.blogId
//         let deleteBlog = await blogModel.findByIdAndUpdate({ authorId: blogId }, { $set: { isDeleted: true } }, { new: true })
//         res.status(200).send({ status: true, msg: deleteBlog })
//         if (!deleteBlog) res.status(404).send({ status: false, msg: "Blogs are not found" })
//     }
//     catch (error) {
//         res.status(500).send({ msg: error.message })
//         console.log({ msg: error })
//     }
// };


// deleteBlog by ID path Parem

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId.trim();
        const result = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true })

        // console.log(result, "deleted")
        res.status(200).send({ msg: "Deleted sussfully", deletedBlog: result })
    }
    catch (err) {
        return res.status(500).send({ status: true, msg: err.message })
    }
}



// ***************delete by query paramas *********************8

const deleteByQuery = async function (req, res) {
    try {
        const data = req.query
        //   const {category, authorId, tags, subcategory,isPublished}=data
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "no data is provided" })
        }
        if (isPublished == true) {
            return res.status(400).send({ status: false, msg: "blog is published" })
        }

        const deletedBlogs = await blogModel.findOneAndUpdate(data, { isDeleted: true, deletedAt: new Date() }, { new: true })

        if (!deletedBlogs) {
            return res.status(404).send({ status: false, msg: "blog not found" })
        }
        return res.status(200).send({ status: true, msg: deletedBlogs })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}





module.exports = { createBlog, blogDetails, updateBlog, deleteBlog, deleteByQuery }