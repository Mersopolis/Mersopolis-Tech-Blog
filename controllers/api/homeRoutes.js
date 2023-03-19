const router = require("express").Router();
const { BlogPost } = require("../../models");

router.get("/", async (req, res) => {
  try {
    // Get all blog posts, sorted by date created
    const blogPostData = await BlogPost.findAll({
      order: [["date_created", "DESC"]],
    });

    // Serialize blog post data so templates can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render("homepage", { blogPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
