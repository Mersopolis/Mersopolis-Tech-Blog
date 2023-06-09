const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all blog posts, sorted by date created
    const blogPostData = await BlogPost.findAll({
      order: [["date_created", "DESC"]],
    });

    // Serialize blog post data so templates can read it
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    // Pass serialized data into Handlebars.js template
    res.render("homepage", {
      blogPosts, 
      logged_in: req.session.logged_in
 });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogPost/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });

    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
