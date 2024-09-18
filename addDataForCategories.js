// addTestData.js

const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

// Categories data
const categoriesData = [
  {
    name: 'Xenomorphs',
    description: 'Discussions about Xenomorphs: Biology, Variants, Behavior',
  },
  {
    name: 'Spacecraft & Technology',
    description: 'Ships and technology in the Alien universe',
  },
  {
    name: 'Colonies & Planets',
    description: 'Information about colonial worlds and environments',
  },
  {
    name: 'Corporations & Organizations',
    description: 'Discussions about Weyland-Yutani and other entities',
  },
  {
    name: 'Characters & Lore',
    description: 'Detailed discussions about key characters and story arcs',
  },
  {
    name: 'Media & Adaptations',
    description: 'Films, books, comics, games, and merchandise',
  },
  {
    name: 'Fan Creations & Theories',
    description: 'Fan art, fiction, theories, and events',
  },
];

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    // Add categories
    await addCategories();

    // Optionally, add test data
    // await addTestData();

    mongoose.disconnect();
  })
  .catch((err) => console.error('Failed to connect to MongoDB Atlas', err));

// Function to add categories
async function addCategories() {
  try {
    for (const categoryData of categoriesData) {
      // Check if category already exists
      let existingCategory = await Category.findOne({ name: categoryData.name });

      if (!existingCategory) {
        // Create new category
        const category = new Category({
          name: categoryData.name,
          description: categoryData.description,
        });
        await category.save();
        console.log('Category created:', category.name);
      } else {
        console.log('Category already exists:', existingCategory.name);
      }
    }
    console.log('All categories have been loaded successfully.');
  } catch (error) {
    console.error('Error adding categories:', error.message);
  }
}

// Optional: Function to add test data (users, questions, etc.)
async function addTestData() {
  try {
    // Insert a test user
    const user = new User({
      username: 'Ripley_8',
      password: 'hashed_Password1!',
      email: 'ripley8@weyland-yutani.com',
      // profile_picture and bio fields can be added if present in your User model
      // profile_picture: 'https://example.com/images/ripley8.png',
      // bio: 'Survivor of LV-426. Ready for anything.',
      // roles: ['member']
    });
    await user.save();
    console.log('User created:', user.username);

    // Select a category for the question
    const category = await Category.findOne({ name: 'Characters & Lore' });
    if (!category) {
      throw new Error('Category not found: Characters & Lore');
    }

    // Insert a test question
    const question = new Question({
      title: 'What was the purpose of the android Ash?',
      body: "In the movie 'Alien,' Ash the android acted strangely. What was his true purpose aboard the Nostromo?",
      author_id: user._id,
      category_id: category._id,
    });
    await question.save();
    console.log('Question created:', question.title);

    // Insert a test answer
    const answer = new Answer({
      question_id: question._id,
      body: "Ash's true purpose was to ensure the retrieval of the xenomorph specimen, even at the crew's expense.",
      author_id: user._id,
    });
    await answer.save();
    console.log('Answer created:', answer._id);

    // Insert a test comment
    const comment = new Comment({
      answer_id: answer._id,
      body: "I think you're right about Ash!",
      author_id: user._id,
    });
    await comment.save();
    console.log('Comment created:', comment._id);

  } catch (error) {
    console.error('Error adding test data:', error.message);
  }
}
