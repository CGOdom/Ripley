// addTestData.js

const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Question = require('./models/Question');
const Answer = require('./models/Answer');
const Comment = require('./models/Comment');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    // Add test data
    await addTestData();

    mongoose.disconnect();
  })
  .catch((err) => console.error('Failed to connect to MongoDB Atlas', err));

// Function to add test data
async function addTestData() {
  try {
    // Insert a test user
    const user = new User({
      username: 'Ripley_8',
      password: 'hashed_password',
      email: 'ripley8@weyland-yutani.com',
      profile_picture: 'https://example.com/images/ripley8.png',
      bio: 'Survivor of LV-426. Ready for anything.',
      roles: ['member']
    });
    await user.save();
    console.log('User created:', user);

    // Insert a test category
    const category = new Category({
      name: 'Movies',
      description: 'Discuss the Alien movie franchise.'
    });
    await category.save();
    console.log('Category created:', category);

    // Insert a test question
    const question = new Question({
      title: 'What was the purpose of the android Ash?',
      body: "In the movie 'Alien,' Ash the android acted strangely. What was his true purpose aboard the Nostromo?",
      author_id: user._id,
      category_id: category._id,
    });
    await question.save();
    console.log('Question created:', question);

    // Insert a test answer
    const answer = new Answer({
      question_id: question._id,
      body: "Ash's true purpose was to ensure the retrieval of the xenomorph specimen, even at the crew's expense.",
      author_id: user._id,
    });
    await answer.save();
    console.log('Answer created:', answer);

    // Insert a test comment
    const comment = new Comment({
      answer_id: answer._id,
      body: "I think you're right about Ash!",
      author_id: user._id,
    });
    await comment.save();
    console.log('Comment created:', comment);

  } catch (error) {
    console.error('Error adding test data:', error.message);
  }
}
