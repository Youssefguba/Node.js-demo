const express = require('express');
const app = express();
const Joi = require('@hapi/joi')
const logger = require('./logger');

app.use(express.json());
app.use(logger.log);

const posts = [
    { id: 1, name: "Youssef Ahmed", post: "Hello Guys"  },
    { id: 2, name: "Youssef Mohamed", post: "Hello Guys" },
    { id: 3, name: "Youssef Saeed", post: "Hello Guys"},
];

app.get('/api/posts', (req, res) => {
    res.send(posts);
});


app.get('/api/posts/:id', (req, res) => {
    let post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send(`The Post is not found!`);

    res.send(post);
});


app.post('/api/posts/', (req, res) => {

    const { error } = postValidation(req.body);
    //The New Validation in Joi Library {Schema.validate}
    if (error) return  res.status(400).send(error.details[0].message);

    const post = {
        id: posts.length + 1,
        name: req.body.name,
        post: req.body.post
    };

    posts.push(post);
    res.send(post);
});


app.put('/api/posts/:id', (req, res) => {
    //Find the data is existed or not ?
    let post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send(`The Post is not found!`);
    const {error} = postValidation(req.body);

    //The New Validation in Joi Library {Schema.validate}
    if (error) return res.status(400).send(error.details[0].message);
   

    //Put the Data || update the data
    post.name = req.body.name;
    post.post = req.body.post;
    res.send(post);


});




app.delete('/api/posts/:id', (req, res) => {
    let post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send(`The Post is not found!`);

    const index = posts.indexOf(post);
    posts.splice(index, 1);

    res.send(post);

});



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening of ${port} port ... `));


/*Fun of Validation*/
function postValidation(post) {
    //Schema the data
    const postSchema = Joi.object().keys({
        name: Joi.string().min(5).required(),
        post: Joi.string().min(10).required(),
    });
    //Validate the data
    return postSchema.validate(post);  //The New Validation in Joi Library {Schema.validate}
}