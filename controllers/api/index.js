const router = require("express").Router();
const homeRoutes = require("./homeRoutes.js");
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes");

router.use("/homeRoutes", homeRoutes);
router.use("/users", userRoutes);
router.use("/blogPosts", blogPostRoutes);

module.exports = router;
