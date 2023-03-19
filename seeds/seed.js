const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPost of blogPostData) {
    await BlogPost.create({
      ...blogPost,
      user_name: users[Math.floor(Math.random() * users.length)].name,
    });
  }

  process.exit(0);
};

seedDatabase();
