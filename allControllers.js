const express = require('express');
const Blog = require('../model/blog');

const router = express.Router();

// adding blogs
router.post('/addblogs', (req, res) => {
    const { header, content } = req.body;
    if (!header || !content) {
        return res.status(400).json({ error: 'Header and content are required fields.' });
    }

    const newBlog = new Blog({
        header,
        content,
    });

    newBlog
        .save()
        .then((result) => {
            console.log('Blog added to the database:', result);
            res.status(201).json(result);
        })
        .catch((error) => {
            console.log(error);
        });
});

// getting all blogs
router.get('/getblogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.status(202).json(result);
    })
    .catch((error) => {
        console.log(error);
    })
});

// getting blogs by their id
router.get('/getblogs/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then((result) => {
        if (!result){
            res.status(404).json('Blog not found');
        }
        res.status(202).json(result);
    })
    .catch((error) => {
        console.log(error);
    })
});

// updating blogs through id
router.put('/updateblog/:id', (req, res) => {
    const { header, content } = req.body;  

    if (!header || !content) {
        return res.status(400).json( 'Header and content are required fields.');
    }

    Blog.findByIdAndUpdate(req.params.id, { header, content }, { new: true })
    .then((result) => {
        res.status(202).json(result);
    })
    .catch((error) => {
        console.log(error);
    })
});


// deleting a blog with id
router.delete('/deleteblog/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(202).json({'Blog deleted' : result});
    })
    .catch((error) => {
        console.log(error);
    })
})


module.exports = router;