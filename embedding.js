const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author);
  course.save();
}
//
// createCourse('Node Course', [
//   new Author({ name: 'Youssef' }),
//   new Author({ name: 'guba' })
// ]);

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId);
  author.remove();
  course.save();

}
// addAuthor('5e9740d27de9ea0f00808054', new Author({name : 'Mohamed'}));
removeAuthor('5e9740d27de9ea0f00808054', '5e9740d27de9ea0f00808052');