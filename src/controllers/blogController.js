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
<<<<<<< HEAD
           
=======
>>>>>>> 7d975917050da90db016ae4592da1b5209c5adc6
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
        if (!isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "blog Id is incurrct" })

        const requestBody = req.body

        if (Object.keys(requestBody).length == 0) return res.status(400).send({ status: false, msg: "Enter a felds to update" })

        const { title, body, tags, subcategory, category, isPublished } = requestBody

        let savedData = await blogModel.findOneAndUpdate({ _id: blogId }, {
            $set: { title: title, body: body, category: category, isPublished: isPublished },
            $push: { tags: tags, subcategory: subcategory }
        }, { new: true })

        res.status(200).send({ status: true, msg: "blog updated successfuly", data: savedData })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}




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

// const deleteByQuery = async function (req, res) {
//     try {
//         const data = req.query
//         // const { isPublished } = data
//         if (Object.keys(data).length == 0) {
//             return res.status(400).send({ status: false, msg: "no data is provided" })
//         }
//         // if (isPublished == true) {
//         //     return res.status(400).send({ status: false, msg: "blog is published" })
//         // }

//         const deletedBlogs = await blogModel.updateMany(data, { isDeleted: true, deletedAt: new Date() }, { new: true })
//         console.log(deleteBlog)
//         if (!deletedBlogs) {
//             return res.status(404).send({ status: false, msg: "blog not found" })
//         }
//         return res.status(200).send({ status: true, msg: deletedBlogs })
//     }
//     catch (error) {
//         return res.status(500).send({ status: false, msg: error.message })
//     }
// }

// const deleteByQuery = async function (req, res) {
//     try {
//         let queryData = (req.query.category || req.query.authorId || req.query.tags || req.query.subCategory)
//         console.log(queryData)
//         if (!queryData) {
//             return res.status(404).send({ status: false, msg: "You can only Delete blog  by category, authorid, tag name, subcategory name,or unpublished  blog" })
//         } else {

//             let authorId = req.query.authorId
//             let category = req.query.category
//             let tags = req.query.tags
//             let subCategory = req.query.subCategory
//             let isPublished = req.query.isPublished

//             let obj = {};
//             if (authorId) {
//                 obj.authorId = authorId;
//             }
//             if (category) {
//                 obj.category = category
//             }

//             if (tags) {
//                 obj.tags = tags
//             }
//             if (subCategory) {
//                 obj.subcategory = subCategory
//             }
//             if (isPublished) {
//                 obj.isPublished = isPublished
//             }


//             let data = await blogModel.findOne(obj);

//             if (!data) {
//                 return res.status(404).send({ status: false, msg: "The given data is Invalid or blog is already deleted" });
//             }


//             await blogModel.updateOne({ data }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
//             return res.status(200).send({ status: true, msg: "Blog Deleted succesfully", })
//         }
//     }


//     catch (error) {
//         return res.status(500).send({ message: "Failed", error: error.message });
//     }
// }








module.exports = { createBlog, blogDetails, updateBlog, deleteBlog, deleteByQuery }