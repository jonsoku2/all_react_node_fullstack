const express = require("express");
const router = express.Router();
const { create, categoryById, readAll, read } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../middleware/auth");
const { userById } = require("../controllers/user");

router.get("/categories", readAll);
router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
